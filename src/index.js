// change to current date and time
let now = new Date();

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

currentTime.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} | ${currentHour}:${currentMinute}`;

//change temperature to realtime
function showCurrentTemp(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let h2 = document.querySelector("#current-temperature");
  h2.innerHTML = `${currentTemperature}&deg;F`;
}

//change Feels like temperature to realtime
function showFeelsLikeTemp(response) {
  let feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  let feelsLike = document.querySelector("#feels-like-temp");
  feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}&deg;F`;
}

//change weather condition description to realtime
function showConditiondes(response) {
  let conditionDescription = response.data.condition.description;
  let conditionDes = document.querySelector("#current-condition-des");
  conditionDes.innerHTML = `${conditionDescription}`;
}

//change city to search city
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".form-control");
  let changeCity = document.querySelector("#current-city");
  let city = cityInput.value;

  let apiKey = "7feob78d78cbdf431afd487b07c045tb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  changeCity.innerHTML = `${city}`;

  axios.get(apiUrl).then(showCurrentTemp);
  axios.get(apiUrl).then(showFeelsLikeTemp);
  axios.get(apiUrl).then(showConditiondes);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);
