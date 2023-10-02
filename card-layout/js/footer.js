const followerContainer = document.querySelector(".card-follower");
const followerButton = document.getElementById("followers");

// function soldout() {
//   if (followerButton.textContent.trim() === "SOLDOUT") {
//     followerButton.style.cursor = "none";
//     followerButton.style.border = "25px";
//   }
// }

// followerButton.addEventListener("click", soldout);

function isSoldOut() {
  // followers의 태그 내용을 가져옵니다.
  const followersContent = document
    .getElementById("followers")
    .textContent.trim();

  // 만약 followers의 태그 내용이 "SOLDOUT"이면 true를 반환하고, 그렇지 않으면 false를 반환합니다.
  return followersContent === "SOLDOUT";
}

function soldout() {
  if (isSoldOut()) {
    // 만약 followers의 태그 내용이 "SOLDOUT"이면 버튼 클릭을 무시합니다.
    followerButton.style.cursor = "none";
  } else {
    // 그렇지 않으면 버튼 클릭을 처리합니다.
    console.log("Button clicked.");
    // 이 부분에 버튼 클릭 시 수행할 작업을 추가할 수 있습니다.
  }
}

// 버튼에 클릭 이벤트 리스너를 추가합니다.
followerButton.addEventListener("click", soldout);
