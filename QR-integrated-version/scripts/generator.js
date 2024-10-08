const download = document.querySelector(".download");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");

qrText.addEventListener("input", handleQRText);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://github.com/withLeche";
let text = defaultUrl,
  size = 200;

function handleQRText(e) {
  const value = e.target.value;
  text = value || defaultUrl;
  generateQRCode();
}

async function generateQRCode() {
  qrContainer.innerHTML = "";
  console.log(defaultUrl);
  new QRCode("qr-code", {
    text,
  });
  download.href = await resolveDataUrl();
}

async function handleShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRCode.png", {
        type: blob.type,
      });
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: text,
        });
      } else {
        const dataUrl = await resolveDataUrl();
        copyToClipboard(dataUrl); // 복사 함수 호출
        alert("QR 코드 이미지가 복사되었습니다.");
      }
    } catch (error) {
      console.error("공유 기능 오류:", error);
      alert("브라우저에서 공유 기능을 지원하지 않습니다.");
    }
  }, 100);
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
