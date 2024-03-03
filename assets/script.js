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
// need to clear pouplated after search so it doesn't overlap the second search

async function cityEntered(event) {
    event.preventDefault();
    let userCity = cityForm.usercity.value;
    // const coordinates = await getGeoCode(userCity);
    // console.log(coordinates);
    const current = await getCurrentWeather(userCity);
    console.log(current);
    renderWeather(current);    
    const fiveDay = await getFiveDay(current);
    // console.log(fiveDay);
    renderFiveDayWeather(fiveDay);
    localStorage.setItem("city", userCity);    
    return current;
};
cityForm.addEventListener("submit", cityEntered);

// this didn't work becasue github pages refused to direct to http api call, had to work around
// convert city to latitude and longitude coordinates

// async function getGeoCode(city) {
// let cityUsed = city.replace(/\s/g, "%20");
//     let convertCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityUsed + "&limit=5&appid=" + WeatherAPIKey;
//     let coordinates = (await fetch(convertCity)).json();
//     return coordinates;
// };
// get current weather

async function getCurrentWeather(city) {
    let cityUsed = city.replace(/\s/g, "%20");
    let getCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityUsed + "&appid=" + WeatherAPIKey + "&units=imperial";
    // console.log(getCurrent);
    const weatherNow = (await fetch(getCurrent)).json();
    return weatherNow;
};

// show current weather city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

function renderWeather(current) {
    let currentWeatherDiv = document.getElementById("current-weather");
    let cityNameDiv = document.getElementById("city-name");
    let cityName = document.createElement("p");
    let city = current.name;
    cityName.textContent = city + " (" + todaysDate + ")";
    cityName.style.marginTop = "15px";
    cityName.style.marginBottom = "15px";
    cityName.style.fontSize = "xx-large";
    cityName.style.fontWeight = "bold";
    
    // show image
    let weatherIconDiv = document.getElementById("weather-icon");
    let icon = current.weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    let img = document.createElement("img");
    img.src = iconUrl;
    img.style.width = "65px";
    img.style.height = "65px";
    img.style.marginLeft = "20px";
    
    let description = document.createElement("p");
    description.textContent = "Conditions: " + current.weather[0].description;
    
    let temperature = document.createElement("p");
    temperature.textContent = "Temperature: " + current.main.temp + "°F";
    
    let feelsLike = document.createElement("p");
    feelsLike.textContent = "Feels Like: " + current.main.feels_like + "°F";
    
    let windspeed = document.createElement("p");
    windspeed.textContent = "Wind: " + current.wind.speed + " MPH";
    
    let humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + current.main.humidity + "%";
    
    cityNameDiv.appendChild(cityName);
    weatherIconDiv.appendChild(img);
    currentWeatherDiv.appendChild(description);
    currentWeatherDiv.appendChild(temperature);
    currentWeatherDiv.appendChild(feelsLike);
    currentWeatherDiv.appendChild(windspeed);
    currentWeatherDiv.appendChild(humidity);
    
    localStorage.setItem("searchedCity", city);
};
let searchedCity = localStorage.getItem("searchedCity");

// console.log(searchedCity);

// get five day weather

async function getFiveDay(current) {
    let latitude = current.coord.lat;
    console.log(latitude);
    let longitude = current.coord.lon;
    console.log(longitude);    
    let getFive = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + WeatherAPIKey + "&units=imperial";
    console.log(getFive);   
    const weatherFiveDay = (await fetch(getFive)).json();
    return weatherFiveDay;
};

