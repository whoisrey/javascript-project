const image = document.getElementById("cover");
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const playerProgress = document.getElementById("player-progress");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "./assets/1.mp3",
    displayName: "The Charmer's Call",
    cover: "./assets/1.jpeg",
    artist: "Hanu Dixit",
  },
  {
    path: "./assets/2.mp3",
    displayName: "You Will Never See Me Coming",
    cover: "./assets/2.jpeg",
    artist: "NEFFEX",
  },
  {
    path: "./assets/3.mp3",
    displayName: "Intellect",
    cover: "./assets/3.jpeg",
    artist: "Yung Logos",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);

const repeatBtn = document.getElementById("repeat");

function toggleRepeat() {
  if (music.loop) {
    music.loop = false;
    repeatBtn.classList.remove("active");
    repeatBtn.setAttribute("title", "Repeat");
  } else {
    music.loop = true;
    repeatBtn.classList.add("active");
    repeatBtn.setAttribute("title", "No repeat");
  }
}

repeatBtn.addEventListener("click", toggleRepeat);

const shuffleBtn = document.getElementById("shuffle");
let shuffleMode = false;

function toggleShuffle() {
  shuffleMode = !shuffleMode;
  if (shuffleMode) {
    shuffleBtn.classList.add("active");
    shuffleBtn.setAttribute("title", "No shuffle");
  } else {
    shuffleBtn.classList.remove("active");
    shuffleBtn.setAttribute("title", "Shuffle");
  }
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();

  if (shuffleMode) {
    musicIndex = Math.floor(Math.random() * songs.length);
    loadMusic(songs[musicIndex]);
    playMusic();
  }
}

shuffleBtn.addEventListener("click", toggleShuffle);
