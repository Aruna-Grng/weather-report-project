function formateDate(timestamp) {
  let currentDate = new Date(timestamp);
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];

  return `${day} ${hour}:${minute}`;
}


let apiKey = "28a9b26783d5b53ed2f25d7dd7717889";

// STORES THE INPUT VALUE ENTERED IN THE SEARCH BAR.
function searchForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchInput");
  let city = cityInput.value;

  searchCity(city); // calls "search" the function.
}

// THIS FUNCTION ESP MADE FOR DEFAULT CITY INFO.
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

// *********** This funcitons for "Current" button ****************************************
function getPinHereLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGeoLocation);
}

function getGeoLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(geoApiUrl).then(displayWeatherInfo);
}

// ******************************************************************************************


// DISPLAY CITY NAME AND WEATHER INFO OF THE SPECIFIC CITY
function displayWeatherInfo(response) {
  console.log(response);
  let displayCity = document.querySelector(".city");
  displayCity.innerHTML = response.data.name;

  // weather-icon
  let icons = response.data.weather[0].icon;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.innerHTML = `<img src="icons/${icons}.png" />`;

  // date and time
  document.querySelector(".time").innerHTML = formateDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = temperature;

  // weather condition
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].description;

  // short cut for humidity and others in the column.
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function changeToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");      // ADDING "ACTIVE" CLASS IN FAHRENHEIT LINK
  celsiusLink.classList.remove("active");      // REMOVING "ACTIVE" CLASS IN CELSIUS LINK
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");     // REMOVING "ACTIVE" CLASS IN FAHRENHEIT LINK
  celsiusLink.classList.add("active");         //  ADDING "ACTIVE" CLASS IN CELSIUS LINK
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
   
}

let celsiusTemperature = null;

let searchRow = document.querySelector("#search-form");
searchRow.addEventListener("submit", searchForm);

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", getPinHereLocation);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

searchCity("Siddharthanagar"); // this is for search on load.
