const WeatherAPIKey = "f714786d6279ec80d8a23eb995a5fb8e";

// get user city input

let userCity = localStorage.getItem("userCity");
let cityUsed = userCity.replace(/\s/g, "%20");
function cityEntered() {
    let userCity = document.getElementById("user-city").value;
    localStorage.setItem("userCity", userCity);
};
// console.log(userCity);

// convert city to latitude and longitude coordinates

let convertCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityUsed + "&limit=5&appid=" + WeatherAPIKey;
// console.log(convertCity);

function getGeoCode() {
    fetch(convertCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem("weatherData", JSON.stringify(data));
        });
    return weatherData;
};
var weatherData = localStorage.getItem("weatherData");

getGeoCode();

const obj = JSON.parse(weatherData);
// console.log(obj);

for (var i = 0; i < 1; i++) {
    let cityLat = obj[i].lat;
    let cityLon = obj[i].lon;    
    // console.log("lat:" + cityLat);
    // console.log("lon:" + cityLon);
    localStorage.setItem("cityLat", cityLat);
    localStorage.setItem("cityLon", cityLon);
}
let latitude = localStorage.getItem("cityLat");
let longitude = localStorage.getItem("cityLon");
// console.log("lat:" + latitude);
// console.log("lon:" + longitude);

// show current weather

let getCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey;
console.log(getCurrent);

// show five day forecast

let getFiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey;
console.log(getFiveDay);

// show searched cities
let savedCities = document.getElementById('saved-cities');
let lastSearch = [];

function saveSearches() {
    if (localStorage.getItem('savedCities') == null) {
        localStorage.setItem('savedCities', []);
    } else {
        lastSearch = JSON.parse(localStorage.getItem('savedCities'));
    }
    lastSearch.unshift([{
        'city': userCity,
    }]);
    if (lastSearch.length > 15) {
        lastSearch.pop();
    }
    localStorage.setItem('savedCities', JSON.stringify(lastSearch));
}

function printSearches() {
    for (each of lastSearch) {
        let search = document.createElement('p');
        searchLink = document.createElement('a');
        searchLink.textContent = each[0].city;
        searchLink.href = 'index.html?q=' + each[0].city;
        search.append(searchLink);
        savedCities.append(search);
    }
}

saveSearches();
printSearches();