const WeatherAPIKey = "f714786d6279ec80d8a23eb995a5fb8e";
const cityForm = document.getElementById("city-form");
const currentWeather = document.getElementById("current-weather");

// get user city input

// only grabbing the first city but would like to give the user the option to select the city they want if it's the same name but different location

async function cityEntered(event) {
    event.preventDefault();
    let userCity = cityForm.usercity.value;
    localStorage.setItem("userCity", userCity);
    const coordinates = await getGeoCode(userCity);
    console.log(coordinates);
    let latitude = coordinates[0].lat;
    let longitude = coordinates[0].lon;
    const current = await getCurrentWeather(latitude, longitude);
    console.log(current);
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
    console.log(cityUsed);
    let coordinates = (await fetch(convertCity)).json();
    return coordinates;
};
// get current weather

async function getCurrentWeather(latitude, longitude) {
    let getCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey;
    const weatherNow = (await fetch(getCurrent)).json();
    return weatherNow;
};

// show current weather city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

function renderWeather(current) {
    let cityName = current.name;
    let description = current.weather[0].description;
    let icon = current.weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    let temperature = current.main.temp;
    let feelsLike = current.main.feels_like;
    let humidity = current.main.humidity;
    let windspeed = current.wind.speed;
    console.log("cityName:" + cityName);
    console.log("description:" + description);
    console.log("icon:" + icon);
    console.log(iconUrl);
    console.log("temperature:" + temperature);
    console.log("feels like:" + feelsLike);
    console.log("humidity:" + humidity);
    console.log("windspeed:" + windspeed);    
};

// get five day weather

async function getFiveDay(latitude, longitude) {
    let getFive = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey;
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