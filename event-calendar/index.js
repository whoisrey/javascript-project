window.onload = function () {
  generateCalendar();
};

function generateCalendar() {
  const calendar = document.getElementById("calendar");
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

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
  document.getElementById("add-task-modal").style.display = "block";
}

function closeAddTaskModal() {
  document.getElementById("add-task-modal").style.display = "none";
}

function deleteTask(taskElement) {
  if (confirm("이 작업을 삭제하시겠습니까?")) {
    taskElement.parentNode.removeChild(taskElement);
  }
}
