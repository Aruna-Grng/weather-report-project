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


// // Feautre # 2
// function searchFunc(event) {
//   event.preventDefault();
//   let cityInput = document.querySelector("#searchInput");

//   let showCity = document.querySelector(".city");
//   // showCity.innerHTML = cityInput.value; 'instead of if statement, it can be written this way.

//   if (cityInput.value) {
//     showCity.innerHTML = `${cityInput.value}`;
//   }
// }

// let search = document.querySelector("#search-form");
// search.addEventListener("submit", searchFunc);

// // Feature # 3
// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = 91;
// }

// function changeToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = 33;
// }

// let tempToFahrenheit = document.querySelector("#fahrenheit-link");
// tempToFahrenheit.addEventListener("click", changeToFahrenheit);

// let tempToCelsius = document.querySelector("#celsius-link");
// tempToCelsius.addEventListener("click", changeToCelsius);

// **********************************************************************************************************


let apiKey = "28a9b26783d5b53ed2f25d7dd7717889";

// stores the input value entered in the search bar.
function searchForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchInput");
  let city = cityInput.value;

  searchCity(city); // calls "search" the function.
}

// this function esp made for default city info.
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

function displayWeatherInfo(response) {
  console.log(response);
  let displayCity = document.querySelector(".city");
  displayCity.innerHTML = response.data.name;

  // date and time
  document.querySelector(".time").innerHTML = formateDate(response.data.dt * 1000);

  let temperature = Math.round(response.data.main.temp);
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

let searchRow = document.querySelector("#search-form");
searchRow.addEventListener("submit", searchForm);

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", getPinHereLocation);

searchCity("Siddharthanagar"); // this is for search on load.
