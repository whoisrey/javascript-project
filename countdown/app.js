const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2023, 5, 30, 6, 10, 0);

const year = futureDate.getFullYear();
let month = futureDate.getMonth() + 1;
const date = futureDate.getDate();

const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

const weekdays = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `생각하고 싶지 않은  ${year}년 ${month}월 ${date} 일, ${weekday} 오후 ${hours}시 ${minutes}분`;

// 미래 시간 값 밀리초로 반환
const futureTime = futureDate.getTime();
console.log(futureTime);

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  // 밀리초
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hr

  // 밀리초 값
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // 일, 시, 분, 초 계산식
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // 일, 시, 분, 초 배열
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  // 카운트다운 설정 시간이 완료되었을 때 메시지 나오게 하는
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">...</h4>`;
  }
}
// 1초씩 getRemainingTime 함수 실행
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();

// 이미지가 1초마다 바뀌게 실행하는 함수
const images = ["A.jpg", "B.jpg", "C.jpg", "D.jpg", "E.jpg", "F.jpg", "G.jpg"];
let currentIndex = 0;
const imageElement = document.getElementById("characters");

function changeImage() {
  imageElement.src = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
  console.log(currentIndex);
}
// currentIndex는 무한히 늘어나지 않는다.

setInterval(changeImage, 1000);

// 마우스오버 text가 바뀌는 이벤트 추가
const title = document.querySelector("h3");
const text = document.querySelector("p");
const img = document.querySelector("img");
let intervalId;

text.addEventListener("mouseover", function () {
  title.innerHTML = "취업하는 그 날...?";
  text.innerHTML = "다시 만나기 위한 약속일꺼야~";
  text.style.fontSize = "50px";
  text.style.color = "skyblue";
});

text.addEventListener("mouseout", function () {
  title.innerHTML = "수료하는 그 날...";
  text.innerHTML =
    "안녕은 영원한 헤어짐은 아니겠지요~<br>(마우스를 올려보세요)";
  text.style.fontSize = "16px";
  text.style.color = "var(--clr-primary-3)";
});
