/* ========================================
   날짜 파싱
======================================== */

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