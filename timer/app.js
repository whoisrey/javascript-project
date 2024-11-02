let timerInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;

function updateTimer() {
  const hoursElement = document.querySelector(".labels img:nth-child(1)");
  const minutesElement = document.querySelector(".labels img:nth-child(2)");
  const secondsElement = document.querySelector(".labels img:nth-child(3)");

  hoursElement.setAttribute("src", `/img/component/${hours}.svg`);
  minutesElement.setAttribute("src", `/img/component/${minutes}.svg`);
  secondsElement.setAttribute("src", `/img/component/${seconds}.svg`);
}

document.getElementById("start-btn").addEventListener("click", function () {
  if (timerInterval) return;

  timerInterval = setInterval(function () {
    seconds--;
    if (seconds < 0) {
      minutes--;
      seconds = 59;
      if (minutes < 0) {
        hours--;
        minutes = 59;
        if (hours < 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
      }
    }

    updateTimer();
  }, 1000);
});

document.getElementById("resetButton").addEventListener("click", function () {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  hours = 0;
  minutes = 0;
  seconds = 0;

  updateTimer();
});

updateTimer();
