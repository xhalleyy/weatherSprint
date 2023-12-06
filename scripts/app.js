// Info on the page and what apis corresponds to those
// Current Temperature, Max and Min Temps
// Forecast in Multiple Diff Hours of the current day
// 5 day Forecast

import { apiKey } from "./hidekey.js";
import { now, hours, minutes } from "./conversion.js";
import { weatherIconCode, colorIcon} from "./weathericons.js";

// What Information needs to change when we receive the data from the api
let cityName = document.getElementById("cityName");
let weatherIcon = document.getElementById("weatherIcon");
let currentTemp = document.getElementById("currentTemp");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let weatherText = document.getElementById("weatherText");
let todayAMTemp = document.getElementById("todayAMTemp");
let todayNoonTemp = document.getElementById("todayNoonTemp");
let todayPMTemp = document.getElementById("todayPMTemp");
let presentTime = document.getElementById("presentTime");
let morningIcon = document.getElementById("morningIcon");
let noonIcon = document.getElementById("noonIcon");
let nightIcon = document.getElementById("nightIcon");

// day1 - day5 variables show 
let day1 = document.getElementById("day1");
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");
let day4 = document.getElementById("day4");
let day5 = document.getElementById("day5");
let day1MaxandMin = document.getElementById("day1MaxandMin");
let day2MaxandMin = document.getElementById("day2MaxandMin");
let day3MaxandMin = document.getElementById("day3MaxandMin");
let day4MaxandMin = document.getElementById("day4MaxandMin");
let day5MaxandMin = document.getElementById("day5MaxandMin");

let day1icon = document.getElementById("day1icon");
let day2icon = document.getElementById("day2icon");
let day3icon = document.getElementById("day3icon");
let day4icon = document.getElementById("day4icon");
let day5icon = document.getElementById("day5icon");

let userInput = document.getElementById("userInput");
let searchBtn = document.getElementById("searchBtn");

navigator.geolocation.getCurrentPosition(success, errorFunc);

// Success leads to initial load of page where data of the location is displayed
async function success(position) {
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
    let currLatitude = position.coords.latitude;
    let currLongitude = position.coords.longitude;
    const weatherData = await ForecastApi(currLatitude, currLongitude);
    const currentData = await CurrentApi(currLatitude, currLongitude);

    let wholeNumTemp = Math.floor(currentData.main.temp);
    let wholeNumMax = Math.floor(currentData.main.temp_max);
    let wholeNumMin = Math.floor(currentData.main.temp_min);
    let wholeNumAM = Math.floor(weatherData.list[0].main.temp);
    let wholeNumNoon = Math.floor(weatherData.list[1].main.temp);
    let wholeNumPM = Math.floor(weatherData.list[2].main.temp);


    cityName.innerText = "CURRENT LOCATION";
    maxTemp.textContent = `H:${wholeNumMax}°F`;
    minTemp.textContent = `L:${wholeNumMin}°F`;
    currentTemp.textContent = `${wholeNumTemp}°F`;
    weatherText.textContent = currentData.weather[0].description;

    weatherIcon.textContent = weatherIconCode(currentData.weather[0].icon);
    // console.log(weatherIcon.textContent);
    morningIcon.textContent = weatherIconCode(weatherData.list[0].weather[0].icon);
    noonIcon.textContent = weatherIconCode(weatherData.list[1].weather[0].icon);
    nightIcon.textContent = weatherIconCode(weatherData.list[2].weather[0].icon);
    day1icon.textContent = weatherIconCode(weatherData.list[4].weather[0].icon);
    day2icon.textContent = weatherIconCode(weatherData.list[7].weather[0].icon);
    day3icon.textContent = weatherIconCode(weatherData.list[10].weather[0].icon);
    day4icon.textContent = weatherIconCode(weatherData.list[13].weather[0].icon);
    day5icon.textContent = weatherIconCode(weatherData.list[16].weather[0].icon);

    day1MaxandMin.textContent = `${Math.floor(weatherData.list[8].main.temp_max)}°F | ${Math.floor(weatherData.list[6].main.temp_min)}°F`;
    day2MaxandMin.textContent = `${Math.floor(weatherData.list[15].main.temp_max)}°F | ${Math.floor(weatherData.list[14].main.temp_min)}°F`;
    day3MaxandMin.textContent = `${Math.floor(weatherData.list[32].main.temp_max)}°F | ${Math.floor(weatherData.list[22].main.temp_min)}°F`;
    day4MaxandMin.textContent = `${Math.floor(weatherData.list[32].main.temp_max)}°F | ${Math.floor(weatherData.list[30].main.temp_min)}°F`;
    day5MaxandMin.textContent = `${Math.floor(weatherData.list[39].main.temp_max)}°F | ${Math.floor(weatherData.list[37].main.temp_min)}°F`;
    
    weatherIcon.classList.add(colorIcon(currentData.weather[0].icon));
    morningIcon.classList.add(colorIcon(weatherData.list[0].weather[0].icon));
    noonIcon.classList.add(colorIcon(weatherData.list[1].weather[0].icon));
    nightIcon.classList.add(colorIcon(weatherData.list[2].weather[0].icon));

    presentTime.textContent = `${hours}:${minutes}`;
    todayAMTemp.textContent = `${wholeNumAM}°`;
    todayNoonTemp.textContent = `${wholeNumNoon}°`;
    todayPMTemp.textContent = `${wholeNumPM}°`;

    // day1.textContent = "";
    let date1 = new Date(weatherData.list[3].dt_txt);
    let firstdayForecast = date1.getDay();
    console.log(firstdayForecast);

}


