const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
// generator.js의 input값과 겹침
const fileInp = document.querySelector(".fileInp");
// const fileInp = document.querySelector("input");
const infoText = document.querySelector("p");
const closeBtn = document.querySelector(".close");
const copyBtn = document.querySelector(".copy");

// HTTPS를 지원하는 QR 코드 리더 API를 사용하는 예시
const qrCodeApiUrl = "https://api.qrserver.com/v1/read-qr-code/";
// 브라우저는 보안상의 이유로 "혼합 콘텐츠"를 차단하며, HTTPS에서도 HTTPS리소스만 허용합니다.

// To fetch file, formData
function fetchRequest(file, formData) {
  infoText.innerText = "Scanning QR Code...";
  fetch(qrCodeApiUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "Upload QR Code To Scan"
        : "Couldn't Scan QR Code";
      if (!result) return;
      document.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't Scan QR Code...";
    });
}

// Upload files
fileInp.addEventListener("change", async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData);
});

// Drag File
form.addEventListener("dragover", (e) => {
  e.preventDefault();
  document.body.classList.add("active");
});

form.addEventListener("dragleave", () => {
  document.body.classList.remove("active");
});

form.addEventListener("drop", (e) => {
  e.preventDefault();
  document.body.classList.remove("active");

  const file = e.dataTransfer.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData);
});

// Form-elements Click
form.addEventListener("click", () => fileInp.click());

// Close Button
closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  wrapper.classList.remove("active");
  fileInp.value = "";
});

// Copy Button
copyBtn.addEventListener("click", () => {
  copyText(text);
});

// To copy textarea to Clipboard
function copyText(text) {
  const textarea = document.createElement("textarea");
  console.log(text);
  textarea.value = text;
  textarea.style.position = "fixed"; // 화면에서 감춤
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    alert("텍스트가 클립보드에 복사되었습니다.");
  } catch (error) {
    console.error("복사 오류:", error);
    alert("텍스트 복사에 실패했습니다.");
  }

  document.body.removeChild(textarea);
}
