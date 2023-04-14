// 타이머 상태를 나타내는 변수들
let timerInterval; // 타이머 인터벌 ID
let hours = 0;
let minutes = 0;
let seconds = 0;

// 타이머 업데이트 함수
function updateTimer() {
  // 시간, 분, 초를 표시하는 요소들을 선택
  const hoursElement = document.querySelector(".labels img:nth-child(1)");
  const minutesElement = document.querySelector(".labels img:nth-child(2)");
  const secondsElement = document.querySelector(".labels img:nth-child(3)");

  // 시간, 분, 초를 각각 업데이트
  hoursElement.setAttribute("src", `/img/component/${hours}.svg`);
  minutesElement.setAttribute("src", `/img/component/${minutes}.svg`);
  secondsElement.setAttribute("src", `/img/component/${seconds}.svg`);
}

// Start 버튼 클릭 이벤트 핸들러
document.getElementById("start-btn").addEventListener("click", function () {
  // 타이머가 이미 동작 중인 경우에는 무시
  if (timerInterval) return;

  // 타이머 인터벌 시작
  timerInterval = setInterval(function () {
    // 1초씩 감소
    seconds--;
    if (seconds < 0) {
      minutes--;
      seconds = 59;
      if (minutes < 0) {
        hours--;
        minutes = 59;
        if (hours < 0) {
          // 타이머가 0이 되면 초기화
          clearInterval(timerInterval);
          timerInterval = null;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
      }
    }

    // 타이머 업데이트
    updateTimer();
  }, 1000);
});

// Reset 버튼 클릭 이벤트 핸들러
document.getElementById("resetButton").addEventListener("click", function () {
  // 타이머가 동작 중인 경우에는 멈추고 초기화
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  hours = 0;
  minutes = 0;
  seconds = 0;

  // 타이머 업데이트
  updateTimer();
});

// 초기화 시 타이머 업데이트
updateTimer();
