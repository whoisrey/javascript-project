// 달력을 조작할 때 사용할 변수들을 설정합니다.
const calendarContainer = document.getElementById("calendar-container");
const yearElement = document.querySelector(".year");
const monthElement = document.querySelector(".month");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const table = document.querySelector("table");
const firstHeader = document.querySelector(".first-header");
const firstTitle = document.getElementById("first-title");
const calendarButton = document.getElementById("calendar");
const caption = document.querySelector("caption");
const time = document.querySelector("time");
const article = document.querySelector("article");

// 초기 날짜 설정
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// 달력을 그리는 함수를 정의합니다.
function drawCalendar(year, month) {
  // 먼저 테이블 내용을 지웁니다.
  table.innerHTML = "";

  // 연도와 월을 업데이트합니다.
  yearElement.textContent = year;
  monthElement.textContent = month + 1;

  // 캘린더 헤더를 생성합니다.
  const headerRow = document.createElement("tr");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (const day of daysOfWeek) {
    const th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  // 월의 첫 날을 찾습니다.
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();

  // 월의 일수를 찾습니다.
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 달력에 일자를 추가합니다.
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startingDay) {
        // 첫 주에서 시작일 이전의 빈 칸을 만듭니다.
        const cell = document.createElement("td");
        row.appendChild(cell);
      } else if (date <= daysInMonth) {
        // 유효한 날짜를 채웁니다.
        const cell = document.createElement("td");
        cell.textContent = date;
        row.appendChild(cell);
        date++;
      } else {
        // 모든 날짜를 채운 후 남은 빈 칸을 만듭니다.
        const cell = document.createElement("td");
        row.appendChild(cell);
      }
    }

    table.appendChild(row);

    if (date > daysInMonth) {
      break;
    }
  }
}

// 초기 달력 그리기
drawCalendar(currentYear, currentMonth);

// 이전 월로 이동하는 함수
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  drawCalendar(currentYear, currentMonth);
}

// 다음 월로 이동하는 함수
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  drawCalendar(currentYear, currentMonth);
}

// 이전 월, 다음 월 버튼에 클릭 이벤트 리스너 추가
prevButton.addEventListener("click", prevMonth);
nextButton.addEventListener("click", nextMonth);

// 달력을 숨기는 함수
function hideCalendar() {
  calendarContainer.style.display = "none";
  calendarButton.innerHTML = "+ Add to Calendar";

  const divWrapper = firstHeader.querySelector("div");
  if (divWrapper) {
    firstHeader.innerHTML = ""; // firstHeader 내용 초기화
    firstHeader.appendChild(firstTitle);
    firstHeader.appendChild(calendarButton);
  }
}

// 달력을 표시하는 함수
function showCalendar() {
  calendarButton.innerHTML = "+ Hide to Calendar";
  calendarContainer.style.display = "block";

  const divWrapper = document.createElement("div");
  divWrapper.appendChild(firstTitle);
  divWrapper.appendChild(calendarButton);
  firstHeader.innerHTML = ""; // firstHeader 내용 초기화
  firstHeader.appendChild(divWrapper);
  firstHeader.appendChild(calendarContainer);
  firstHeader.style.alignItems = "center";
  firstHeader.style.marginBottom = "0";
}

// 초기에는 달력을 숨깁니다.
hideCalendar();

// 버튼 클릭 이벤트를 처리하는 함수
calendarButton.addEventListener("click", function () {
  if (
    calendarContainer.style.display === "none" ||
    calendarContainer.style.display === ""
  ) {
    showCalendar();
  } else {
    hideCalendar();
  }
});
