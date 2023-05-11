// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.

const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");
const videoFiles = ["snow.mp4", "lullaby.mp4", "dogchew.mp4", "licking.mp4"];
const source = document.querySelector(".video-source");

function getRandomVideo() {
  const randomIndex = Math.floor(Math.random() * videoFiles.length);
  return videoFiles[randomIndex];
}

function playRandomVideo() {
  const randomVideo = getRandomVideo();
  source.src = randomVideo;
  video.load();
  video.play();
}

btn.addEventListener("click", function () {
  if (!btn.classList.contains("slide")) {
    btn.classList.add("slide");
    video.pause();
  } else {
    btn.classList.remove("slide");
    video.play();
  }
});

// preloader
const preloader = document.querySelector(".preloader");

window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});

playRandomVideo();

video.addEventListener("ended", playRandomVideo);
