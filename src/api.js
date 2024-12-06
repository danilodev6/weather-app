const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiKey = "ea95f6c276f3eef6e5f79955e634d409";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("button");
const app = document.getElementById("app");
const imgWeather = document.getElementById("imgWeather");
const errorName = document.getElementById("errorName");
let dayLight;

const getWeather = async (city) => {
  const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    let sunriseTime = new Date(data.sys.sunrise * 1000);
    let sunsetTime = new Date(data.sys.sunset * 1000);
    let currentTime = new Date();

    const getDayLight = (sunriseTime, sunsetTime) => {
      if (currentTime > sunriseTime && currentTime < sunsetTime) {
        return (dayLight = true);
      } else {
        return (dayLight = false);
      }
    };

    document.getElementById("degrees").innerHTML =
      Math.round(data.main.temp) + " °c";
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("humidity").innerHTML = data.main.humidity + " %";
    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";
    document.getElementById("min").innerHTML =
      "min " + Math.round(data.main.temp_min) + " °c";
    document.getElementById("max").innerHTML =
      "max " + Math.round(data.main.temp_max) + " °c";

    getDayLight(sunriseTime, sunsetTime);

    errorName.style.display = "none";
    if (data.weather[0].main == "Clear" && dayLight == true) {
      app.style.backgroundImage = 'url("../img/sunny.png")';
      imgWeather.src = "../img/clear.png";
    } else if (data.weather[0].main == "Clear" && dayLight == false) {
      app.style.backgroundImage = 'url("../img/rainy.png")';
      imgWeather.src = "../img/night.png";
    } else if (data.weather[0].main == "Clouds") {
      app.style.backgroundImage = 'url("../img/rainy.png")';
      imgWeather.src = "../img/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      app.style.backgroundImage = 'url("../img/rainy.png")';
      imgWeather.src = "../img/rain.png";
    } else if (data.weather[0].main == "Snow") {
      app.style.backgroundImage = 'url("../img/snowy.png")';
      imgWeather.src = "../img/snow.png";
    } else if (data.weather[0].main == "Storm") {
      app.style.backgroundImage = 'url("../img/rainy.png")';
      imgWeather.src = "../img/storm.png";
    } else {
      app.style.backgroundImage = 'url("../img/sunny.png")';
      imgWeather.src = "../img/clear.png";
    }
  } else {
    errorName.style.display = "block";
  }
};

searchButton.addEventListener("click", () => {
  getWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getWeather(searchInput.value);
  }
});
