const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

// image
// const imageUpload = document.getElementById("image-upload");

// logo
// const logoUpload = document.getElementById("logo-upload");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

// image
// imageUpload.addEventListener("change", handleImageUpload);

// logo
// logoUpload.addEventListener("change", handleLogoUpload);

const defaultUrl = "https://youtube.com/@AsmrProg";
let colorLight = "#fff",
  colorDark = "#000",
  text = defaultUrl,
  size = 300;

// Dark 값 받아오는 함수
function handleDarkColor(e) {
  colorDark = e.target.value;
  generateQRCode();
}

// Light 값 받는 함수
function handleLightColor(e) {
  colorLight = e.target.value;
  generateQRCode();
}

// QR Text 받는 함수
function handleQRText(e) {
  const value = e.target.value;
  text = value;
  if (!value) {
    text = defaultUrl;
  }
  generateQRCode();
}

// image 받는 함수
// async function handleImageUpload(e) {
//   const file = e.target.files[0];
//   console.log(file);
//   if (file) {
//     try {
//       const dataUrl = await readFileAsDataURL(file);
//       generateQRCode(dataUrl);
//     } catch (error) {
//       console.error("Error reading the file:", error);
//     }
//   }
// }

// 업로드한 파일 받는 함수
// function readFileAsDataURL(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     console.log(reader);
//     reader.onload = (e) => resolve(e.target.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

// logo
// async function handleLogoUpload(e) {
//   const file = e.target.files[0];
//   console.log(file);
//   if (file) {
//     try {
//       const logoDataURL = await readFileAsDataURL(file);
//       generateQRCode(null, logoDataURL);
//     } catch (error) {
//       console.error("Error reading the logo file:", error);
//     }
//   }
// }

// image logo
// function readFileAsDataURL(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     console.log(reader);
//     reader.onload = (e) => resolve(e.target.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

// QR 코드 만들어주는 함수
async function generateQRCode(imageDataURL, logoDataURL) {
  qrContainer.innerHTML = "";
  console.log(logoDataURL);
  new QRCode("qr-code", {
    text,
    height: size,
    width: size,
    colorLight,
    colorDark,
    logo: logoDataURL,
  });
  download.href = await resolveDataUrl();
}

// 공유하는 함수
async function handleShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRCode.png", {
        type: blob.type,
      });
      await navigator.share({
        files: [file],
        title: text,
      });
    } catch (error) {
      alert("Your browser doesn't support sharing.");
    }
  }, 100);
}

// 사이즈 조절해주는 함수
function handleSize(e) {
  size = e.target.value;
  generateQRCode();
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector("#qr-code img");
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }
      const canvas = document.querySelector("canvas");
      resolve(canvas.toDataURL());
    }, 50);
  });
}
generateQRCode();
