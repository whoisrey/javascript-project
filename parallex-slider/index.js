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
};

// Function to set background position for slides
function setBgPosition(slide, index) {
  const x = -(slide.target + flkty.x) / 3;
  slides[index].style.backgroundPosition = `${x}px`;
}

// Slides initialization
const carousel = document.querySelector("[carousel]");
const slides = Array.from(document.getElementsByClassName("carousel-cell"));
const flkty = new Flickity(carousel, options);

// Event listener using bg position
flkty.on("scroll", () => {
  flkty.slides.forEach(setBgPosition);
});

// Flickity autoplay control
var playButton = document.querySelector(".play-button");
playButton.addEventListener("click", function () {
  flkty.playPlayer();
});

var stopButton = document.querySelector(".stop-button");
stopButton.addEventListener("click", function () {
  flkty.stopPlayer();
});

// select cell
var buttonGroup = document.querySelector(".button-group");
var buttons = buttonGroup.querySelectorAll(".button");
buttons = fizzyUIUtils.makeArray(buttons);

buttonGroup.addEventListener("click", function (event) {
  // filter for button clicks
  if (!matchesSelector(event.target, ".button")) {
    return;
  }
  var index = buttons.indexOf(event.target);
  flkty.selectCell(index);
});
