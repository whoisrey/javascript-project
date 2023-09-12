// reviews 라는 배열 id, name, job, img, text 프로퍼티를 갖고 있음
const reviews = [
  {
    id: 1,
    name: "정색",
    job: "사실 자다 일어남",
    img: "./img/js.png",
    text: "오래 잠든 후에 입에 눌려서 강제로 웃고 있는 표정",
  },
  {
    id: 2,
    name: "멍 때리기",
    job: "나는 아무 생각이 없다",
    img: "./img/mung.jpeg",
    text: "진짜 아무 생각이 없는 표정",
  },
  {
    id: 3,
    name: "웃음",
    job: "세상을 다 가진 기분",
    img: "./img/smile.png",
    text: "맑은 공기와 화창한 날씨에 산책을 가야 나오는 표정 ",
  },
  {
    id: 4,
    name: "놀람",
    job: "휘둥그레",
    img: "./img/surprised.jpeg",
    text: "날 좀 지켜달라는 표정 ",
  },
];

// 클래스와 아이디로 아이템들을 선택
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");
const resetBtn = document.querySelector(".reset-btn");

// 색 아이템들 선택
const colors = [
  "#7CB9E8o",
  "#6CB4EE",
  "#0066b2",
  "#5072A7",
  "#318CE7",
  "#4B9CD3",
  "#034694",
];

// 초기값 설정
let currentItem = 0;

// 시작 페이지 불러오기
window.addEventListener("DOMContentLoaded", function () {
  showPerson();
});

// showPerson() 함수 정의 (reviews 정보 담아오기)
function showPerson() {
  const item = reviews[currentItem];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

// next 버튼 클릭했을 때 이벤트 효과
nextBtn.addEventListener("click", function () {
  const randomNumber = getRandomNumber();
  document.body.style.backgroundColor = colors[randomNumber];
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
    document.body.style.background = colors[randomNumber];
  }
  showPerson();
});

// prev 버튼 클릭했을 때 이벤트 효과
prevBtn.addEventListener("click", function () {
  const randomNumber = getRandomNumber();
  document.body.style.background = colors[randomNumber];
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson();
});

// 아무거나 버튼 클릭했을 때 이벤트 효과
randomBtn.addEventListener("click", function () {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
  function getRandomColor() {
    // 16진수 색상 코드를 생성합니다.
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  showPerson();
});

// 초기화 버튼 클릭했을 때 이벤트 효과
resetBtn.addEventListener("click", function () {
  document.body.style.background = "hsl(210, 36%, 96%)";
  currentItem = 0;
  showPerson();
});

// getRandomNumber() 함수 정의
function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
