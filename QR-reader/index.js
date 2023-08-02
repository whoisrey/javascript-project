const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInp = document.querySelector("input");
const infoText = document.querySelector("p");
const closeBtn = document.querySelector(".close");
const copyBtn = document.querySelector(".copy");

// API로 부터 Data를 fetch받는 함수
function fetchRequest(file, formData) {
  infoText.innerText = "Scanning QR Code...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
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

// 업로드한 QR Code File을 API에 Request 요청을 진행하는 이벤트
fileInp.addEventListener("change", async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData);
});

// 클립보드에 텍스트를 복사
copyBtn.addEventListener("click", () => {
  let text = document.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

// form 요소를 클릭하면 파일이 업로드를 실행하는 이벤트
form.addEventListener("click", () => fileInp.click());

// 이미지를 드래그해서 업로드하는 기능 추가
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

// closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));

// closeBtn.addEventListener("click", (e) => {
//   e.stopPropagation();
//   wrapper.classList.remove("active");
// });

// close 버튼을 누르고 다시 업로드할 수 있는 기능을 구현?
closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  wrapper.classList.remove("active");
  fileInp.value = "";
});
