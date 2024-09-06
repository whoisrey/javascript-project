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

const preloader = document.querySelector(".preloader");

window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});

playRandomVideo();

video.addEventListener("ended", playRandomVideo);
