let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];
render();

const memoText = document.querySelector("textarea");
const titleText = document.getElementById("title");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");

if (localStorage.getItem("memo")) {
  memoText.value = localStorage.getItem("memo");
}

saveBtn.addEventListener("click", () => {
  localStorage.setItem("memo", memoText.value);
  alert("Your text has been successfully saved!");
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("memo");
  titleText.value = "";
  memoText.value = "";
  alert("Your texts have been removed.");
});

function saveNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  allMemo.push({ title, content, len: allMemo.length });

  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}

function render() {
  const display = document.getElementById("display");
  display.innerHTML = "";

  for (const item of allMemo) {
    const saveTitle = document.createElement("h2");
    const saveContent = document.createElement("p");
    const saveId = document.createElement("p");
    const deleteMemoBtn = document.createElement("button");

    saveTitle.textContent = item.title;
    saveContent.textContent = item.content;
    deleteMemoBtn.textContent = "Del";
    deleteMemoBtn.setAttribute("id", item.len);
    deleteMemoBtn.setAttribute("onclick", "remove()");
    deleteMemoBtn.style.background = "#53535f";
    deleteMemoBtn.style.color = "white";
    deleteMemoBtn.style.width = "60px";
    deleteMemoBtn.style.padding = "5px";

    display.style.width = "200px";
    display.style.padding = "20px";
    display.style.boxShadow = "5px 5px 7px rgba(33, 33, 33, .7)";
    display.style.color = "#000";
    display.style.background = "#ffc";
    display.style.display = "inline-block";
    display.style.transform = "rotate(-3deg)";
    display.style.transition = "transform .15s linear";
    display.style.wordBreak = "break-all";

    display.appendChild(saveId);
    display.appendChild(saveTitle);
    display.appendChild(saveContent);
    display.appendChild(deleteMemoBtn);
  }
}

function remove() {
  const idx = allMemo.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
    );
  }
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}
