/* ========================================
   현재 날짜
======================================== */

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();


/* ========================================
   콘텐츠 데이터
======================================== */

/*
    images:
    콘텐츠에 사용할 이미지 배열

    1줄짜리 콘텐츠
    → images[0]

    2줄짜리 콘텐츠
    → 첫 번째 줄 : images[0]
    → 두 번째 줄 : images[1]

    3줄짜리 콘텐츠
    → 첫 번째 줄 : images[0]
    → 두 번째 줄 : images[1]
    → 세 번째 줄 : images[2]

    이미지가 부족하면 해당 줄에는
    이미지 대신 콘텐츠 제목이 표시됨.
*/

const contents = [

  {
    title: "마법소녀의 마녀재판(마노사바)",

    startDate: "2026-08-30",

    endDate: "2026-09-05",

    images: [
      "images/contents/manosaba1.png",
      "images/contents/manosaba2.png",
      "images/contents/manosaba3.png"
    ],

    link: "#"
  }

];


/* ========================================
   요일
======================================== */

const weekdays = [
  "일",
  "월",
  "화",
  "수",
  "목",
  "금",
  "토"
];


/* ========================================
   상수
======================================== */

/*
    달력에서 한 주의 높이

    CSS의 .day 높이와 맞춰야 함.
*/

const WEEK_HEIGHT = 130;


/*
    콘텐츠 이미지 높이
*/

const CONTENT_HEIGHT = 90;


/*
    같은 주에 콘텐츠가 겹칠 경우
    콘텐츠 사이의 간격
*/

const CONTENT_GAP = 5;


/* ========================================
   시작
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

      setupControls();

      renderCalendar();

    }
);


/* ========================================
   날짜 파싱
======================================== */

/*
    문자열 형태의 날짜를
    JavaScript Date 객체로 변환

    예:
    "2026-09-11"
    → Date 객체
*/

function parseDate(dateString) {

  const [
    year,
    month,
    day
  ] =
      dateString
      .split("-")
      .map(Number);

  return new Date(
      year,
      month - 1,
      day
  );
}


/* ========================================
   해당 날짜가 포함된 주의 시작일
======================================== */

/*
    일요일을 한 주의 시작으로 사용

    예:

    2026-09-11 금요일
    ↓
    2026-09-06 일요일
*/

function getWeekStart(date) {

  const result =
      new Date(date);

  result.setHours(
      0,
      0,
      0,
      0
  );

  result.setDate(
      result.getDate() -
      result.getDay()
  );

  return result;
}


/* ========================================
   두 날짜 사이의 일수
======================================== */

function getDayDifference(
    startDate,
    endDate
) {

  const start =
      new Date(startDate);

  const end =
      new Date(endDate);

  start.setHours(
      0,
      0,
      0,
      0
  );

  end.setHours(
      0,
      0,
      0,
      0
  );

  return Math.round(
      (
          end - start
      ) /
      (
          1000 *
          60 *
          60 *
          24
      )
  );

}


/* ========================================
   버튼 설정
======================================== */

function setupControls() {


  /*
      이전 연도
  */

  document
  .getElementById("prev-year")
  .addEventListener(
      "click",
      () => {

        currentYear--;

        renderCalendar();

      }
  );


  /*
      다음 연도
  */

  document
  .getElementById("next-year")
  .addEventListener(
      "click",
      () => {

        currentYear++;

        renderCalendar();

      }
  );


  /*
      이전 달
  */

  document
  .getElementById("prev-month")
  .addEventListener(
      "click",
      () => {

        currentMonth--;

        /*
            1월 → 이전 해 12월
        */

        if (
            currentMonth < 0
        ) {

          currentMonth = 11;

          currentYear--;

        }

        renderCalendar();

      }
  );


  /*
      다음 달
  */

  document
  .getElementById("next-month")
  .addEventListener(
      "click",
      () => {

        currentMonth++;

        /*
            12월 → 다음 해 1월
        */

        if (
            currentMonth > 11
        ) {

          currentMonth = 0;

          currentYear++;

        }

        renderCalendar();

      }
  );

}


/* ========================================
   달력 렌더링
======================================== */

