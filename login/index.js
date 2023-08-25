const loginForm = document.querySelector("form");
const loginInput = document.querySelectorAll("input");
const loginButton = document.querySelector("button");

function loginBtnClick() {
  console.log(loginInput.value);
}
loginButton.addEventListener("click", loginBtnClick);
