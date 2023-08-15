const apiKey = "9c8d9d56472277a890db0748579c08fa";
const locButton = document.querySelector(".loc-button");
const leftInfo = document.querySelector(".left-info");
const todayInfo = document.querySelector(".today-info");
const todayWeatherIcon = document.querySelector(".today-weather i");
const todayTemp = document.querySelector(".weather-temp");
const daysList = document.querySelector(".days-list");

// 날씨 코드와 아이콘 이름 배정 (API)
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

function fetchWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  // 날씨 데이터 API로 가져오기
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // 오늘 날씨 정보
      const todayWeather = data.list[0].weather[0].description;
      const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`;
      const temperatureValue = parseInt(data.list[0].main.temp);
      const todayWeatherIconCode = data.list[0].weather[0].icon;

      // 아이콘 및 기온 에 따라 이미지 배경 지정
      if (temperatureValue >= 30) {
        leftInfo.style.backgroundImage = 'url("./images/fire.jpg")';
      } else if (temperatureValue < 0) {
        leftInfo.style.backgroundImage = 'url("./images/ice.jpg")';
      } else if (["01d", "02d"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/morning.jpg")';
      } else if (["01n", "02n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/night.jpg")';
      } else if (["03d", "04n", "04d", "04n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/cloud.jpg")';
      } else if (["09d", "09n", "10d", "10n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/rain.jpg")';
      } else if (["11d", "11n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/thunder.jpg")';
      } else if (["13d", "13n"].includes(todayWeatherIconCode)) {
        leftInfo.style.backgroundImage = 'url("./images/snow.jpg")';
      } else {
        leftInfo.style.backgroundImage = 'url("./images/default.jpg")';
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

      // left-info 정보
      const locationElement = document.querySelector(
        ".today-info > div > span"
      );
      locationElement.textContent = `${data.city.name}, ${data.city.country}`;

      const weatherDescriptionElement = document.querySelector(
        ".today-weather > h3"
      );
      weatherDescriptionElement.textContent = todayWeather;

      // day-info 정보
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

      // 4일 간 날씨 안내
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

        // Ensure the day isn't duplicate and today
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

        // 4일까지만 날씨가 나올 수 있게 멈춤
        if (count === 4) break;
      }
    })
    .catch((error) => {
      alert(`Error fetching weather data: ${error} (Api Error)`);
    });
}

// 기본 위치 설정 (서울)
document.addEventListener("DOMContentLoaded", () => {
  const defaultLocation = "Seoul";
  fetchWeatherData(defaultLocation);
});

// 모달 창 구현
const modal = document.getElementById("myModal");
const modalSubmitButton = document.getElementById("modal-submit");
const modalCloseButton = document.getElementsByClassName("close")[0];

// 위치 검색 버튼
locButton.addEventListener("click", () => {
  modal.style.display = "block";
  modal.style.animation = "fadeIn 0.5s ease forwards"; // fadeIn 애니메이션 적용
});

// 닫기 버튼
modalCloseButton.addEventListener("click", () => {
  modal.style.display = "none";
  modal.style.animation = "none"; // 애니메이션 초기화

  setTimeout(() => {
    modal.style.display = "none";
    modal.style.animation = "none"; // 애니메이션 초기화
  }, 500); // 애니메이션 지속 시간과 동일한 시간으로 설정
});

// 위치 제출 버튼
modalSubmitButton.addEventListener("click", () => {
  const locationInput = document.getElementById("location");
  const location = locationInput.value;
  if (!location) return;

  fetchWeatherData(location);
  modal.style.display = "none";
});
