const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "8d73f099f44b7630548bf824a6581762";
const searchInput = document.querySelector("input");
const button = document.querySelector("button");
const locationSvg = document.querySelector("Svg");

const weatherContianer = document.getElementById("weatherContianer");
const weatherPerDayContianer = document.getElementById("weatherPerDays");
const DAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let data = [];
let dataPerDay = [];

const searchHandler = async () => {
  const searchValue = searchInput.value;

  const url = `${BASE_URL}weather?q=${searchValue}&appid=${API_KEY}&units=metric`;
  try {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => (data = json));
    renderCurrentWeather();
  } catch (error) {
    const miaoooo = `<h1 class="text-2xl text-red-500">City not found </h1>`;

    weatherContianer.innerHTML = miaoooo;
  }
  getWeatherByeDays();
};

const locationHandler = async (latitude, longitude) => {
  const url = `${BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  try {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => (data = json));
    renderCurrentWeather();
  } catch (error) {
    const miaoooo = `<h1 class="text-2xl text-red-500">City not found </h1>`;

    weatherContianer.innerHTML = miaoooo;
  }
  getWeatherByeDays2(data.name)
  
};
const getWeatherByeDays2 = async (a) => {

  const url = `${BASE_URL}forecast?q=${a}&appid=${API_KEY}&units=metric`;
  try {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => (dataPerDay = json));
    renderCurrentWeather();
  } catch (error) {
    const miaoooo = `<h1 class="text-2xl text-red-500">City not found </h1>`;

    weatherContianer.innerHTML = miaoooo;
  }
  weatherDate(dataPerDay);
};
const getWeatherByeDays = async () => {
  const cityName = searchInput.value;
  const url = `${BASE_URL}forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
  try {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => (dataPerDay = json));
    renderCurrentWeather();
  } catch (error) {
    const miaoooo = `<h1 class="text-2xl text-red-500">City not found </h1>`;

    weatherContianer.innerHTML = miaoooo;
  }
  weatherDate(dataPerDay);
};
const weatherDate = (date) => {
  const res = date.list.filter((res) => {
    const mozinao = res.dt_txt.includes("12:00:00");
    if (mozinao) {
      return mozinao;
    }
  });
  console.log(res);

  const dataLL = res.map(
    (data) =>
      `
      <div class="bg-white shadow-2xl rounded-2xl p-8 flex flex-col justify-around  items-center" >
        <img class="w-20 h-20" src="https://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png">
        <span class="text-2xl text-abi" > ${
          DAY[new Date(data.dt * 1000).getDay()]
        } </span>
        <p class="text-lg font-bold">${Math.round(data.main.temp)} °C</p>
        <span class="text-lg text-skyabi" >${data.weather[0].main}</span>
      </div>
      `
  );
  weatherPerDayContianer.innerHTML = dataLL;
};

const renderCurrentWeather = () => {
  weatherContianer.classList.add("flex");
  weatherContianer.classList.remove("hidden");

  const weatherJSX = `
    <h1 class="text-abi text-5xl font-bold ">${data.name}, ${
    data.sys.country
  }</h1>
    <div id="main" class="flex gap-x-4 items-center ">
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <span class="text-lg" >${data.weather[0].main}</span>
        <p class="text-lg font-bold">${Math.round(data.main.temp)} °C</p>
    </div>
    <div id="info" class="flex items-center gap-x-12">
        <p class="text-lg font-semibold">Humidity: <span class="text-blue-700 " > ${
          data.main.humidity
        } % </span></p>
        <p class="text-lg font-semibold">Wind Speed: <span class="text-blue-700 " > ${
          data.wind.speed
        } m/s</span></p>
    </div>
`;
  weatherContianer.innerHTML = weatherJSX;
};
const latto = (moz) => {
  const { latitude, longitude } = moz.coords;
  locationHandler(latitude, longitude);
};

const errorLatto = (erorr) => {
  weatherContianer.classList.add("flex");
  weatherContianer.classList.remove("hidden");

  const locationError = `<h1 class="text-3xl text-red-500"> Turn on location on your device </h1>`;
  weatherContianer.innerHTML = locationError;
  console.log(erorr);
};

const locationState = () => {
  navigator.geolocation.getCurrentPosition(latto, errorLatto);
};
//
const enterHandler = (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
};
locationSvg.addEventListener("click", locationState);
button.addEventListener("click", searchHandler);
window.addEventListener("keydown", enterHandler);
