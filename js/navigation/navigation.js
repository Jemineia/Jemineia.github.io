function setupControls(
    getCurrentYear,
    getCurrentMonth,
    setCurrentYear,
    setCurrentMonth,
    renderCalendar
) {

  /*
      이전 연도
  */

  document
  .getElementById("prev-year")
  .addEventListener(
      "click",
      () => {

        setCurrentYear(
            getCurrentYear() - 1
        );

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

        setCurrentYear(
            getCurrentYear() + 1
        );

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

        let month =
            getCurrentMonth();

        let year =
            getCurrentYear();

        month--;

        if (month < 0) {

          month = 11;

          year--;

        }

        setCurrentMonth(month);

        setCurrentYear(year);

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

        let month =
            getCurrentMonth();

        let year =
            getCurrentYear();

        month++;

        if (month > 11) {

          month = 0;

          year++;

        }

        setCurrentMonth(month);

        setCurrentYear(year);

        renderCalendar();

      }
  );

}