document.addEventListener(
    "DOMContentLoaded",
    () => {

      setupControls(
          getCurrentYear,
          getCurrentMonth,
          setCurrentYear,
          setCurrentMonth,
          renderCalendar
      );


      renderCalendar();

    }
);