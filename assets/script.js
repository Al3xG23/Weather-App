const WeatherAPIKey = "f714786d6279ec80d8a23eb995a5fb8e";

// get user city input
let userCity = localStorage.getItem("userCity");
let cityUsed = userCity.replace(/\s/g, "%20");
function cityEntered() {
    let userCity = document.getElementById("user-city").value;
    localStorage.setItem("userCity", userCity);
};

console.log(userCity);

//convert city to latitude and longitude coordinates
let convertCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityUsed + "&limit=5&appid=" + WeatherAPIKey;
console.log(convertCity);

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
// console.log(weatherData);
getGeoCode();

for (var i = 0; i < weatherData.length; i++) {
    let cityLat = weatherData[i].lat;
    let cityLon = weatherData[i].lon;
    localStorage.setItem("lat", cityLat);
    localStorage.setItem("lon", cityLon);
}
localStorage.getItem("lat");
localStorage.getItem("lon");

console.log("lat");
console.log("lon");


// let geoCode = [];
// let lat = 
// let lon =

// show current weather
// let getCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + WeatherAPIKey;

// show five day forecast
// let getFiveDay = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=appid=" + WeatherAPIKey;

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