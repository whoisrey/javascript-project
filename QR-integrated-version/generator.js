const download = document.querySelector(".download");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

// default QR Url
const defaultUrl = "https://github.com/withLeche";
let text = defaultUrl,
  size = 300;

// QR Text
function handleQRText(e) {
  const value = e.target.value;
  text = value || defaultUrl;
  generateQRCode();
}

// QR Size
function handleSize(e) {
  size = e.target.value;
  generateQRCode();
}

// QR Code
async function generateQRCode() {
  qrContainer.innerHTML = "";
  console.log(defaultUrl);
  new QRCode("qr-code", {
    text,
    height: size,
    width: size,
  });
  download.href = await resolveDataUrl();
}

// QR Code Share
async function handleShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRCode.png", {
        type: blob.type,
      });
      if (navigator.share) {
        // navigator.share API를 지원하는 경우
        await navigator.share({
          files: [file],
          title: text,
        });
      } else {
        // navigator.share API를 지원하지 않는 경우
        // 복사 및 붙여넣기 기능을 제공할 수 있습니다.
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

// QR Code Image -> Data URL
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