function errorFunc(error) {
    console.log(error.message);
}

// API CALLS
async function ForecastApi(currLatitude, currLongitude) {
    const promise = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${currLatitude}&lon=${currLongitude}&units=imperial&appid=${apiKey}`
    );
    const data = await promise.json();
    console.log(data);
    return data;
}

async function CurrentApi(currLatitude, currLongitude){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currLatitude}&lon=${currLongitude}&units=imperial&appid=${apiKey}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

async function SearchCityApi(city) {
    const promise = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}
        `
    );
    const data = await promise.json();
    console.log(data);
    cityName.textContent = `${data[0].name.toUpperCase()}, ${data[0].state.toUpperCase()}, ${data[0].country.toUpperCase()}`
}

// const citySearchData = await SearchCityApi(city, state, countryCode);
// console.log(citySearchData);

// Built in geo-code is deprecated so have to change to geocoding api when there
// Geocoding API
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// function findCity (){
//     // reassigning the input to another variable so that the value is saved
//     let cityInput = userInput.value.toLowerCase();

//     if(cityInput === searchedData){
//         console.log(searchedData);
//     }

// }

searchBtn.addEventListener('click', async function(e){
    // console.log(userInput.value);
    await SearchCityApi(userInput.value);
});


// day / night mode variable to change , add/remove classes
let dayMode = document.getElementById("dayMode");
let navbarColor = document.getElementById("navbarColor");
let navTitle = document.getElementById("navTitle");
let darkCurrLocation = document.getElementById("darkCurrLocation");
let darkCurrTimes = document.getElementById("darkCurrTimes");
let morningTime = document.getElementById("morningTime");
let noonTime = document.getElementById("noonTime");
let nightTime = document.getElementById("nightTime");

// click day/sun button and changes to dark mode
dayMode.addEventListener('click', function(e){
    navbarColor.classList.add('darkModeColor');
    navbarColor.classList.remove('nav-style');
    userInput.classList.remove('box-shadow');
    navTitle.classList.add('darkModeTitle');
    darkCurrLocation.classList.add('darkModeColor');
    darkCurrLocation.classList.add('white-font');
    darkCurrTimes.classList.add('darkModeColor');
    darkCurrTimes.classList.add('white-font');
    morningTime.classList.add('white-font');
    noonTime.classList.add('white-font');
    nightTime.classList.add('white-font');
    todayAMTemp.classList.add('white-font');
    todayNoonTemp.classList.add('white-font');
    todayPMTemp.classList.add('white-font');
});