/* ========================================
   현재 보고 있는 연도
======================================== */

let currentYear = new Date().getFullYear();


/* ========================================
   콘텐츠 데이터
========================================

   startDate : 콘텐츠를 즐기기 시작한 날짜
   endDate   : 콘텐츠를 즐긴 마지막 날짜
   title     : 콘텐츠 이름
   image     : 이미지 경로
   link      : 클릭했을 때 이동할 주소

======================================== */

const contents = [

  {
    title: "오징어 게임",
    startDate: "2026-09-01",
    endDate: "2026-09-07",

    image: "images/contents/squid-game.jpg",

    link: "#"
  },

  {
    title: "하이스쿨 러브온",
    startDate: "2026-09-10",
    endDate: "2026-09-12",

    image: "images/contents/highschool-loveon.jpg",

    link: "#"
  },

  {
    title: "콘텐츠 A",
    startDate: "2026-09-15",
    endDate: "2026-09-20",

    image: "images/contents/content-a.jpg",

    link: "#"
  },

  {
    title: "콘텐츠 B",
    startDate: "2026-09-18",
    endDate: "2026-09-25",

    image: "images/contents/content-b.jpg",

    link: "#"
  },

  /*
      월을 넘어가는 콘텐츠도 가능
  */

  {
    title: "10월까지 이어지는 콘텐츠",

    startDate: "2026-09-28",
    endDate: "2026-10-05",

    image: "images/contents/content-c.jpg",

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
   캘린더 초기화
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

      renderCalendar();

      setupYearButtons();

    }
);


/* ========================================
   연도 버튼
======================================== */

function setupYearButtons() {

  document
  .getElementById("prev-year")
  .addEventListener(
      "click",
      () => {

        currentYear--;

        renderCalendar();

      }
  );


  document
  .getElementById("next-year")
  .addEventListener(
      "click",
      () => {

        currentYear++;

        renderCalendar();

      }
  );

}


/* ========================================
   전체 캘린더 생성
======================================== */

function renderCalendar() {

  const calendar =
      document.getElementById("calendar");

  const yearElement =
      document.getElementById("current-year");


  yearElement.textContent =
      currentYear;


  calendar.innerHTML = "";


  for (
      let month = 0;
      month < 12;
      month++
  ) {

    const monthElement =
        createMonth(
            currentYear,
            month
        );

    calendar.appendChild(
        monthElement
    );

  }

}


/* ========================================
   한 달 생성
======================================== */

