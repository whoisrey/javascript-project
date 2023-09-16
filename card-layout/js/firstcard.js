const modal = document.querySelector(".modal");
const firstSection = document.querySelector(".first-section");
const firstCard = document.querySelector(".first-card");

firstCard.addEventListener("click", function () {
  modal.style.display = "block";
});

// 모달 외부를 클릭하면 배경색 원래 상태로 변경
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    // firstSection.style.background = "seashell";
    modal.style.display = "none";
  }
});
