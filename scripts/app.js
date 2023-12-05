// Info on the page and what apis corresponds to those
// Current Temperature, Max and Min Temps
// Forecast in Multiple Diff Hours of the current day
// 5 day Forecast

import { apiKey } from "./hidekey.js";
import { now, hours, minutes } from "./conversion.js";

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

let date1 = "";
let day1Max = "";
let day2Max = "";
let day3Max = "";
let day4Max = "";
let day5Max = "";
let day1Min = "";
let day2Min = "";
let day3Min = "";
let day4Min = "";
let day5Min = "";

let userInput = document.getElementById("userInput");
let searchBtn = document.getElementById("searchBtn");
let searchedData;

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
    weatherIcon.innerHTML = weatherData.list[0].weather[0].icon;

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

async function SearchCityApi(city, state, countryCode) {
    const promise = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${countryCode}&limit=1&appid=${apiKkey}
        `
    );
    const data = await promise.json();
    searchedData = data[0].name.toLowerCase();
}

// const citySearchData = await SearchCityApi(city, state, countryCode);
// console.log(citySearchData);

// Built in geo-code is deprecated so have to change to geocoding api when there
// Geocoding API
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

function findCity (){
    // reassigning the input to another variable so that the value is saved
    let cityInput = userInput.value.toLowerCase();

    if(cityInput === searchedData){
        console.log(searchedData);
    }

}

searchBtn.addEventListener('click', function(e){
    findCity();
});

// function findStudent(){
//     // reassign the value of userInput to studentInput so that the input is saved
//     let studentInput = userInput.value.toLowerCase();

//     for(let i = 0; i < students.length; i++){

//         // every time we loop/iterate, we save their student here
//         let currentStudent = students[i]
//         if(studentInput === currentStudent.firstName.toLowerCase()){

//             matchingStudent = currentStudent;
//         }
//     }

//     if(matchingStudent){
//         // inner text doesn't include any white space if you console
//         studentName.innerText = `${matchingStudent.firstName} ${matchingStudent.lastName}`;
//         studentNumber.innerText = matchingStudent.phoneNumber;
//         studentEmail.innerText = matchingStudent.email;
//     }else{
//         studentName.innerText = "Student not Found";
//     }
// }

// submitBtn.addEventListener('click', function(e){
//     findStudent();
//    });