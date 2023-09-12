// 초기값 설정
let count = 0;

// 작동하는 모든 요소의 변수 선언
const value = document.querySelector("#value");
const title = document.querySelector(".title");
const btns = document.querySelectorAll(".btn");
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[getRandomNumber()];
    }

    const styles = e.currentTarget.classList;
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
      alert("리셋 어쩌구 저쩌구");
    }
    if (count > 0) {
      value.style.color = "white";
      title.style.color = "white";
      document.body.style.backgroundColor = hexColor;
    }
    if (count < 0) {
      value.style.color = "white";
      title.style.color = "white";
      document.body.style.backgroundColor = hexColor;
    }
    if (count === 0) {
      value.style.color = "black";
      title.style.color = "black";
      document.body.style = "none";
    }

    value.textContent = count;
    function getRandomNumber() {
      return Math.floor(Math.random() * hex.length);
    }
  });
});
