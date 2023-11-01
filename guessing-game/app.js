let maximum = parseInt(prompt("최댓값을 입력하시오."));
while (!maximum) {
  maximum = parseInt(prompt("유효한 숫자를 입력하시오."));
}

const targetNum = Math.floor(Math.random() * maximum) + 1;
console.log(targetNum);

let guess = prompt(
  "정답을 추측하여 입력하시오. 'q'를 입력하면 포기할 수 있습니다."
);
let attempts = 1;

while (parseInt(guess) !== targetNum) {
  if (guess.toLowerCase() === "q") break;
  guess = parseInt(guess);
  if (guess > targetNum) {
    guess = prompt("숫자가 커요");
    attempts++;
  } else if (guess < targetNum) {
    guess = prompt("숫자가 작아요");
    attempts++;
  } else {
    guess = prompt(
      "유효한 숫자를 입력하시오. 'q'를 입력하면 포기할 수 있습니다."
    );
  }
}
let giveUp = document.getElementById("giveUp");
let answer = document.getElementById("answer");

if (guess.toLowerCase() === "q") {
  giveUp.style.display = "block";
  console.log("안녕히 가세요.");
} else {
  answer.style.display = "block";
  console.log(`${attempts}번째 만에 정답입니다.`);
}
