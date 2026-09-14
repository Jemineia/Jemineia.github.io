/* =========================
   Content Renderer
========================= */


/*
 * 현재 월에 표시할 콘텐츠를 가져옵니다.
 */
function getContentsForMonth(
    contents,
    year,
    month
) {
  const monthStart =
      new Date(
          year,
          month,
          1
      );

  const monthEnd =
      new Date(
          year,
          month + 1,
          0
      );

  return contents.filter(
      (content) => {

        const start =
            parseDate(
                content.startDate
            );

        const end =
            parseDate(
                content.endDate
            );

        return (
            start <= monthEnd &&
            end >= monthStart
        );
      }
  );
}


/*
 * 콘텐츠가 특정 날짜 범위와
 * 겹치는지 확인합니다.
 */
function isContentInRange(
    content,
    startDate,
    endDate
) {
  const contentStart =
      parseDate(
          content.startDate
      );

  const contentEnd =
      parseDate(
          content.endDate
      );

  return (
      contentStart <= endDate &&
      contentEnd >= startDate
  );
}


/*
 * 현재 캘린더 주에서
 * 콘텐츠가 표시될 날짜 범위를 계산합니다.
 */
function getContentWeekSegments(
    content,
    year,
    month,
    week
) {
  const contentStart =
      parseDate(
          content.startDate
      );

  const contentEnd =
      parseDate(
          content.endDate
      );


  /*
   * 현재 월의 첫 번째 캘린더 주 시작일
   *
   * 예:
   *
   * 2026년 9월 1일이 화요일이라면
   *
   * 8월 30일(일)
   * ~
   * 9월 5일(토)
   *
   * 가 첫 번째 주가 됩니다.
   */
  const firstWeekStart =
      new Date(
          year,
          month,
          1
      );

  firstWeekStart.setDate(
      firstWeekStart.getDate() -
      firstWeekStart.getDay()
  );


  /*
   * 현재 주의 시작일
   */
  const weekStart =
      new Date(
          firstWeekStart
      );

  weekStart.setDate(
      weekStart.getDate() +
      week * 7
  );


  /*
   * 현재 주의 마지막 날
   */
  const weekEnd =
      new Date(
          weekStart
      );

  weekEnd.setDate(
      weekEnd.getDate() + 6
  );


  /*
   * 현재 월의 시작일
   */
  const monthStart =
      new Date(
          year,
          month,
          1
      );


  /*
   * 현재 월의 마지막 날
   */
  const monthEnd =
      new Date(
          year,
          month + 1,
          0
      );


  /*
   * 실제로 표시할 콘텐츠 시작일
   *
   * 다음 네 날짜 중 가장 늦은 날짜:
   *
   * 콘텐츠 시작일
   * 현재 주 시작일
   * 현재 월 시작일
   */
  const segmentStart =
      new Date(
          Math.max(
              contentStart.getTime(),
              weekStart.getTime(),
              monthStart.getTime()
          )
      );


  /*
   * 실제로 표시할 콘텐츠 종료일
   *
   * 다음 네 날짜 중 가장 이른 날짜:
   *
   * 콘텐츠 종료일
   * 현재 주 종료일
   * 현재 월 종료일
   */
  const segmentEnd =
      new Date(
          Math.min(
              contentEnd.getTime(),
              weekEnd.getTime(),
              monthEnd.getTime()
          )
      );


  /*
   * 현재 주에 콘텐츠가 없으면
   * 표시하지 않습니다.
   */
  if (
      segmentStart > segmentEnd ||
      !isContentInRange(
          content,
          weekStart,
          weekEnd
      )
  ) {
    return null;
  }


  return {
    start: segmentStart,
    end: segmentEnd,
    weekStart: weekStart,
    weekEnd: weekEnd
  };
}


/*
 * 콘텐츠가 겹치는 경우
 * 서로 다른 row에 배치합니다.
 */
