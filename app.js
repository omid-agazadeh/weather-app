const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "8d73f099f44b7630548bf824a6581762";
const searchInput = document.querySelector("input");
const button = document.querySelector("button");
const weatherContianer = document.getElementById("weatherContianer");
let data = [];
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
const locationHandler=()=>{
    console.log(navigator)
}
//
const enterHandler = (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
};
button.addEventListener("click", searchHandler);
window.addEventListener("keydown", enterHandler);
