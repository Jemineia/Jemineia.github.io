let currentArchiveYear =
    new Date().getFullYear();

/* =================================
   초기화
================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

      renderArchive();

      setupArchiveControls();

    }
);

const carousel =
    document.getElementById(
        "content-carousel"
    );

carousel.addEventListener(
    "wheel",
    (event) => {

      event.preventDefault();

      carousel.scrollBy({
        left: event.deltaY,
        behavior: "smooth"
      });

    },
    {
      passive: false
    }
);

/* =================================
   연간 페이지 렌더링
================================= */

function renderArchive() {

  const yearElement =
      document.getElementById(
          "current-year"
      );

  const titleElement =
      document.getElementById(
          "archive-title"
      );

  const countElement =
      document.getElementById(
          "archive-count"
      );

  const carousel =
      document.getElementById(
          "content-carousel"
      );

  yearElement.textContent =
      currentArchiveYear;

  titleElement.textContent =
      `${currentArchiveYear}년에 즐겼던 콘텐츠`;

  carousel.innerHTML = "";

  const yearContents =
      getContentsForYear(
          contents,
          currentArchiveYear
      );

  countElement.textContent =
      `${yearContents.length}개의 콘텐츠`;

  if (yearContents.length === 0) {

    const empty =
        document.createElement("div");

    empty.className =
        "empty-message";

    empty.textContent =
        `${currentArchiveYear}년에 기록된 콘텐츠가 없습니다.`;

    carousel.appendChild(empty);

    return;
  }

  yearContents.forEach(
      (content) => {

        const card =
            createContentCard(
                content
            );

        carousel.appendChild(card);

      }
  );

}

/* =================================
   해당 연도의 콘텐츠 가져오기
================================= */

function getContentsForYear(
    contentList,
    year
) {

  const yearStart =
      new Date(
          year,
          0,
          1
      );

  const yearEnd =
      new Date(
          year,
          11,
          31
      );

  return contentList.filter(
      (content) => {

        const startDate =
            parseArchiveDate(
                content.startDate
            );

        const endDate =
            parseArchiveDate(
                content.endDate
            );

        /*
         * 콘텐츠 기간과 해당 연도가
         * 한 번이라도 겹치면 포함
         */

        return (
            startDate <= yearEnd &&
            endDate >= yearStart
        );

      }
  );

}

/* =================================
   날짜 변환
================================= */

function parseArchiveDate(
    dateString
) {

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

/* =================================
   콘텐츠 카드 생성
================================= */

function createContentCard(
    content
) {

  const card =
      document.createElement("article");

  card.className =
      "content-card";

  /* 이미지 */

  const imageContainer =
      document.createElement("div");

  imageContainer.className =
      "content-card-image";

  const image =
      getRepresentativeImage(
          content
      );

  if (image) {

    /*
     * 흐린 배경 이미지
     */

    const background =
        document.createElement("div");

    background.className =
        "content-card-background";

    background.style.backgroundImage =
        `url("${image.src}")`;

    imageContainer.appendChild(
        background
    );

    /*
     * 원본 이미지
     */

    const imageElement =
        document.createElement("img");

    imageElement.src =
        image.src;

    imageElement.alt =
        content.title;

    imageElement.style.objectFit =
        "contain";

    imageElement.onerror =
        () => {

          imageContainer.innerHTML = "";

          const noImage =
              document.createElement(
                  "div"
              );

          noImage.className =
              "content-card-no-image";

          noImage.textContent =
              "이미지를 불러올 수 없습니다.";

          imageContainer.appendChild(
              noImage
          );

        };

    imageContainer.appendChild(
        imageElement
    );

  } else {

    const noImage =
        document.createElement(
            "div"
        );

    noImage.className =
        "content-card-no-image";

    noImage.textContent =
        "이미지 없음";

    imageContainer.appendChild(
        noImage
    );

  }

  card.appendChild(
      imageContainer
  );

  /* 카드 정보 */

  const info =
      document.createElement("div");

  info.className =
      "content-card-info";

  const title =
      document.createElement("h4");

  title.className =
      "content-card-title";

  title.textContent =
      content.title;

  info.appendChild(
      title
  );

  const date =
      document.createElement("p");

  date.className =
      "content-card-date";

  date.textContent =
      `${content.startDate} ~ ${content.endDate}`;

  info.appendChild(
      date
  );

  /* 링크 */

  if (content.link) {

    const link =
        document.createElement("a");

    link.className =
        "content-card-link";

    link.href =
        content.link;

    link.target =
        "_blank";

    link.rel =
        "noopener noreferrer";

    link.textContent =
        "콘텐츠 보기 →";

    info.appendChild(
        link
    );

  }

  card.appendChild(
      info
  );

  /*
   * 카드 자체를 클릭했을 때도
   * 콘텐츠 링크로 이동
   */

  if (content.link) {

    card.addEventListener(
        "click",
        (event) => {

          /*
           * 내부 링크를 직접 클릭한 경우에는
           * 이벤트를 다시 실행하지 않는다.
           */

          if (
              event.target.closest(
                  ".content-card-link"
              )
          ) {
            return;
          }

          window.open(
              content.link,
              "_blank",
              "noopener,noreferrer"
          );

        }
    );

  }

  return card;

}

/* =================================
   대표 이미지
================================= */

function getRepresentativeImage(
    content
) {

  if (
      !Array.isArray(
          content.images
      )
  ) {
    return null;
  }

  for (
      const image
      of content.images
      ) {

    if (
        typeof image === "string" &&
        image.trim() !== ""
    ) {

      return {
        src: image,
        fit: "cover"
      };

    }

    if (
        image &&
        typeof image === "object" &&
        typeof image.src === "string" &&
        image.src.trim() !== ""
    ) {

      return {
        src: image.src.trim(),

        fit:
            image.fit === "contain"
                ? "contain"
                : "cover"
      };

    }

  }

  return null;

}

/* =================================
   연도 이동
================================= */

function setupArchiveControls() {

  const prevYear =
      document.getElementById(
          "prev-year"
      );

  const nextYear =
      document.getElementById(
          "next-year"
      );

  prevYear.addEventListener(
      "click",
      () => {

        currentArchiveYear--;

        renderArchive();

      }
  );

  nextYear.addEventListener(
      "click",
      () => {

        currentArchiveYear++;

        renderArchive();

      }
  );

  /* 카드 좌우 이동 */

  const carousel =
      document.getElementById(
          "content-carousel"
      );

  const prevContent =
      document.getElementById(
          "prev-content"
      );

  const nextContent =
      document.getElementById(
          "next-content"
      );

  prevContent.addEventListener(
      "click",
      () => {

        carousel.scrollBy({
          left: -350,
          behavior: "smooth"
        });

      }
  );

  nextContent.addEventListener(
      "click",
      () => {

        carousel.scrollBy({
          left: 350,
          behavior: "smooth"
        });

      }
  );

}