function assignContentRows(
    segments
) {
  const rows = [];


  segments.forEach(
      (segment) => {

        let assignedRow = -1;


        /*
         * 기존 row를 순서대로 확인합니다.
         */
        for (
            let row = 0;
            row < rows.length;
            row++
        ) {

          const rowSegments =
              rows[row];


          /*
           * 해당 row에 이미 있는
           * 콘텐츠와 날짜가 겹치는지 확인합니다.
           */
          const hasOverlap =
              rowSegments.some(
                  (existing) =>
                      segment.start <=
                      existing.end &&
                      segment.end >=
                      existing.start
              );


          /*
           * 겹치지 않는 row를 찾으면
           * 해당 row를 사용합니다.
           */
          if (!hasOverlap) {

            assignedRow =
                row;

            break;
          }
        }


        /*
         * 사용할 수 있는 row가 없으면
         * 새로운 row를 만듭니다.
         */
        if (
            assignedRow === -1
        ) {

          assignedRow =
              rows.length;

          rows.push([]);
        }


        segment.row =
            assignedRow;


        rows[
            assignedRow
            ].push(
            segment
        );
      }
  );


  return segments;
}


/*
 * 이미지 데이터를 정규화합니다.
 *
 * 기존 방식:
 *
 * images: [
 *   "images/contents/a.png"
 * ]
 *
 *
 * 새로운 방식:
 *
 * images: [
 *   {
 *     src: "images/contents/a.png",
 *     fit: "cover"
 *   }
 * ]
 *
 *
 * 기존 문자열 방식은
 * 기본적으로 cover로 처리합니다.
 */
function normalizeImage(
    image
) {

  /*
   * 기존 문자열 방식
   */
  if (
      typeof image === "string"
  ) {

    return {
      src: image,
      fit: "cover"
    };
  }


  /*
   * 새로운 객체 방식
   */
  if (
      image &&
      typeof image === "object"
  ) {

    return {
      src: image.src,

      fit:
          [
            "cover",
            "contain",
            "background"
          ].includes(
              image.fit
          )
              ? image.fit
              : "cover"
    };
  }


  return null;
}


/*
 * 콘텐츠가 현재 캘린더 위치에서
 * 몇 번째 이미지를 사용할지 계산합니다.
 *
 *
 * 예:
 *
 * 콘텐츠 시작:
 * 2026-09-11
 *
 * images:
 * [
 *   image0,
 *   image1,
 *   image2
 * ]
 *
 *
 * 콘텐츠가 다음 주로 넘어가면
 * image1
 *
 * 다음 주로 넘어가면
 * image2
 *
 *
 * 또한 월이 바뀌면
 * 이미지 인덱스를 하나 증가시킵니다.
 */
function getContentImage(
    content,
    year,
    month,
    week
) {

  const contentStart =
      parseDate(
          content.startDate
      );


  /*
   * 콘텐츠 시작일이 속한 주
   */
  const contentStartWeek =
      getWeekStart(
          contentStart
      );


  /*
   * 현재 월의 첫 번째 캘린더 주
   */
  const firstWeekStart =
      new Date(
          year,
          month,
          1
      );

  firstWeekStart.setDate(
      firstWeekStart.getDate() -
      firstWeekStart.getDay()
  );


  /*
   * 현재 캘린더 주
   */
  const currentWeekStart =
      new Date(
          firstWeekStart
      );

  currentWeekStart.setDate(
      currentWeekStart.getDate() +
      week * 7
  );


  /*
   * 콘텐츠 시작 주와
   * 현재 주의 차이
   */
  const weekDifference =
      Math.round(
          getDayDifference(
              contentStartWeek,
              currentWeekStart
          ) / 7
      );


  /*
   * 콘텐츠 시작 월과
   * 현재 월의 차이
   */
  const monthDifference =
      (
          year -
          contentStart.getFullYear()
      ) * 12 +
      (
          month -
          contentStart.getMonth()
      );


  /*
   * 최종 이미지 인덱스
   */
  const imageIndex =
      weekDifference +
      monthDifference;


  /*
   * 이미지 배열
   */
  const images =
      Array.isArray(
          content.images
      )
          ? content.images
          : [];


  /*
   * 이미지가 하나도 없으면
   * null 반환
   */
  if (
      images.length === 0
  ) {

    return null;
  }


  /*
   * 계산된 이미지
   */
  let image =
      images[imageIndex];


  /*
   * 해당 인덱스의 이미지가 없으면
   * 마지막 이미지를 사용합니다.
   */
  if (
      image === undefined
  ) {

    image =
        images[
        images.length - 1
            ];
  }


  return normalizeImage(
      image
  );
}


/*
 * 이미지 콘텐츠를 생성합니다.
 *
 * 지원:
 *
 * cover
 * contain
 * background
 */
