// Info on the page and what apis corresponds to those
// Current Temperature, Max and Min Temps
// Forecast in Multiple Diff Hours of the current day
// 5 day Forecast

import { apiKey } from "./hidekey.js";

// let currLatitude = "";
// let currLongitude = "";

navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position){
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
    let currLatitude = position.coords.latitude;
    let currLongitude = position.coords.longitude;
    ForecastApi(currLatitude, currLongitude);
}

function errorFunc(error){
    console.log(error.message);
}

async function ForecastApi(currLatitude, currLongitude) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${currLatitude}&lon=${currLongitude}&appid=${apiKey}`
  );
  
  const data = await promise.json();

  console.log(data);
}

async function SearchCityApi(city){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
    const data = await promise.json();
    console.log(data);
}