function renderCalendar() {

  const calendar =
      document.getElementById(
          "calendar"
      );


  /*
      현재 연도 표시
  */

  document
  .getElementById(
      "current-year"
  )
      .textContent =
      currentYear;


  /*
      현재 월 표시
  */

  document
  .getElementById(
      "current-month"
  )
      .textContent =
      `${currentMonth + 1}월`;


  /*
      기존 달력 제거
  */

  calendar.innerHTML = "";


  /*
      현재 월 생성
  */

  const month =
      createMonth(
          currentYear,
          currentMonth
      );


  calendar.appendChild(
      month
  );

}


/* ========================================
   한 달 생성
======================================== */

function createMonth(
    year,
    month
) {

  const monthElement =
      document.createElement(
          "article"
      );


  monthElement.className =
      "month";


  /*
      첫 번째 날짜의 요일

      0 = 일요일
      1 = 월요일
      ...
      6 = 토요일
  */

  const firstDay =
      new Date(
          year,
          month,
          1
      ).getDay();


  /*
      마지막 날짜

      예:
      2월 → 28 또는 29
  */

  const lastDate =
      new Date(
          year,
          month + 1,
          0
      ).getDate();


  /* ========================================
     요일
  ======================================== */

  const weekdayElement =
      document.createElement(
          "div"
      );

  weekdayElement.className =
      "weekdays";


  weekdays.forEach(
      (
          weekday,
          index
      ) => {

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "weekday";

        element.textContent =
            weekday;


        /*
            일요일
        */

        if (
            index === 0
        ) {

          element.classList.add(
              "sunday"
          );

        }


        /*
            토요일
        */

        if (
            index === 6
        ) {

          element.classList.add(
              "saturday"
          );

        }


        weekdayElement.appendChild(
            element
        );

      }
  );


  monthElement.appendChild(
      weekdayElement
  );


  /* ========================================
     날짜 영역
  ======================================== */

  const daysElement =
      document.createElement(
          "div"
      );

  daysElement.className =
      "days";


  /*
      이전 달 빈칸
  */

  for (
      let i = 0;
      i < firstDay;
      i++
  ) {

    const emptyDay =
        document.createElement(
            "div"
        );

    emptyDay.className =
        "day empty";

    daysElement.appendChild(
        emptyDay
    );

  }


  /* ========================================
     날짜 생성
  ======================================== */

  for (
      let date = 1;
      date <= lastDate;
      date++
  ) {

    const day =
        document.createElement(
            "div"
        );

    day.className =
        "day";


    /*
        해당 날짜의 요일
    */

    const weekday =
        (
            firstDay +
            date -
            1
        ) % 7;


    /*
        일요일
    */

    if (
        weekday === 0
    ) {

      day.classList.add(
          "sunday"
      );

    }


    /*
        토요일
    */

    if (
        weekday === 6
    ) {

      day.classList.add(
          "saturday"
      );

    }


    /*
        날짜 숫자
    */

    const number =
        document.createElement(
            "span"
        );

    number.className =
        "day-number";

    number.textContent =
        date;

    day.appendChild(
        number
    );


    /*
        오늘인지 확인
    */

    const today =
        new Date();

    if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        date === today.getDate()
    ) {

      day.classList.add(
          "today"
      );

    }


    daysElement.appendChild(
        day
    );

  }


  /* ========================================
     콘텐츠 레이어
  ======================================== */

  const contentLayer =
      document.createElement(
          "div"
      );

  contentLayer.className =
      "content-layer";


  /*
      콘텐츠 배치
  */

  renderContents(
      contentLayer,
      year,
      month,
      firstDay,
      lastDate
  );


  daysElement.appendChild(
      contentLayer
  );


  monthElement.appendChild(
      daysElement
  );


  return monthElement;

}


/* ========================================
   콘텐츠 렌더링
======================================== */

