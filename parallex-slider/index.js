const options = {
  accessibility: true,
  prevNextButtons: true,
  pageDots: true,
  setGallerySize: false,
  arrowShape: {
    x0: 1,
    x1: 58,
    y1: 62,
    x2: 55,
    y2: 48,
    x3: 18,
  },
  groupCells: true,
  autoPlay: 1000,
  fullscreen: true,
};

function setBgPosition(slide, index) {
  const x = -(slide.target + flkty.x) / 3;
  slides[index].style.backgroundPosition = `${x}px`;
}

const carousel = document.querySelector("[carousel]");
const slides = Array.from(document.getElementsByClassName("carousel-cell"));
const flkty = new Flickity(carousel, options);

flkty.on("scroll", () => {
  flkty.slides.forEach(setBgPosition);
});

const playButton = document.querySelector(".play-button");
playButton.addEventListener("click", function () {
  flkty.playPlayer();
});

const stopButton = document.querySelector(".stop-button");
stopButton.addEventListener("click", function () {
  flkty.stopPlayer();
});

const resizeButton = document.querySelector(".button--resize");
resizeButton.addEventListener("click", function () {
  carousel.classList.toggle("isexpanded");
  flkty.resize();
});

// Fullscreen
// var viewFullscreenButton = document.querySelector(".view-fullscreen-button");
// viewFullscreenButton.addEventListener("click", function () {
//   flkty.viewFullscreen();
// });

var viewFullscreenButton = document.querySelector(".view-fullscreen-button");
viewFullscreenButton.addEventListener("click", function () {
  if (carousel.requestFullscreen) {
    carousel.requestFullscreen();
  } else if (carousel.mozRequestFullScreen) {
    carousel.mozRequestFullScreen();
  } else if (carousel.webkitRequestFullscreen) {
    carousel.webkitRequestFullscreen();
  } else if (carousel.msRequestFullscreen) {
    carousel.msRequestFullscreen();
  }
});
