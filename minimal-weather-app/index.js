const apiKey = "9c8d9d56472277a890db0748579c08fa";
const locButton = document.querySelector(".loc-button");
const leftInfo = document.querySelector(".left-info");
const todayInfo = document.querySelector(".today-info");
const todayWeatherIcon = document.querySelector(".today-weather i");
const todayTemp = document.querySelector(".weather-temp");
const daysList = document.querySelector(".days-list");
const weatherIconMap = {
  "01d": "sun",
  "01n": "moon",
  "02d": "sun",
  "02n": "moon",
  "03d": "cloud",
  "03n": "cloud",
  "04d": "cloud",
  "04n": "cloud",
  "09d": "cloud-rain",
  "09n": "cloud-rain",
  "10d": "cloud-rain",
  "10n": "cloud-rain",
  "11d": "cloud-lightning",
  "11n": "cloud-lightning",
  "13d": "cloud-snow",
  "13n": "cloud-snow",
  "50d": "water",
  "50n": "water",
};
const back = document.querySelector(".back");

function fetchWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  // Weather Data From API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const todayWeather = data.list[0].weather[0].description;
      const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`;
      const temperatureValue = parseInt(data.list[0].main.temp);
      const todayWeatherIconCode = data.list[0].weather[0].icon;

      // Background Image Changed By Weather
      if (temperatureValue >= 30) {
        leftInfo.style.backgroundImage = 'url("./images/fire.jpg")';
        back.style.backgroundImage = 'url("./images/hot.jpeg")';
        back.style.alignItems = "start";
        back.innerHTML = `
        <strong>시원한 나라로 이민 가자</strong>
        `;
      } else if (temperatureValue < 0) {
        leftInfo.style.backgroundImage = 'url("./images/ice.jpg")';
        back.style.backgroundImage = 'url("./images/cold.gif")';
        back.style.alignItems = "start";
        back.innerHTML = `
        <strong>따뜻한 나라로 이민 가자</strong>
        `;
      } else if (["01d", "02d"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/morning.jpg")';
        back.style.backgroundImage = 'url("./images/walk.gif")';
        back.style.alignItems = "start";
        back.innerHTML = `
        <strong>산책 갈까?</strong>
        `;
      } else if (["01n", "02n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/night.jpg")';
        back.style.backgroundImage = 'url("./images/sleep.jpeg")';
        back.innerHTML = `
        <strong>자러 갈까?</strong>
        `;
      } else if (["03d", "04n", "04d", "04n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/cloud.jpg")';
        back.style.backgroundImage = 'url("./images/cloudy.jpeg")';
        back.style.alignItems = "end";
        back.innerHTML = `
        <strong>구름 낀 하늘은~</strong>
        `;
      } else if (["09d", "09n", "10d", "10n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/rain.jpg")';
        back.style.backgroundImage = 'url("./images/rainy.jpeg")';
        back.style.alignItems = "start";
        back.innerHTML = `
        <strong>이래야만 해?</strong>
        `;
      } else if (["11d", "11n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/thunder.jpg")';
        back.style.backgroundImage = 'url("./images/scared.jpeg")';
        back.style.alignItems = "start";
        back.innerHTML = `
        <strong>무셔</strong>
        `;
      } else if (["13d", "13n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/snow.jpg")';
        back.style.backgroundImage = 'url("./images/scared.jpeg")';
        back.style.alignItems = "start";
        back.style.color = "black";
        back.innerHTML = `
        <strong>나가 놀아야만 해~</strong>
        `;
      } else {
        leftInfo.style.backgroundImage = 'url("./images/default.jpg")';
        back.innerHTML = `
        <div class="pic-gradient"></div>
        <strong>Are You Okay?</strong>
        `;
      }

      todayInfo.querySelector("h2").textContent = new Date().toLocaleDateString(
        "en",
        { weekday: "long" }
      );
      todayInfo.querySelector("span").textContent =
        new Date().toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconCode]}`;
      todayTemp.textContent = todayTemperature;

      // left-info
      const locationElement = document.querySelector(
        ".today-info > div > span"
      );
      locationElement.textContent = `${data.city.name}, ${data.city.country}`;
      const weatherDescriptionElement = document.querySelector(
        ".today-weather > h3"
      );
      weatherDescriptionElement.textContent = todayWeather;

      // day-info
      const todayPrecipitation = `${data.list[0].pop}%`;
      const todayHumidity = `${data.list[0].main.humidity}%`;
      const todayWindSpeed = `${data.list[0].wind.speed} km/h`;
      const dayInfoContainer = document.querySelector(".day-info");
      dayInfoContainer.innerHTML = `
            <div>
                <span class="title">PRECIPITATION</span>
                <span class="value">${todayPrecipitation}</span>
            </div>
            <div>
                <span class="title">HUMIDITY</span>
                <span class="value">${todayHumidity}</span>
            </div>
            <div>
                <span class="title">WIND SPEED</span>
                <span class="value">${todayWindSpeed}</span>
            </div>
        `;

      // After 4 Days
      const today = new Date();
      const nextDaysData = data.list.slice(1);
      const uniqueDays = new Set();
      let count = 0;
      daysList.innerHTML = "";
      for (const dayData of nextDaysData) {
        const forecastDate = new Date(dayData.dt_txt);
        const dayAbbreviation = forecastDate.toLocaleDateString("en", {
          weekday: "short",
        });
        const dayTemp = `${Math.round(dayData.main.temp)}°C`;
        const iconCode = dayData.weather[0].icon;
        if (
          !uniqueDays.has(dayAbbreviation) &&
          forecastDate.getDate() !== today.getDate()
        ) {
          uniqueDays.add(dayAbbreviation);
          daysList.innerHTML += `
                    <li>
                        <i class='bx bx-${weatherIconMap[iconCode]}'></i>
                        <span>${dayAbbreviation}</span>
                        <span class="day-temp">${dayTemp}</span>
                    </li>

                `;
          count++;
        }

        if (count === 4) break;
      }
    })
    .catch((error) => {
      alert(`Error fetching weather data: ${error} (Api Error)`);
    });
}

// Default Location (Seoul)
document.addEventListener("DOMContentLoaded", () => {
  const defaultLocation = "Seoul";
  fetchWeatherData(defaultLocation);
});

// Modal
const modal = document.getElementById("modal-container");
const modalSubmitButton = document.getElementById("modal-submit");
const modalCloseButton = document.getElementsByClassName("close")[0];

// Search Button
locButton.addEventListener("click", () => {
  modal.style.display = "block";
  modal.style.animation = "fadeIn 0.5s ease forwards";
});

// Close Button
modalCloseButton.addEventListener("click", () => {
  modal.style.display = "none";
  modal.style.animation = "none";

  setTimeout(() => {
    modal.style.display = "none";
    modal.style.animation = "none";
  }, 500);
});

// Submit Button
modalSubmitButton.addEventListener("click", () => {
  const locationInput = document.getElementById("location");
  const location = locationInput.value;
  if (!location) return;

  fetchWeatherData(location);
  modal.style.display = "none";
  locationInput.value = "";
});

// rotate
const flipper = document.querySelector(".flipper");
flipper.addEventListener("click", () => {
  flipper.style.transform =
    flipper.style.transform === "rotateY(0deg)"
      ? "rotateY(180deg)"
      : "rotateY(0deg)";
});
