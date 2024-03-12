const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const currentDate = new Date();
let month = currentDate.getMonth();
let year = currentDate.getFullYear();

window.onload = function () {
  generateCalendar(month, year);
};

prevBtn.addEventListener("click", () => {
  month--;
  generateCalendar(month, year);
});

nextBtn.addEventListener("click", () => {
  month++;
  generateCalendar(month, year);
});

function generateCalendar(month, year) {
  const calendar = document.getElementById("calendar");
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();
  const monthContainer = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];

  const yearSquare = document.querySelector(".calendar-year");
  yearSquare.textContent = year;

  const monthSquare = document.querySelector(".calendar-month");
  monthSquare.textContent = monthContainer[month];

  for (let i = 0; i < firstDayOfWeek; i++) {
    let blankDay = document.createElement("div");
    calendar.appendChild(blankDay);
  }

  for (let day = 1; day <= totalDays; day++) {
    let daySquare = document.createElement("div");
    daySquare.className = "calendar-day";
    daySquare.textContent = day;
    daySquare.id = `day - ${day}`;
    calendar.appendChild(daySquare);
  }
}

function showAddTaskModal() {
  document.getElementById("addTaskModal").style.display = "block";
}

function closeAddTaskModal() {
  document.getElementById("addTaskModal").style.display = "none";
}

function deleteTask(taskElement) {
  if (confirm("이 작업을 삭제하시겠습니까?")) {
    taskElement.parentNode.removeChild(taskElement);
  }
}

function editTask(taskElement) {
  const newTaskDesc = prompt("편집할 작업:", taskElement.textContent);
  if ((newTaskDesc !== null) & (newTaskDesc.trim() !== "")) {
    taskElement.textContent = newTaskDesc;
  }
}

function addTask() {
  const taskDate = new Date(document.getElementById("task-date").value);
  const taskDesc = document.getElementById("task-desc").value.trim();

  if (taskDesc && !isNaN(taskDate.getDate())) {
    const calendarDays = document.getElementById("calendar").children;
    for (let i = 0; i < calendarDays.length; i++) {
      const day = calendarDays[i];
      if (parseInt(day.textContent) === taskDate.getDate()) {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.textContent = taskDesc;

        taskElement.addEventListener("contextmenu", function (event) {
          event.preventDefault();
          deleteTask(taskElement);
        });

        taskElement.addEventListener("click", function () {
          editTask(taskElement);
        });

        day.appendChild(taskElement);
        break;
      }
    }
    closeAddTaskModal();
  } else {
    alert("유효한 날짜와 작업을 입력해주세요.");
  }
}