function createContentImage(
    parent,
    image,
    title
) {

  const fit =
      [
        "cover",
        "contain",
        "background"
      ].includes(
          image.fit
      )
          ? image.fit
          : "cover";


  /*
   * =========================
   * Background
   * =========================
   *
   * 흐릿한 배경 이미지를
   * 별도의 div로 생성합니다.
   */
  if (
      fit === "background"
  ) {

    parent.classList.add(
        "content-fit-background"
    );


    const background =
        document.createElement(
            "div"
        );


    background.className =
        "content-background";


    background.style.backgroundImage =
        `url("${image.src}")`;


    parent.appendChild(
        background
    );
  }


  /*
   * =========================
   * Main Image
   * =========================
   */

  const imageElement =
      document.createElement(
          "img"
      );


  imageElement.className =
      "content-image";


  imageElement.src =
      image.src;


  imageElement.alt =
      title;


  /*
   * cover / contain
   */
  if (
      fit === "cover" ||
      fit === "contain"
  ) {

    imageElement.style.objectFit =
        fit;
  }


  /*
   * background
   *
   * 흐릿한 배경 위에
   * 원본 이미지를 전체 표시합니다.
   */
  if (
      fit === "background"
  ) {

    imageElement.style.objectFit =
        "contain";
  }


  /*
   * 이미지 로딩 실패
   */
  imageElement.onerror = () => {

    const background =
        parent.querySelector(
            ".content-background"
        );


    if (background) {

      background.remove();
    }


    parent.classList.remove(
        "content-fit-background"
    );


    imageElement.remove();


    createNoImageElement(
        parent,
        title
    );
  };


  parent.appendChild(
      imageElement
  );
}


/*
 * 이미지가 없거나
 * 이미지 로딩에 실패했을 때
 * 텍스트를 표시합니다.
 */
function createNoImageElement(
    parent,
    title
) {

  const noImage =
      document.createElement(
          "div"
      );


  noImage.className =
      "content-no-image";


  noImage.textContent =
      title;


  parent.appendChild(
      noImage
  );
}


/*
 * 콘텐츠 하나를
 * 실제 DOM에 표시합니다.
 */
function renderContentItem(
    content,
    segment,
    week,
    container
) {

  const item =
      document.createElement(
          "div"
      );


  item.className =
      "content-item";


  /*
   * =========================
   * 날짜 위치 계산
   * =========================
   *
   * 여기서 중요한 점은
   * getDay()를 직접 사용하지 않고
   *
   * "현재 주의 일요일로부터
   * 몇 일 떨어져 있는가"
   *
   * 를 계산한다는 것입니다.
   *
   * 따라서 월 경계에서도
   * 정확한 열 위치를 얻을 수 있습니다.
   */

  const weekStart =
      segment.weekStart;


  const startDay =
      Math.round(
          getDayDifference(
              weekStart,
              segment.start
          )
      );


  const endDay =
      Math.round(
          getDayDifference(
              weekStart,
              segment.end
          )
      );


  /*
   * =========================
   * 가로 위치
   * =========================
   */

  const left =
      startDay *
      (
          100 / 7
      );


  const width =
      (
          endDay -
          startDay +
          1
      ) *
      (
          100 / 7
      );


  /*
   * =========================
   * 세로 위치
   * =========================
   *
   * 하나의 content-layer가
   * .days 전체를 기준으로 하기 때문에
   * 현재 주가 몇 번째 주인지에 따라
   * top 위치를 계산합니다.
   */


  /*
   * 날짜 영역의 기본 주 높이
   *
   * CSS:
   *
   * .day {
   *   min-height: 130px;
   * }
   */
  const weekHeight =
      130;


  /*
   * 콘텐츠 시작 영역
   *
   * 날짜 숫자가 있는 영역을
   * 피하기 위해 30px 아래에서 시작합니다.
   */
  const contentTop =
      30;


  /*
   * 콘텐츠 하나의 높이
   *
   * CSS:
   *
   * .content-item {
   *   height: 90px;
   * }
   */
  const rowHeight =
      90;


  /*
   * 콘텐츠 row 사이의 간격
   */
  const rowGap =
      5;


  /*
   * 최종 top 위치
   */
  const top =
      contentTop +
      week * weekHeight +
      segment.row *
      (
          rowHeight +
          rowGap
      );


  /*
   * =========================
   * 위치 적용
   * =========================
   */

  item.style.left =
      `${left}%`;


  item.style.width =
      `${width}%`;


  item.style.top =
      `${top}px`;


  /*
   * =========================
   * Image
   * =========================
   */

  const image =
      getContentImage(
          content,
          currentYear,
          currentMonth,
          week
      );


  if (
      image &&
      image.src
  ) {

    createContentImage(
        item,
        image,
        content.title
    );

  } else {

    createNoImageElement(
        item,
        content.title
    );
  }


  /*
   * =========================
   * Tooltip
   * =========================
   */

  const tooltip =
      document.createElement(
          "div"
      );


  tooltip.className =
      "content-tooltip";


  tooltip.innerHTML =
      `${content.title}<br>${content.startDate} ~ ${content.endDate}`;


  item.appendChild(
      tooltip
  );


  /*
   * =========================
   * Link
   * =========================
   */

  if (
      content.link
  ) {

    item.addEventListener(
        "click",
        () => {

          window.location.href =
              content.link;

        }
    );
  }


  container.appendChild(
      item
  );
}


