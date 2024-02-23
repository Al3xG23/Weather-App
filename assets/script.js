const WeatherAPIKey = "f714786d6279ec80d8a23eb995a5fb8e";

// get user city input

function cityEntered() {
    let userCity = document.getElementById("user-city").value;    
    localStorage.setItem("userCity", userCity);
};
let userCity = localStorage.getItem("userCity");
let cityUsed = userCity.replace(/\s/g, "%20");
console.log(userCity);


// convert city to latitude and longitude coordinates

function getGeoCode() {    
    let convertCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityUsed + "&limit=5&appid=" + WeatherAPIKey;
    console.log(cityUsed);
    fetch(convertCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem("coordinates", JSON.stringify(data));
        });
    return coordinates;
};
let coordinates = localStorage.getItem("coordinates");
getGeoCode();
const topFiveCities = JSON.parse(coordinates);

// only grabbing the first city but would like to give the user the option to select the city they want if it's the same name but different location

let latitude = topFiveCities[0].lat;
let longitude = topFiveCities[0].lon;

// for (var i = 0; i < 5; i++) {
    //     let cityLat = topFiveCities[0].lat;
    //     let cityLon = topFiveCities[0].lon;    
    //     localStorage.setItem("cityLat", cityLat);
    //     localStorage.setItem("cityLon", cityLon);
    // }
    // let latitude = localStorage.getItem("cityLat");
    // let longitude = localStorage.getItem("cityLon");
    
    // show current weather city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
    
    let currentWeather = document.getElementById("current-weather");
    function getCurrentWeather() {
    let getCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey;
    // let info = document.querySelector("ul");
    fetch(getCurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem("weatherData", JSON.stringify(data))
        });
};
let weatherData = JSON.parse(localStorage.getItem("weatherData"));
let cityName = weatherData.name;
let description = weatherData.weather[0].description;
let icon = weatherData.weather[0].icon;
let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
let temperature = weatherData.main.temp;
let feelsLike = weatherData.main.feels_like;
let humidity = weatherData.main.humidity;
let windspeed = weatherData.wind.speed;
console.log("cityName:" + cityName);
console.log("description:" + description);
console.log("icon:" + icon);
console.log(iconUrl);
console.log("temperature:" + temperature);
console.log("feels like:" + feelsLike);
console.log("humidity:" + humidity);
console.log("windspeed:" + windspeed);
getCurrentWeather();

// show five day forecast the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

let fiveDay = document.getElementById("five-day");
function getFiveDay() {
    let getFive = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey;
    // console.log(getFive);
    // let info = document.querySelector("ul");
    fetch(getFive)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            localStorage.setItem("fiveData", JSON.stringify(data))
        });
};
let fiveData = JSON.parse(localStorage.getItem("fiveData"));
// console.log(fiveData);
getFiveDay();

// show searched cities
// showing the list but the links are only going to whatever was the last search

let savedCities = document.getElementById('saved-cities');
let lastSearch = [];

function saveSearches() {

    if (localStorage.getItem('savedCities') === null) {
        localStorage.setItem('savedCities', []);
    } else {
        lastSearch = JSON.parse(localStorage.getItem('savedCities'));
    }
    lastSearch.unshift([{
        'cityName': cityName,
    }]);
    if (lastSearch.length >= 15) {
        lastSearch.pop();
    }
    localStorage.setItem('savedCities', JSON.stringify(lastSearch));
}
saveSearches();

function printSearches() {
    for (each of lastSearch) {
        let search = document.createElement('p');
        searchLink = document.createElement('a');
        searchLink.textContent = each[0].cityName;
        searchLink.href = 'index.html?q=' + each[0].cityName;
        // searchLink.href = cityEntered(each[0].cityName);
        search.append(searchLink);
        savedCities.append(search);
    }
}

printSearches();