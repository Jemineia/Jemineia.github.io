const weekdays = [
  "일",
  "월",
  "화",
  "수",
  "목",
  "금",
  "토"
];


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
  */

  const firstDay =
      new Date(
          year,
          month,
          1
      ).getDay();


  /*
      마지막 날짜
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
      (weekday, index) => {

        const element =
            document.createElement(
                "div"
            );

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


  /* ========================================
     날짜
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


  /*
      날짜 생성
  */

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


    const weekday =
        (
            firstDay +
            date -
            1
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
        오늘
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
   콘텐츠
  ======================================== */

  renderContents(
      contents,
      year,
      month,
      daysElement
  );

  monthElement.appendChild(
      daysElement
  );


  return monthElement;

}