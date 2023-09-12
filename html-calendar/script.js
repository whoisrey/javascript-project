function calendar(newYear, newMonth) {
  const time = new Date(newYear, newMonth - 1, 1);
  const timeLength = new Date(newYear, newMonth, 0).getDate();

  let year = time.getFullYear(),
    month = time.getMonth(),
    date = time.getDate(),
    day = time.getDay();

  const captionYear = document.querySelector(".year"),
    captionMonth = document.querySelector(".month"),
    timeEl = document.querySelector("time"),
    days = document.querySelectorAll("tr td");

  for (let i = 0; i < days.length; i++) {
    days[i].innerHTML = "&nbsp;";
  }

  for (let i = day; i < day + timeLength; i++) {
    days[i].textContent = date++;
  }

  captionYear.textContent = year;
  captionMonth.textContent = month + 1;
  timeEl.dateTime = `${year}-${month + 1}`;
}

const btns = document.querySelectorAll("button");
btns.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("prev")) {
      calendar(year, --month);
    } else {
      calendar(year, ++month);
    }
  });
});

let year = new Date().getFullYear(),
  month = new Date().getMonth() + 1;

calendar(year, month);