/*
 * =========================
 * 콘텐츠 전체 렌더링
 * =========================
 *
 * 중요한 변경점:
 *
 * 이전에는
 *
 * 첫 번째 .day
 * └── content-layer
 *
 * 구조였습니다.
 *
 *
 * 이제는
 *
 * .days
 * ├── .day
 * ├── .day
 * ├── ...
 * └── .content-layer
 *
 * 구조입니다.
 *
 * 따라서 콘텐츠의 left / width를
 * 7개의 날짜 전체를 기준으로
 * 정확하게 계산할 수 있습니다.
 */
function renderContents(
    contents,
    year,
    month,
    daysContainer
) {

  /*
   * =========================
   * 콘텐츠 레이어
   * =========================
   */

  const contentLayer =
      document.createElement(
          "div"
      );


  contentLayer.className =
      "content-layer";


  /*
   * .days 전체를 기준으로
   * 콘텐츠를 배치합니다.
   */
  daysContainer.appendChild(
      contentLayer
  );


  /*
   * =========================
   * 현재 월 콘텐츠
   * =========================
   */

  const monthContents =
      getContentsForMonth(
          contents,
          year,
          month
      );


  /*
   * =========================
   * 월 범위
   * =========================
   */

  const monthStart =
      new Date(
          year,
          month,
          1
      );


  const monthEnd =
      new Date(
          year,
          month + 1,
          0
      );


  /*
   * =========================
   * 첫 번째 주
   * =========================
   */

  const firstWeekStart =
      new Date(
          monthStart
      );


  firstWeekStart.setDate(
      firstWeekStart.getDate() -
      firstWeekStart.getDay()
  );


  /*
   * =========================
   * 마지막 주
   * =========================
   */

  const lastWeekEnd =
      new Date(
          monthEnd
      );


  lastWeekEnd.setDate(
      lastWeekEnd.getDate() +
      (
          6 -
          lastWeekEnd.getDay()
      )
  );


  /*
   * =========================
   * 전체 날짜 수
   * =========================
   */

  const totalDays =
      Math.round(
          getDayDifference(
              firstWeekStart,
              lastWeekEnd
          )
      ) + 1;


  /*
   * =========================
   * 주 개수
   * =========================
   */

  const weekCount =
      Math.ceil(
          totalDays / 7
      );


  /*
   * =========================
   * 주별 렌더링
   * =========================
   */

  for (
      let week = 0;
      week < weekCount;
      week++
  ) {

    /*
     * 현재 주 시작일
     */
    const weekStart =
        new Date(
            firstWeekStart
        );


    weekStart.setDate(
        weekStart.getDate() +
        week * 7
    );


    /*
     * 현재 주 종료일
     */
    const weekEnd =
        new Date(
            weekStart
        );


    weekEnd.setDate(
        weekEnd.getDate() + 6
    );


    /*
     * 현재 주에 표시할
     * 콘텐츠 segment
     */
    const segments = [];


    /*
     * 현재 월 콘텐츠를
     * 하나씩 확인합니다.
     */
    monthContents.forEach(
        (content) => {

          const segment =
              getContentWeekSegments(
                  content,
                  year,
                  month,
                  week
              );


          if (
              segment
          ) {

            segment.content =
                content;


            segments.push(
                segment
            );
          }
        }
    );


    /*
     * 콘텐츠가 겹치는 경우
     * row를 분리합니다.
     */
    assignContentRows(
        segments
    );


    /*
     * =========================
     * 현재 주 콘텐츠 렌더링
     * =========================
     */

    segments.forEach(
        (segment) => {

          renderContentItem(
              segment.content,
              segment,
              week,
              contentLayer
          );
        }
    );
  }
}