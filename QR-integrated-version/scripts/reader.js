const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInp = document.querySelector(".fileInp");
const infoText = document.querySelector("p");
const closeBtn = document.querySelector(".close");
const copyBtn = document.querySelector(".copy");
const textArea = document.querySelector("textarea");
const qrCodeApiUrl = "https://api.qrserver.com/v1/read-qr-code/";

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
  if (textArea) {
    const textToCopy = textArea.value;
    copyText(textToCopy);
  } else {
    console.error("Textarea not found.");
  }
});

// To copy text to Clipboard
function copyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
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
