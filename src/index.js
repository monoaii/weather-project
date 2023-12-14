//update weather data in realtime
function updateWeatherData(response) {
  let iconElement = document.querySelector("#current-weather-icon");
  let cityElement = document.querySelector("#current-city");
  let now = new Date(response.data.time * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentTime = document.querySelector(".current-time");
  let currentDate = now.getDate();
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentHour = (now.getHours() < 10 ? "0" : "") + now.getHours();
  let currentMinute = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let conditionDescriptionElement = document.querySelector(
    "#current-condition-des"
  );
  let feelsLike = document.querySelector("#feels-like-temp");

  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="current-weather-icon"/>`;

  cityElement.innerHTML = response.data.city;
  conditionDescriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = `${Math.round(temperature)}`;
  feelsLike.innerHTML = `Feels Like ${Math.round(
    response.data.temperature.feels_like
  )}`;

  currentTime.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} | ${currentHour}:${currentMinute}`;
}

//make api call and update temperature interface
function searchCity(city) {
  let apiKey = "7feob78d78cbdf431afd487b07c045tb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherData);
}

//change city to search city
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form-input");
  let changeCity = document.querySelector("#current-city");
  changeCity.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);

searchCity("Seattle");
