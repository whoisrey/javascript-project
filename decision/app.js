const images = [
  `./img/a.jpeg`,
  `./img/b.jpeg`,
  `./img/d.jpeg`,
  `./img/e.jpeg`,
  `./img/f.jpeg`,
  `./img/g.jpeg`,
  `./img/h.jpeg`,
  `./img/i.jpeg`,
  `./img/j.jpeg`,
  `./img/k.jpeg`,
  `./img/l.jpeg`,
];

const form = document.querySelector(".img-form");
const amount = document.getElementById("amount");
const result = document.querySelector(".img-container");

// submit 이벤트리스너 등록
form.addEventListener("submit", function (e) {
  // 기본 동작 취소
  e.preventDefault();

  // 선택된 이미지들을 HTML 요소로 변환하여 src에 추가 (result 형태로)
  const value = parseInt(amount.value);
  let selectedImages = [];
  if (value >= 1 && value <= 3) {
    selectedImages = getRandomImages(value);
  } else {
    const randomIndex = Math.floor(Math.random() * images.length);
    selectedImages.push(images[randomIndex]);
  }
  result.innerHTML = selectedImages
    .map((image) => `<img src="${image}">`)
    .join("");
  imageContainer.style.marginBottom = "10px";
});

// 주어진 개수(1~3개)만큼 임의의 이미지를 선택하여 배열로 반환
function getRandomImages(count) {
  const randomImages = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * images.length);
    randomImages.push(images[randomIndex]);
  }
  return randomImages;
}
