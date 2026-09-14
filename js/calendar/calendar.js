let currentYear =
    new Date().getFullYear();

let currentMonth =
    new Date().getMonth();


function renderCalendar() {

  const calendar =
      document.getElementById(
          "calendar"
      );


  /*
      연도 표시
  */

  document
  .getElementById(
      "current-year"
  )
      .textContent =
      currentYear;


  /*
      월 표시
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


/*
    다른 파일에서
    현재 날짜를 읽을 수 있도록 함수 제공
*/

function getCurrentYear() {

  return currentYear;

}


function getCurrentMonth() {

  return currentMonth;

}


function setCurrentYear(
    year
) {

  currentYear = year;

}


function setCurrentMonth(
    month
) {

  currentMonth = month;

}