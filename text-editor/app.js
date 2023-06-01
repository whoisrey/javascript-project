let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

let fontList = [
  "Arial",
  "BMJUA",
  "BMEULJIRO",
  "BMYEONSUNG",
  "BMKIRANGHAERANG",
  "BMHANNAPro",
];

const intializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL?");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = intializer();

// 이미지 삽입 버튼과 이미지 입력 필드, 이미지 삽입 영역을 가져옵니다.
const insertImageButton = document.getElementById("insertImage");
const imageInput = document.getElementById("image-input");

// 이미지 삽입 버튼 클릭 시 동작할 함수를 정의합니다.
insertImageButton.addEventListener("click", () => {
  // 이미지 입력 필드 클릭을 트리거합니다.
  imageInput.click();
});

// 이미지 입력 필드 값이 변경되었을 때 동작할 함수를 정의합니다.
imageInput.addEventListener("change", () => {
  // 선택한 이미지 파일을 가져옵니다.
  const file = imageInput.files[0];

  if (file) {
    // FileReader 객체를 사용하여 이미지 파일을 읽습니다.
    const reader = new FileReader();
    reader.onload = function (event) {
      // 이미지를 삽입할 img 요소를 생성하고, 읽어온 이미지 데이터를 설정합니다.
      const imageElement = document.createElement("img");
      imageElement.src = event.target.result;

      // 이미지를 이미지 삽입 영역에 추가합니다.
      writingArea.appendChild(imageElement);
    };

    // 이미지 파일을 읽습니다.
    reader.readAsDataURL(file);
  }
});
