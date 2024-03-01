const WeatherAPIKey = "f714786d6279ec80d8a23eb995a5fb8e";
const cityForm = document.getElementById("city-form");
const currentWeather = document.getElementById("current-weather");
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let todaysDate = month + "/" + day + "/" + year;

// get user city input

// only grabbing the first city but would like to give the user the option to select the city they want if it's the same name but different location

async function cityEntered(event) {
    event.preventDefault();
    let userCity = cityForm.usercity.value;
    localStorage.setItem("userCity", userCity);
    const coordinates = await getGeoCode(userCity);
    // console.log(coordinates);
    let latitude = coordinates[0].lat;
    let longitude = coordinates[0].lon;
    const current = await getCurrentWeather(latitude, longitude);
    // console.log(current);
    renderWeather(current);
    const fiveDay = await getFiveDay(latitude, longitude);
    console.log(fiveDay);
    renderFiveDayWeather(fiveDay);
};
cityForm.addEventListener("submit", cityEntered);

// convert city to latitude and longitude coordinates

async function getGeoCode(city) {
    let cityUsed = city.replace(/\s/g, "%20");
    let convertCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityUsed + "&limit=5&appid=" + WeatherAPIKey;
    let coordinates = (await fetch(convertCity)).json();
    return coordinates;
};
// get current weather

async function getCurrentWeather(latitude, longitude) {
    let getCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey + "&units=imperial";
    const weatherNow = (await fetch(getCurrent)).json();
    return weatherNow;
};

// show current weather city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

function renderWeather(current) {
    let currentWeatherDiv = document.getElementById("current-weather");

    let cityNameDiv = document.getElementById("city-name");
    let cityName = document.createElement("p");
    cityName.textContent = current.name + " (" + todaysDate + ")";
    cityName.style.marginTop = "15px";
    cityName.style.marginBottom = "15px";
    cityName.style.fontSize = "x-large";
    cityName.style.fontWeight = "bold";
    
    // show image
    let weatherIconDiv = document.getElementById("weather-icon");
    let icon = current.weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    let img = document.createElement("img");
    img.src = iconUrl
    img.style.width = "50px";
    img.style.height = "50px";
    
    let description = document.createElement("p");
    description.textContent = "Conditions: " + current.weather[0].description;

    let temperature = document.createElement("p");
    temperature.textContent = "Temperature: " + current.main.temp + "°F";

    let feelsLike = document.createElement("p");
    feelsLike.textContent = "Feels Like: " + current.main.feels_like + "°F";

    let humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + current.main.humidity + "%";

    let windspeed = document.createElement("p");
    windspeed.textContent = "Wind: " + current.wind.speed + " MPH";

    cityNameDiv.appendChild(cityName);
    weatherIconDiv.appendChild(img);
    currentWeatherDiv.appendChild(description);
    currentWeatherDiv.appendChild(temperature);
    currentWeatherDiv.appendChild(feelsLike);
    currentWeatherDiv.appendChild(humidity);
    currentWeatherDiv.appendChild(windspeed);
};

// get five day weather

async function getFiveDay(latitude, longitude) {
    let getFive = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey + "&units=imperial";
    console.log(getFive);
    const weatherFiveDay = (await fetch(getFive)).json();
    return weatherFiveDay;
};

// // show five day forecast the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function renderFiveDayWeather(fiveDay) {

};

// show searched cities
// showing the list but the links are only going to whatever was the last search

// let savedCities = document.getElementById('saved-cities');
// let lastSearch = [];

// function saveSearches() {

//     if (localStorage.getItem('savedCities') === null) {
//         localStorage.setItem('savedCities', []);
//     } else {
//         lastSearch = JSON.parse(localStorage.getItem('savedCities'));
//     }
//     lastSearch.unshift([{
//         'city': city,
//     }]);
//     if (lastSearch.length >= 15) {
//         lastSearch.pop();
//     }
//     localStorage.setItem('savedCities', JSON.stringify(lastSearch));
// }
// saveSearches();

// function printSearches() {
//     for (each of lastSearch) {
//         let search = document.createElement('p');
//         searchLink = document.createElement('a');
//         searchLink.textContent = each[0].cityName;
//         searchLink.href = cityEntered(each[0].cityName);
//         // searchLink.href = cityEntered(each[0].cityName);
//         search.append(searchLink);
//         savedCities.append(search);
//     }
// }

// printSearches();

// other way to show search history, need to play with it

// var searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
// document.querySelector(".search").addEventListener("click", () => {
//   searchHistory.push(document.querySelector(".usercity").value);
//   localStorage.searchHistory = JSON.stringify(searchHistory);
// });
// document.querySelector(".usercity").addEventListener("focus", () => {
//   var data = document.querySelector("datalist#searchdata");
//   data.innerHTML = "";
//   searchHistory.forEach((search) => {
//     data.innerHTML = "<option>" + data.innerHTML;
//     data.querySelector("option").innerText = search;
//   });
// });