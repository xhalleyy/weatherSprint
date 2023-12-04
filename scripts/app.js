// Info on the page and what apis corresponds to those
// Current Temperature, Max and Min Temps
// Forecast in Multiple Diff Hours of the current day
// 5 day Forecast

import { apiKey } from "./hidekey.js";
import { currentTempConvert, MaxTempConvert, MinTempConvert } from "./conversion.js";

// let currLatitude = "";
// let currLongitude = "";

// What Information needs to change when we receive the data from the api
let cityName = document.getElementById("cityName");
let weatherIcon = document.getElementById("weatherIcon");
let currentTemp = document.getElementById("currentTemp");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let weatherText = document.getElementById("weatherText");


navigator.geolocation.getCurrentPosition(success, errorFunc);

async function success(position) {
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
    let currLatitude = position.coords.latitude;
    let currLongitude = position.coords.longitude;
    const weatherData = await ForecastApi(currLatitude, currLongitude);
    console.log(weatherData);

    cityName.innerText = "Current Location";
    maxTemp.textContent = weatherData.list[0].main.temp_max;
    minTemp.textContent = weatherData.list[0].main.temp_min;
    currentTemp.textContent = weatherData.list[0].main.temp;
    weatherText.textContent = weatherData.list[0].weather[0].description;
    weatherIcon.innerHTML = weatherData.list[0].weather[0].icon;
}

function errorFunc(error) {
    console.log(error.message);
}

async function ForecastApi(currLatitude, currLongitude) {
    const promise = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${currLatitude}&lon=${currLongitude}&appid=${apiKey}`
    );
    const data = await promise.json();
    console.log(data);
    return data;
}

async function SearchCityApi(city) {
    const promise = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );
    const data = await promise.json();
    console.log(data);
}