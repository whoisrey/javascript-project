const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const writingArea = document.getElementById("text-input");
const linkButton = document.getElementById("createLink");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");

const fontList = [
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
    const option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    const option = document.createElement("option");
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
    userLink = `http://${userLink}`;
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

const insertImageButton = document.getElementById("insertImage");
const imageInput = document.getElementById("image-input");

insertImageButton.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageElement = document.createElement("img");
      imageElement.src = event.target.result;
      writingArea.appendChild(imageElement);
    };

    reader.readAsDataURL(file);
  }
});

const updateCharacterCount = () => {
  const text = writingArea.innerText;
  const characterCount = text.trim().length;
  const characterCountElement = document.getElementById("character-count");
  characterCountElement.textContent = characterCount;
};

writingArea.addEventListener("input", updateCharacterCount);

window.onload = () => {
  updateCharacterCount();
  intializer();
};
