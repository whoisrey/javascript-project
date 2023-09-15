// 달력을 조작할 때 사용할 변수들을 설정합니다.
const calendarContainer = document.getElementById("calendar-container");
const yearElement = calendarContainer.querySelector(".year");
const monthElement = calendarContainer.querySelector(".month");
const prevButton = calendarContainer.querySelector(".prev");
const nextButton = calendarContainer.querySelector(".next");
const table = calendarContainer.querySelector("table");

const addBtn = document.getElementById("calendar");

// 초기 날짜 설정
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// 달력을 그리는 함수를 정의합니다.
function drawCalendar(year, month) {
  // 먼저 테이블 내용을 지웁니다.
  table.innerHTML = "";

  // 년도와 월을 업데이트합니다.
  yearElement.textContent = year;
  monthElement.textContent = month + 1; // JavaScript의 월은 0부터 시작하므로 1을 더해줍니다.

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
  addBtn.innerHTML = "+ Add to Calendar";
}

// 달력을 표시하는 함수
function showCalendar() {
  calendarContainer.style.display = "block";
  addBtn.innerHTML = "+ Hide to Calendar";
}

// 초기에는 달력을 숨깁니다.
hideCalendar();

// 버튼 클릭 이벤트를 처리하는 함수
addBtn.addEventListener("click", function () {
  if (
    calendarContainer.style.display === "none" ||
    calendarContainer.style.display === ""
  ) {
    showCalendar();
  } else {
    hideCalendar();
  }
});

// 달력을 초기화하고 표시하는 로직은 여기에 추가하세요.
// (위에서 설명한 달력 생성 및 조작 함수를 사용할 수 있습니다.)
