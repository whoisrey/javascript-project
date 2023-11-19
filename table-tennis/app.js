const p1Score = document.getElementById("leftScore");
const p2Score = document.getElementById("rightScore");
const p1Button = document.getElementById("leftBtn");
const p2Button = document.getElementById("rightBtn");
const resetButton = document.getElementById("resetBtn");
const matchPoint = document.getElementById("matchPoint");

let isGameOver = false;
let winningScore = 3;

matchPoint.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});

let p1Point = 0;
p1Button.addEventListener("click", () => {
  if (!isGameOver) {
    p1Point += 1;
    p1Score.textContent = `${p1Point}`;
    if (p1Point === winningScore) {
      isGameOver = true;
      p1Score.classList.add("winner");
      p2Score.classList.add("loser");
      p1Button.textContent = "Win";
      p2Button.textContent = "Lose";
      p1Button.disabled = true;
      p2Button.disabled = true;
    }
  }
});

let p2Point = 0;
p2Button.addEventListener("click", () => {
  if (!isGameOver) {
    p2Point += 1;
    p2Score.textContent = `${p2Point}`;
    if (p2Point === winningScore) {
      isGameOver = true;
      p1Score.classList.add("loser");
      p2Score.classList.add("winner");
      p1Button.textContent = "Lose";
      p2Button.textContent = "Win";
      p1Button.disabled = true;
      p2Button.disabled = true;
    }
  }
});

const reset = () => {
  isGameOver = false;
  p1Point = 0;
  p2Point = 0;
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  p1Score.classList.remove("winner", "loser");
  p2Score.classList.remove("winner", "loser");
  p1Button.textContent = "player 1";
  p2Button.textContent = "player 2";
  p1Button.disabled = false;
  p2Button.disabled = false;
};

resetButton.addEventListener("click", reset);
