const inpPicker = document.querySelectorAll(".inp-picker");
inpPicker.forEach((item) => {
  item.addEventListener("input", () => {
    const name = "--main-" + item.dataset.id;
    // const name = `--main-${item.dataset.id}`;
    const root = document.querySelector(":root");
    root.style.setProperty(name, item.value);
  });
});
