const arrPic = [
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/jammanbo.png",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/mazayoung.png?raw=true",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/mobugi.png",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/nyaong.png",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/pulin.png",
  "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/weirdseed.png",
];
const center = document.querySelector(".list-item");

arrPic.forEach((item) => {
  const elLi = document.createElement("li");
  elLi.innerHTML = `<img src="${item}" alt="">`;
  center.appendChild(elLi);
});

const items = document.querySelectorAll(".list-item li");

const radius = (items[0].offsetWidth * items.length) / 3.14 / 2;

items.forEach((item, index) => {
  item.style.transform = `rotateY(${
    (360 / items.length) * index
  }deg) translateZ(${radius}px)`;
});

const angle = 360 / items.length;
let currAngle = 0;

document.addEventListener("click", function (event) {
  if (window.innerWidth / 2 < event.clientX) {
    currAngle += angle;
  } else {
    currAngle -= angle;
  }
  center.style.transform = `translate(-50%, -50%) rotateY(${currAngle}deg)`;
});