// show five day forecast the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// I tried to do a loop for all this but abandoned that for the moment
function renderFiveDayWeather(fiveDay) {

    // day 1
    let day0Div = document.getElementById("day0");
    let date0Div = document.getElementById("date0");
    let date0 = document.createElement("p");
    date0.textContent = fiveDay.list[0].dt_txt;

    let fiveWeatherIconDiv0 = document.getElementById("five-weather-icon0");
    let icon0 = fiveDay.list[0].weather[0].icon;
    let iconUrl0 = "https://openweathermap.org/img/wn/" + icon0 + "@2x.png";
    let img0 = document.createElement("img");
    img0.src = iconUrl0;
    img0.style.width = "100px";
    img0.style.height = "100px";

    let temp0 = document.createElement("p");
    temp0.textContent = "Temperature: " + fiveDay.list[0].main.temp + "°F";

    let fiveWindspeed0 = document.createElement("p");
    fiveWindspeed0.textContent = "Wind: " + fiveDay.list[0].wind.speed + " MPH";

    let fiveHumidity0 = document.createElement("p");
    fiveHumidity0.textContent = "Humidity: " + fiveDay.list[0].main.humidity + "%";

    // day 2
    let day1Div = document.getElementById("day1");
    let date1Div = document.getElementById("date1");
    let date1 = document.createElement("p");
    date1.textContent = fiveDay.list[6].dt_txt;

    let fiveWeatherIconDiv1 = document.getElementById("five-weather-icon1");
    let icon1 = fiveDay.list[6].weather[0].icon;
    let iconUrl1 = "https://openweathermap.org/img/wn/" + icon1 + "@2x.png";
    let img1 = document.createElement("img");
    img1.src = iconUrl1;
    img1.style.width = "100px";
    img1.style.height = "100px";

    let temp1 = document.createElement("p");
    temp1.textContent = "Temperature: " + fiveDay.list[6].main.temp + "°F";

    let fiveWindspeed1 = document.createElement("p");
    fiveWindspeed1.textContent = "Wind: " + fiveDay.list[6].wind.speed + " MPH";

    let fiveHumidity1 = document.createElement("p");
    fiveHumidity1.textContent = "Humidity: " + fiveDay.list[6].main.humidity + "%";

    // day 3
    let day2Div = document.getElementById("day2");
    let date2Div = document.getElementById("date2");
    let date2 = document.createElement("p");
    date2.textContent = fiveDay.list[15].dt_txt;

    let fiveWeatherIconDiv2 = document.getElementById("five-weather-icon2");
    let icon2 = fiveDay.list[15].weather[0].icon;
    let iconUrl2 = "https://openweathermap.org/img/wn/" + icon2 + "@2x.png";
    let img2 = document.createElement("img");
    img2.src = iconUrl2;
    img2.style.width = "100px";
    img2.style.height = "100px";

    let temp2 = document.createElement("p");
    temp2.textContent = "Temperature: " + fiveDay.list[15].main.temp + "°F";

    let fiveWindspeed2 = document.createElement("p");
    fiveWindspeed2.textContent = "Wind: " + fiveDay.list[15].wind.speed + " MPH";

    let fiveHumidity2 = document.createElement("p");
    fiveHumidity2.textContent = "Humidity: " + fiveDay.list[15].main.humidity + "%";

    // day 4
    let day3Div = document.getElementById("day3");
    let date3Div = document.getElementById("date3");
    let date3 = document.createElement("p");
    date3.textContent = fiveDay.list[23].dt_txt;

    let fiveWeatherIconDiv3 = document.getElementById("five-weather-icon3");
    let icon3 = fiveDay.list[23].weather[0].icon;
    let iconUrl3 = "https://openweathermap.org/img/wn/" + icon3 + "@2x.png";
    let img3 = document.createElement("img");
    img3.src = iconUrl3;
    img3.style.width = "100px";
    img3.style.height = "100px";

    let temp3 = document.createElement("p");
    temp3.textContent = "Temperature: " + fiveDay.list[23].main.temp + "°F";

    let fiveWindspeed3 = document.createElement("p");
    fiveWindspeed3.textContent = "Wind: " + fiveDay.list[23].wind.speed + " MPH";

    let fiveHumidity3 = document.createElement("p");
    fiveHumidity3.textContent = "Humidity: " + fiveDay.list[23].main.humidity + "%";

    // day 5
    let day4Div = document.getElementById("day4");
    let date4Div = document.getElementById("date4");
    let date4 = document.createElement("p");
    date4.textContent = fiveDay.list[32].dt_txt;

    let fiveWeatherIconDiv4 = document.getElementById("five-weather-icon4");
    let icon4 = fiveDay.list[32].weather[0].icon;
    let iconUrl4 = "https://openweathermap.org/img/wn/" + icon4 + "@2x.png";
    let img4 = document.createElement("img");
    img4.src = iconUrl4;
    img4.style.width = "100px";
    img4.style.height = "100px";

    let temp4 = document.createElement("p");
    temp4.textContent = "Temperature: " + fiveDay.list[32].main.temp + "°F";

    let fiveWindspeed4 = document.createElement("p");
    fiveWindspeed4.textContent = "Wind: " + fiveDay.list[32].wind.speed + " MPH";

    let fiveHumidity4 = document.createElement("p");
    fiveHumidity4.textContent = "Humidity: " + fiveDay.list[32].main.humidity + "%";

    // render all info
    date0Div.appendChild(date0);
    fiveWeatherIconDiv0.appendChild(img0);
    day0Div.appendChild(temp0);
    day0Div.appendChild(fiveWindspeed0);
    day0Div.appendChild(fiveHumidity0);

    date1Div.appendChild(date1);
    fiveWeatherIconDiv1.appendChild(img1);
    day1Div.appendChild(temp1);
    day1Div.appendChild(fiveWindspeed1);
    day1Div.appendChild(fiveHumidity1);

    date2Div.appendChild(date2);
    fiveWeatherIconDiv2.appendChild(img2);
    day2Div.appendChild(temp2);
    day2Div.appendChild(fiveWindspeed2);
    day2Div.appendChild(fiveHumidity2);

    date3Div.appendChild(date3);
    fiveWeatherIconDiv3.appendChild(img3)
    day3Div.appendChild(temp3);
    day3Div.appendChild(fiveWindspeed3);
    day3Div.appendChild(fiveHumidity3);

    date4Div.appendChild(date4);
    fiveWeatherIconDiv4.appendChild(img4);
    day4Div.appendChild(temp4);
    day4Div.appendChild(fiveWindspeed4);
    day4Div.appendChild(fiveHumidity4);
}

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
        'city': searchedCity,
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