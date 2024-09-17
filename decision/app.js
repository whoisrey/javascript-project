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

form.addEventListener("submit", function (e) {
  e.preventDefault();

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

function getRandomImages(count) {
  const randomImages = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * images.length);
    randomImages.push(images[randomIndex]);
  }
  return randomImages;
}
