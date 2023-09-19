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

// 모달을 열 때 배경 스크롤을 막음
function disableBackgroundScroll() {
  document.body.style.overflow = "hidden";
}

// 모달을 닫을 때 배경 스크롤을 다시 활성화
function enableBackgroundScroll() {
  document.body.style.overflow = "auto";
}

// 모달 외부를 클릭하면 모달을 닫음
function closeModal() {
  modal.style.display = "none";
  firstCardFirst.style.display = "none";
  firstCardSecond.style.display = "none";
  firstCardThird.style.display = "none";
  enableBackgroundScroll(); // 배경 스크롤 다시 활성화
}

// 모달 외부 클릭 이벤트 처리 (터치 이벤트 포함)
function handleModalClick(event) {
  if (event.target === modal) {
    closeModal();
  }
}

modal.addEventListener("click", handleModalClick);
modal.addEventListener("touchstart", handleModalClick);
