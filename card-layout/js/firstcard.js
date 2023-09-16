const firstSection = document.querySelector(".first-section");
const firstCard = document.querySelector(".first-card");

firstCard.addEventListener("click", function () {
  firstSection.style.background = "rgba(0, 0, 0, 0.7)";
});

// 모달 외부를 클릭하면 배경색 원래 상태로 변경
window.addEventListener("click", function (event) {
  if (event.target === firstSection) {
    firstSection.style.background = "seashell";
  }
});
