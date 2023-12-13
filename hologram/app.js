// 2. 마우스 이벤트 (회전)
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
container.addEventListener("mousemove", function (e) {
  // 3. 마우스 좌표에 따른 회전 정도
  // 마우스 x좌표가 +200이면 rotateY(-20deg)
  // 마우스 x좌표가 +0이면 rotateY(20deg)
  let x = e.offsetX;
  let y = e.offsetY;
  let rotateX = (4 / 30) * y - 20;
  let rotateY = (-1 / 5) * x + 20;

  // 5. 배경화면의 이동
  overlay.style = `background-position: ${x / 5 + y / 5}%`;

  container.style = `transform : perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // 7. 마우스 뗄 떼 효과 제거
  container.addEventListener("mouseout", function () {
    overlay.style = `filter : opacity(0)`;
    container.style = `transform : perspective(350px) rotateY(0deg) rotateX(0deg)`;
  });
});