function createMonth(year, month) {

  const monthElement =
      document.createElement("article");

  monthElement.className = "month";


  /* -------------------------------
     월 제목
  -------------------------------- */

  const title =
      document.createElement("div");

  title.className = "month-title";

  title.textContent =
      `${month + 1}월`;


  monthElement.appendChild(title);


  /* -------------------------------
     요일
  -------------------------------- */

  const weekdayElement =
      document.createElement("div");

  weekdayElement.className =
      "weekdays";


  weekdays.forEach(
      (weekday, index) => {

        const element =
            document.createElement("div");

        element.className =
            "weekday";

        element.textContent =
            weekday;


        if (index === 0) {

          element.classList.add(
              "sunday"
          );

        }

        if (index === 6) {

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


  /* -------------------------------
     날짜 영역
  -------------------------------- */

  const daysElement =
      document.createElement("div");

  daysElement.className = "days";


  /*
      해당 월 1일의 요일

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
      해당 월의 마지막 날짜
  */

  const lastDate =
      new Date(
          year,
          month + 1,
          0
      ).getDate();


  /*
      이전 달 빈 칸
  */

  for (
      let i = 0;
      i < firstDay;
      i++
  ) {

    const emptyDay =
        document.createElement("div");

    emptyDay.className =
        "day empty";

    daysElement.appendChild(
        emptyDay
    );

  }


  /*
      실제 날짜 생성
  */

  for (
      let date = 1;
      date <= lastDate;
      date++
  ) {

    const day =
        document.createElement("div");

    day.className = "day";


    /*
        날짜
    */

    const number =
        document.createElement("span");

    number.className =
        "day-number";

    number.textContent =
        date;


    /*
        요일
    */

    const weekday =
        (
            firstDay + date - 1
        ) % 7;


    if (weekday === 0) {

      day.classList.add(
          "sunday"
      );

    }

    if (weekday === 6) {

      day.classList.add(
          "saturday"
      );

    }


    /*
        오늘 날짜인지 확인
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


    day.appendChild(number);

    daysElement.appendChild(day);

  }


  /*
      콘텐츠를 그 위에 표시하기 위한 레이어
  */

  const contentLayer =
      document.createElement("div");

  contentLayer.className =
      "content-layer";


  /*
      현재 월의 콘텐츠 생성
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
      같은 줄에 겹치는 콘텐츠를
      피하기 위한 row 배열
  */

  const rows = [];


  /*
      현재 월과 겹치는 콘텐츠 찾기
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
          month,
          lastDate
      );


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


            /*
                콘텐츠 기간과
                현재 월이 겹치는지 확인
            */

            return (
                start <= monthEnd &&
                end >= monthStart
            );

          }
      );


  /*
      콘텐츠 배치
  */

  visibleContents.forEach(
      content => {

        const start =
            parseDate(
                content.startDate
            );

        const end =
            parseDate(
                content.endDate
            );


        /*
            현재 월에서 보이는
            시작 날짜
        */

        const visibleStart =
            start < monthStart
                ? monthStart
                : start;


        /*
            현재 월에서 보이는
            마지막 날짜
        */

        const visibleEnd =
            end > monthEnd
                ? monthEnd
                : end;


        /*
            날짜 번호
        */

        const startDate =
            visibleStart.getDate();

        const endDate =
            visibleEnd.getDate();


        /*
            달력 전체에서의 위치
        */

        const startIndex =
            firstDay +
            startDate -
            1;


        const endIndex =
            firstDay +
            endDate -
            1;


        /*
            몇 번째 주에 있는지
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
            여러 주를 걸치는 콘텐츠는
            주 단위로 나누어 표시

            단,

            같은 주 안에서는
            하나의 긴 이미지로 표시됨
        */

        for (
            let week = startWeek;
            week <= endWeek;
            week++
        ) {

          const weekStart =
              week === startWeek
                  ? startIndex % 7
                  : 0;


          const weekEnd =
              week === endWeek
                  ? endIndex % 7
                  : 6;


          /*
              콘텐츠가 들어갈 row 찾기
          */

          const row =
              findAvailableRow(
                  rows,
                  week,
                  weekStart,
                  weekEnd
              );


          /*
              row 사용 기록
          */

          if (!rows[row]) {

            rows[row] = [];

          }


          rows[row].push({
            week,
            start: weekStart,
            end: weekEnd
          });


          /*
              콘텐츠 DOM 생성
          */

          createContentElement(
              layer,
              content,
              week,
              weekStart,
              weekEnd,
              row
          );

        }

      }
  );

}


/* ========================================
   콘텐츠 배치 가능한 row 찾기
======================================== */

function findAvailableRow(
    rows,
    week,
    start,
    end
) {

  let row = 0;


  while (true) {

    if (!rows[row]) {

      return row;

    }


    /*
        해당 row에 같은 주의
        콘텐츠가 존재하는지 확인
    */

    const overlap =
        rows[row].some(
            item => {

              if (
                  item.week !== week
              ) {

                return false;

              }


              /*
                  날짜 범위가 겹치면
                  true
              */

              return !(
                  end < item.start ||
                  start > item.end
              );

            }
        );


    if (!overlap) {

      return row;

    }


    row++;

  }

}


/* ========================================
   콘텐츠 DOM 생성
======================================== */

function createContentElement(
    layer,
    content,
    week,
    start,
    end,
    row
) {

  const element =
      document.createElement("a");


  element.className =
      "content-item";


  /*
      링크
  */

  element.href =
      content.link || "#";


  /*
      새 창에서 열기

      필요 없다면 제거 가능
  */

  element.target = "_blank";


  /*
      접근성
  */

  element.setAttribute(
      "aria-label",
      content.title
  );


  /*
      한 날짜 칸의 너비

      100 / 7 %
  */

  const dayWidth =
      100 / 7;


  /*
      left

      일요일 = 0%
      월요일 = 14.28%
      ...
  */

  const left =
      start * dayWidth;


  /*
      width

      시작 ~ 끝 날짜 개수
  */

  const width =
      (
          end -
          start +
          1
      ) * dayWidth;


  /*
      한 주의 높이

      55px 정도의 날짜 칸에서
      콘텐츠가 들어갈 공간
  */

  const rowHeight = 55;


  /*
      콘텐츠 스타일
  */

  element.style.left =
      `${left}%`;

  element.style.width =
      `${width}%`;


  /*
      위에서 몇 번째 콘텐츠인지
  */

  element.style.top =
      `${row * 55 + 20}px`;


  /*
      이미지가 존재하면 이미지 표시
  */

  if (content.image) {

    const image =
        document.createElement("img");

    image.className =
        "content-image";

    image.src =
        content.image;

    image.alt =
        content.title;


    /*
        이미지 로딩 실패 시
        제목 표시
    */

    image.onerror =
        () => {

          image.remove();

          createNoImageElement(
              element,
              content.title
          );

        };


    element.appendChild(
        image
    );

  } else {

    createNoImageElement(
        element,
        content.title
    );

  }


  /*
      마우스 오버 툴팁
  */

  const tooltip =
      document.createElement("span");

  tooltip.className =
      "content-tooltip";

  tooltip.textContent =
      `${content.title} (${content.startDate} ~ ${content.endDate})`;


  element.appendChild(
      tooltip
  );


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
      document.createElement("div");

  element.className =
      "content-no-image";

  element.textContent =
      title;


  parent.appendChild(
      element
  );

}


/* ========================================
   날짜 문자열 → Date
======================================== */

function parseDate(dateString) {

  /*
      YYYY-MM-DD

      형태를 안전하게 처리하기 위해
      직접 분리
  */

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