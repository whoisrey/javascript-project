const modal = document.querySelector(".modal");
const firstSection = document.querySelector(".first-section");
const firstCard = document.querySelector(".first-card");
const secondCard = document.querySelector(".second");
const thirdCard = document.querySelector(".third");
const firstCardFirst = document.querySelector(".first-card-first");
const firstCardSecond = document.querySelector(".first-card-second");
const firstCardThird = document.querySelector(".first-card-third");

firstCard.addEventListener("click", function () {
  modal.style.display = "block";
  firstCardFirst.style.display = "block";
});

secondCard.addEventListener("click", function () {
  modal.style.display = "block";
  firstCardSecond.style.display = "block";
});

thirdCard.addEventListener("click", function () {
  modal.style.display = "block";
  firstCardThird.style.display = "block";
});

// 모달 외부를 클릭하면 배경색 원래 상태로 변경
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    firstCardFirst.style.display = "none";
    firstCardSecond.style.display = "none";
    firstCardThird.style.display = "none";
  }
});