function renderContents(
    layer,
    year,
    month,
    firstDay,
    lastDate
) {


  /*
      현재 월의 시작일
  */

  const monthStart =
      new Date(
          year,
          month,
          1
      );


  /*
      현재 월의 마지막일
  */

  const monthEnd =
      new Date(
          year,
          month,
          lastDate
      );


  /*
      현재 월과 겹치는 콘텐츠만 가져온다.
  */

  const visibleContents =
      contents.filter(
          content => {

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


  /*
      콘텐츠 Row

      같은 날짜에 여러 콘텐츠가
      존재하면 서로 다른 줄에 배치한다.
  */

  const rows = [];


  visibleContents.forEach(
      content => {


        /*
            콘텐츠의 원래 시작일
        */

        const originalStart =
            parseDate(
                content.startDate
            );


        /*
            콘텐츠의 원래 마지막일
        */

        const originalEnd =
            parseDate(
                content.endDate
            );


        /*
            현재 월에서 실제로 보이는
            시작 날짜
        */

        const visibleStart =
            originalStart < monthStart
                ? monthStart
                : originalStart;


        /*
            현재 월에서 실제로 보이는
            마지막 날짜
        */

        const visibleEnd =
            originalEnd > monthEnd
                ? monthEnd
                : originalEnd;


        /*
            달력 전체에서의 날짜 index

            예:

            첫날이 수요일이면

            일 월 화 수
            0  1  2  3

            3번째 index에서 시작
        */

        const startIndex =
            firstDay +
            visibleStart.getDate() -
            1;


        const endIndex =
            firstDay +
            visibleEnd.getDate() -
            1;


        /*
            콘텐츠가 몇 번째 주부터
            몇 번째 주까지 차지하는지 계산
        */

        const startWeek =
            Math.floor(
                startIndex / 7
            );


        const endWeek =
            Math.floor(
                endIndex / 7
            );


        /*
            주 단위로 콘텐츠를 분리
        */

        for (
            let week = startWeek;
            week <= endWeek;
            week++
        ) {


          /*
              해당 주에서 시작하는
              요일 번호

              첫 번째 주라면 실제 시작 날짜
              그 외에는 일요일
          */

          const weekStart =
              week === startWeek
                  ? startIndex % 7
                  : 0;


          /*
              해당 주에서 끝나는
              요일 번호

              마지막 주라면 실제 마지막 날짜
              그 외에는 토요일
          */

          const weekEnd =
              week === endWeek
                  ? endIndex % 7
                  : 6;


          /*
              같은 주에서 다른 콘텐츠와
              겹치지 않는 Row 찾기
          */

          const row =
              findAvailableRow(
                  rows,
                  week,
                  weekStart,
                  weekEnd
              );


          /*
              Row 기록
          */

          if (
              !rows[row]
          ) {

            rows[row] = [];

          }


          rows[row].push({

            week,

            start:
            weekStart,

            end:
            weekEnd

          });


          /*
              콘텐츠 생성

              startWeek도 함께 전달한다.

              이것을 이용해서
              images 배열의 몇 번째 이미지를
              사용할지 계산한다.
          */

          createContentElement(
              layer,
              content,
              year,
              month,
              week,
              startWeek,
              weekStart,
              weekEnd,
              row
          );

        }

      }
  );

}


/* ========================================
   콘텐츠 Row 계산
======================================== */

function findAvailableRow(
    rows,
    week,
    start,
    end
) {

  let row = 0;


  while (true) {


    /*
        해당 Row가 아직 없다면
        바로 사용
    */

    if (
        !rows[row]
    ) {

      return row;

    }


    /*
        같은 주에 겹치는
        콘텐츠가 있는지 확인
    */

    const overlap =
        rows[row].some(
            item => {

              /*
                  다른 주라면
                  겹치지 않음
              */

              if (
                  item.week !== week
              ) {

                return false;

              }


              /*
                  날짜가 겹치는지 확인
              */

              return !(
                  end < item.start ||
                  start > item.end
              );

            }
        );


    /*
        겹치지 않는 Row 발견
    */

    if (
        !overlap
    ) {

      return row;

    }


    /*
        다음 Row 확인
    */

    row++;

  }

}


/* ========================================
   콘텐츠 Element 생성
======================================== */

function createContentElement(
    layer,
    content,
    year,
    month,
    week,
    startWeek,
    start,
    end,
    row
) {


  /*
      링크 Element
  */

  const element =
      document.createElement(
          "a"
      );


  element.className =
      "content-item";


  /*
      클릭할 주소
  */

  element.href =
      content.link || "#";


  /*
      새 창에서 열기

      필요 없다면 아래 두 줄 삭제 가능
  */

  element.target =
      "_blank";

  element.rel =
      "noopener noreferrer";


  /*
      접근성
  */

  element.setAttribute(
      "aria-label",
      content.title
  );


  /* ========================================
     가로 위치
  ======================================== */


  /*
      날짜 한 칸의 너비

      100% / 7
  */

  const dayWidth =
      100 / 7;


  /*
      왼쪽 위치
  */

  const left =
      start * dayWidth;


  /*
      콘텐츠가 차지하는 날짜 수
  */

  const width =
      (
          end -
          start +
          1
      ) * dayWidth;


  /* ========================================
     세로 위치
  ======================================== */


  /*
      현재 week는 현재 달력에서
      몇 번째 줄인지 나타낸다.

      예:

      첫 번째 주 → week = 0
      두 번째 주 → week = 1
      세 번째 주 → week = 2
    */

  const contentTop =
      week * WEEK_HEIGHT +
      5 +
      row *
      (
          CONTENT_HEIGHT +
          CONTENT_GAP
      );


  element.style.left =
      `${left}%`;

  element.style.width =
      `${width}%`;

  element.style.top =
      `${contentTop}px`;

  element.style.height =
      `${CONTENT_HEIGHT}px`;


  /* ========================================
     사용할 이미지 결정
  ======================================== */


  /*
      콘텐츠가 시작된 주의 일요일
  */

  const contentStart =
      parseDate(
          content.startDate
      );


  const contentStartWeek =
      getWeekStart(
          contentStart
      );


  /*
      현재 달력에서 표시하고 있는
      week의 실제 일요일 날짜를 계산한다.

      중요:
      단순히 week 번호만 비교하면
      월이 넘어갈 때 다시 0부터 시작하기 때문에
      이미지 순서가 꼬일 수 있다.

      따라서 실제 날짜를 사용한다.
  */

  const currentMonthStart =
      new Date(
          year,
          month,
          1
      );


  /*
      현재 달력의 첫 번째 주 일요일

      예:

      2026년 9월 1일은 화요일이므로

      8월 30일 ← 첫 번째 주 시작
  */

  const firstWeekStart =
      new Date(
          currentMonthStart
      );

  firstWeekStart.setDate(
      firstWeekStart.getDate() -
      firstWeekStart.getDay()
  );


  /*
      현재 콘텐츠가 표시되는
      주의 일요일
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
      실제 주 차이
  */
  const weekDifference =
      Math.round(
          getDayDifference(
              contentStartWeek,
              currentWeekStart
          ) / 7
      );


  /*
      콘텐츠 시작 월과
      현재 표시 중인 월의 차이

      같은 달 → 0
      다음 달 → 1
      다다음 달 → 2
  */
  const monthDifference =
      (year - contentStart.getFullYear()) * 12 +
      (month - (contentStart.getMonth()));


  /*
      최종 이미지 순서

      주가 넘어가면 +1
      달이 넘어가면 추가로 +1
  */
  const imageIndex =
      weekDifference +
      monthDifference;


  /*
      사용할 이미지

      imageIndex가 0이면 images[0]
      imageIndex가 1이면 images[1]
      ...
  */

  const image =
      content.images?.[imageIndex];


  /* ========================================
     이미지 생성
  ======================================== */

  if (
      image
  ) {

    const imageElement =
        document.createElement(
            "img"
        );


    imageElement.className =
        "content-image";


    imageElement.src =
        image;


    imageElement.alt =
        content.title;


    /*
        이미지 로딩 실패
    */

    imageElement.onerror =
        () => {

          imageElement.remove();

          createNoImageElement(
              element,
              content.title
          );

        };


    element.appendChild(
        imageElement
    );


  } else {

    /*
        images 배열에
        해당 주의 이미지가 없는 경우
    */

    createNoImageElement(
        element,
        content.title
    );

  }


  /* ========================================
     Tooltip
  ======================================== */

  const tooltip =
      document.createElement(
          "span"
      );


  tooltip.className =
      "content-tooltip";


  tooltip.textContent =
      `${content.title} (${content.startDate} ~ ${content.endDate})`;


  element.appendChild(
      tooltip
  );


  /* ========================================
     최종 추가
  ======================================== */

  layer.appendChild(
      element
  );

}


/* ========================================
   이미지가 없을 때
======================================== */

function createNoImageElement(
    parent,
    title
) {

  const element =
      document.createElement(
          "div"
      );


  element.className =
      "content-no-image";


  element.textContent =
      title;


  parent.appendChild(
      element
  );

}