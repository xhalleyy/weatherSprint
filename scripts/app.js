// Info on the page and what apis corresponds to those
// Current Temperature, Max and Min Temps
// Forecast in Multiple Diff Hours of the current day
// 5 day Forecast

import { apiKey } from "./hidekey.js";
import { formatTime } from "./conversion.js";
import { weatherIconCode, colorIcon } from "./weathericons.js";
import { futureTimes, OtherDatesInfo, OffCanvasCity } from "./elements.js";
export { removeFav, dayModeBtn }

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
let morningIcon = document.getElementById("morningIcon");
let noonIcon = document.getElementById("noonIcon");
let nightIcon = document.getElementById("nightIcon");

// day1 - day5 variables show 
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

let day1icon = document.getElementById("day1icon");
let day2icon = document.getElementById("day2icon");
let day3icon = document.getElementById("day3icon");
let day4icon = document.getElementById("day4icon");
let day5icon = document.getElementById("day5icon");

let userInput = document.getElementById("userInput");
let searchBtn = document.getElementById("searchBtn");

let currLatitude;
let currLongitude;
let weatherData;
let darkMode = false;

let webTitle = document.getElementById("webTitle");

webTitle.addEventListener("click", function (e) {
    location.reload();
});


navigator.geolocation.getCurrentPosition(success, errorFunc);

// Success leads to initial load of page where data of the location is displayed
async function success(position) {
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
    currLatitude = position.coords.latitude;
    currLongitude = position.coords.longitude;
    weatherData = await ForecastApi(currLatitude, currLongitude);
    const currentData = await CurrentApi(currLatitude, currLongitude);
    console.log(weatherData);
    console.log(currentData);

    let wholeNumTemp = Math.floor(currentData.main.temp);
    let wholeNumMax = Math.floor(currentData.main.temp_max);
    let wholeNumMin = Math.floor(currentData.main.temp_min);
    let wholeNumAM = Math.floor(weatherData.list[0].main.temp);
    let wholeNumNoon = Math.floor(weatherData.list[1].main.temp);
    let wholeNumPM = Math.floor(weatherData.list[2].main.temp);

    cityName.innerText = `${currentData.name.toUpperCase()}, ${currentData.sys.country}`;
    maxTemp.textContent = `H:${wholeNumMax}°F`;
    minTemp.textContent = `L:${wholeNumMin}°F`;
    currentTemp.textContent = `${wholeNumTemp}°F`;
    weatherText.textContent = currentData.weather[0].description;

    weatherIcon.textContent = weatherIconCode(currentData.weather[0].icon);
    morningIcon.textContent = weatherIconCode(weatherData.list[0].weather[0].icon);
    noonIcon.textContent = weatherIconCode(weatherData.list[1].weather[0].icon);
    nightIcon.textContent = weatherIconCode(weatherData.list[2].weather[0].icon, 'night');
    day1icon.textContent = weatherIconCode(weatherData.list[5].weather[0].icon);
    day2icon.textContent = weatherIconCode(weatherData.list[13].weather[0].icon);
    day3icon.textContent = weatherIconCode(weatherData.list[27].weather[0].icon);
    day4icon.textContent = weatherIconCode(weatherData.list[31].weather[0].icon);
    day5icon.textContent = weatherIconCode(weatherData.list[35].weather[0].icon);


    // TERNARY CONDITIONAL OPERATOR
    // Kind of like an if-else statement
    // Takes 3 operands - a condition, ? executes if the condition is met, if not : executes the other 

    // Since I'm grabbing temps from different indexes, this is making sure that the higher temps at these indexes are displayed the higher temp first and then the lower temp
    day1MaxandMin.textContent = Math.floor(weatherData.list[8].main.temp_max) > Math.floor(weatherData.list[6].main.temp_min) ? Math.floor(weatherData.list[8].main.temp_max) + "°F | " + Math.floor(weatherData.list[6].main.temp_min) + "°F" : Math.floor(weatherData.list[6].main.temp_min) + "°F | " + Math.floor(weatherData.list[8].main.temp_max) + "°F";
    day2MaxandMin.textContent = Math.floor(weatherData.list[15].main.temp_max) > Math.floor(weatherData.list[18].main.temp_min) ? Math.floor(weatherData.list[15].main.temp_max) + "°F | " + Math.floor(weatherData.list[18].main.temp_min) + "°F" : Math.floor(weatherData.list[18].main.temp_min) + "°F | " + Math.floor(weatherData.list[15].main.temp_max) + "°F";
    day3MaxandMin.textContent = Math.floor(weatherData.list[27].main.temp_max) > Math.floor(weatherData.list[22].main.temp_min) ? Math.floor(weatherData.list[27].main.temp_max) + "°F | " + Math.floor(weatherData.list[22].main.temp_min) + "°F" : Math.floor(weatherData.list[22].main.temp_min) + "°F | " + Math.floor(weatherData.list[27].main.temp_max) + "°F";
    day4MaxandMin.textContent = Math.floor(weatherData.list[32].main.temp_max) > Math.floor(weatherData.list[29].main.temp_min) ? Math.floor(weatherData.list[32].main.temp_max) + "°F | " + Math.floor(weatherData.list[29].main.temp_min) + "°F" : Math.floor(weatherData.list[29].main.temp_min) + "°F | " + Math.floor(weatherData.list[32].main.temp_max) + "°F";
    day5MaxandMin.textContent = Math.floor(weatherData.list[39].main.temp_max) > Math.floor(weatherData.list[36].main.temp_min) ? Math.floor(weatherData.list[39].main.temp_max) + "°F | " + Math.floor(weatherData.list[36].main.temp_min) + "°F" : Math.floor(weatherData.list[36].main.temp_min) + "°F | " + Math.floor(weatherData.list[39].main.temp_max) + "°F";


    weatherIcon.classList.add(colorIcon(currentData.weather[0].icon));
    morningIcon.classList.add(colorIcon(weatherData.list[0].weather[0].icon));
    noonIcon.classList.add(colorIcon(weatherData.list[1].weather[0].icon));
    nightIcon.classList.add(colorIcon(weatherData.list[2].weather[0].icon, true));

    todayAMTemp.textContent = `${wholeNumAM}°`;
    todayNoonTemp.textContent = `${wholeNumNoon}°`;
    todayPMTemp.textContent = `${wholeNumPM}°`;

    const format = {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
    };
    const day1Time = new Date(weatherData.list[7].dt * 1000);
    const day1Date = day1Time.toLocaleDateString('en-US', format).split(",");
    day1.textContent = day1Date[0] + day1Date[1];

    const day2Time = new Date(weatherData.list[11].dt * 1000);
    const day2Date = day2Time.toLocaleDateString('en-US', format).split(",");
    day2.textContent = day2Date[0] + day2Date[1];

    const day3Time = new Date(weatherData.list[19].dt * 1000);
    const day3Date = day3Time.toLocaleDateString('en-US', format).split(",");
    day3.textContent = day3Date[0] + day3Date[1];

    const day4Time = new Date(weatherData.list[27].dt * 1000);
    const day4Date = day4Time.toLocaleDateString('en-US', format).split(",");
    day4.textContent = day4Date[0] + day4Date[1];

    const day5Time = new Date(weatherData.list[35].dt * 1000);
    const day5Date = day5Time.toLocaleDateString('en-US', format).split(",");
    day5.textContent = day5Date[0] + day5Date[1];

    const currentTime = formatTime(currentData.dt, currentData.timezone);
    presentTime.textContent = currentTime;
}


function errorFunc(error) {
    console.log(error.message);
}

// API CALLS
async function ForecastApi(currLatitude, currLongitude) {
    const promise = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${currLatitude}&lon=${currLongitude}&units=imperial&appid=${apiKey}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

async function CurrentApi(currLatitude, currLongitude) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currLatitude}&lon=${currLongitude}&units=imperial&appid=${apiKey}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

export async function SearchCityApi(city) {
    const promise = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}`);
    const data = await promise.json();

    currLatitude = data[0].lat;
    currLongitude = data[0].lon;

    weatherData = await ForecastApi(currLatitude, currLongitude);
    console.log(weatherData);
    const currentCityData = await CurrentApi(currLatitude, currLongitude);
    const currentTime = formatTime(currentCityData.dt, currentCityData.timezone);
    presentTime.textContent = currentTime;

    cityName.textContent = `${data[0].name.toUpperCase()}, ${data[0].state ? data[0].state.toUpperCase() + "," : ""} ${data[0].country.toUpperCase()}`
    currentTemp.textContent = `${Math.floor(currentCityData.main.temp)}°F`;
    maxTemp.textContent = `H:${Math.floor(currentCityData.main.temp_max)}°F`;
    minTemp.textContent = `L:${Math.floor(currentCityData.main.temp_min)}°F`;
    weatherText.textContent = currentCityData.weather[0].description;
    // presentTime.textContent = `${hours}:${minutes}`;
    todayAMTemp.textContent = `${Math.floor(weatherData.list[0].main.temp)}°`;
    todayNoonTemp.textContent = `${Math.floor(weatherData.list[1].main.temp)}°`;
    todayPMTemp.textContent = `${Math.floor(weatherData.list[2].main.temp)}°`;

    // weatherIcon.classList.remove(colorIcon(weatherIcon.textContent));
    morningIcon.classList.remove('clearNight');
    noonIcon.classList.remove('clearNight');
    nightIcon.classList.remove('clearNight');

    weatherIcon.textContent = weatherIconCode(currentCityData.weather[0].icon);
    morningIcon.textContent = weatherIconCode(weatherData.list[0].weather[0].icon);
    noonIcon.textContent = weatherIconCode(weatherData.list[1].weather[0].icon);
    nightIcon.textContent = weatherIconCode(weatherData.list[2].weather[0].icon, "night");
    day1icon.textContent = weatherIconCode(weatherData.list[5].weather[0].icon);
    day2icon.textContent = weatherIconCode(weatherData.list[13].weather[0].icon);
    day3icon.textContent = weatherIconCode(weatherData.list[27].weather[0].icon);
    day4icon.textContent = weatherIconCode(weatherData.list[31].weather[0].icon);
    day5icon.textContent = weatherIconCode(weatherData.list[35].weather[0].icon);

    day1MaxandMin.textContent = Math.floor(weatherData.list[8].main.temp_max) > Math.floor(weatherData.list[6].main.temp_min) ? Math.floor(weatherData.list[8].main.temp_max) + "°F | " + Math.floor(weatherData.list[6].main.temp_min) + "°F" : Math.floor(weatherData.list[6].main.temp_min) + "°F | " + Math.floor(weatherData.list[8].main.temp_max) + "°F";
    day2MaxandMin.textContent = Math.floor(weatherData.list[15].main.temp_max) > Math.floor(weatherData.list[18].main.temp_min) ? Math.floor(weatherData.list[15].main.temp_max) + "°F | " + Math.floor(weatherData.list[18].main.temp_min) + "°F" : Math.floor(weatherData.list[18].main.temp_min) + "°F | " + Math.floor(weatherData.list[15].main.temp_max) + "°F";
    day3MaxandMin.textContent = Math.floor(weatherData.list[27].main.temp_max) > Math.floor(weatherData.list[22].main.temp_min) ? Math.floor(weatherData.list[27].main.temp_max) + "°F | " + Math.floor(weatherData.list[22].main.temp_min) + "°F" : Math.floor(weatherData.list[22].main.temp_min) + "°F | " + Math.floor(weatherData.list[27].main.temp_max) + "°F";
    day4MaxandMin.textContent = Math.floor(weatherData.list[32].main.temp_max) > Math.floor(weatherData.list[29].main.temp_min) ? Math.floor(weatherData.list[32].main.temp_max) + "°F | " + Math.floor(weatherData.list[29].main.temp_min) + "°F" : Math.floor(weatherData.list[29].main.temp_min) + "°F | " + Math.floor(weatherData.list[32].main.temp_max) + "°F";
    day5MaxandMin.textContent = Math.floor(weatherData.list[39].main.temp_max) > Math.floor(weatherData.list[36].main.temp_min) ? Math.floor(weatherData.list[39].main.temp_max) + "°F | " + Math.floor(weatherData.list[36].main.temp_min) + "°F" : Math.floor(weatherData.list[36].main.temp_min) + "°F | " + Math.floor(weatherData.list[39].main.temp_max) + "°F";


    weatherIcon.classList.add(colorIcon(currentCityData.weather[0].icon));
    morningIcon.classList.add(colorIcon(weatherData.list[0].weather[0].icon));
    noonIcon.classList.add(colorIcon(weatherData.list[1].weather[0].icon));
    nightIcon.classList.add(colorIcon(weatherData.list[2].weather[0].icon, true));

}

let modal = new bootstrap.Modal(document.getElementById("modal"));
searchBtn.addEventListener('click', async function (e) {
    // 
    try {

        await SearchCityApi(userInput.value);
    } catch (error) {
        modal.show()
    }
});


// day / night mode variable to change , add/remove classes
let dayModeBtn = document.getElementById("dayModeBtn");
let darkModeBtn = document.getElementById("darkModeBtn");
let dayMode = document.getElementById("dayMode");
let nightMode = document.getElementById("nightMode");
let navbarColor = document.getElementById("navbarColor");
let navTitle = document.getElementById("navTitle");
let darkCurrLocation = document.getElementById("darkCurrLocation");
let darkCurrTimes = document.getElementById("darkCurrTimes");
let morningTime = document.getElementById("morningTime");
let noonTime = document.getElementById("noonTime");
let nightTime = document.getElementById("nightTime");
let date1Box = document.getElementById("date1Box");
let date2Box = document.getElementById("date2Box");
let date3Box = document.getElementById("date3Box");
let date4Box = document.getElementById("date4Box");
let date5Box = document.getElementById("date5Box");
let openFavorites = document.getElementById("openFavorites");
let darkBG = document.getElementById("darkBG");
let offcanvas = document.getElementById("offcanvas");
let offcanvasLabel = document.getElementById("offcanvasLabel");
let modalStyle = document.getElementById("modalStyle");
let whoops = document.getElementById("whoops");
let tryAgain = document.getElementById("tryAgain");


// click day/sun button and changes to dark mode
dayModeBtn.addEventListener('click', function (e) {
    darkMode = !darkMode;
    // if (darkMode) {
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
        date1Box.classList.add('darktransBG');
        date1Box.classList.add('white-font');
        date2Box.classList.add('darktransBG');
        date2Box.classList.add('white-font');
        date3Box.classList.add('darktransBG');
        date3Box.classList.add('white-font');
        date4Box.classList.add('darktransBG');
        date4Box.classList.add('white-font');
        date5Box.classList.add('darktransBG');
        date5Box.classList.add('white-font');
        day1icon.classList.add('white-font');
        day2icon.classList.add('white-font');
        day3icon.classList.add('white-font');
        day4icon.classList.add('white-font');
        day5icon.classList.add('white-font');
        openFavorites.classList.add('darkModeColor');
        openFavorites.classList.add('white-font');
        darkBG.classList.remove('BGImg');
        darkBG.classList.add('grayscale');
        dayMode.classList.add('d-none');
        nightMode.classList.remove('d-none');
        darkModeBtn.src = "../assets/moonimage.png";
        darkModeBtn.classList.remove('d-none');
        offcanvas.classList.add('selectedDarkBG');
        offcanvas.classList.remove('favoritesOpacity');
        offcanvasLabel.classList.add('white-font');
        closeOffCanvasBtn.classList.add('btn-close-white');
        modalStyle.classList.add('darkModeColor');
        whoops.classList.add('white-font');
        tryAgain.classList.add('white-font');

        
        if(darkMode ){
            let selectedDark = document.getElementById("selectedDark");
            let morningForecast = document.getElementById("morningForecast");
            let noonForecast = document.getElementById("noonForecast");
            let nightForecast = document.getElementById("nightForecast");
            let darkCityRow = document.getElementById("darkCityRow");
            let minusIcon = document.getElementById("minusIcon");
            let cityTextDM = document.getElementById("cityTextDM");


            if(selectedDark){
                // diffTimeForecast.classList.add('white-font');
                selectedDark.className = "col selectedDarkBG white-font border-rad opacity py-4 px-5 mb-4 remove-margin";
                // date1AMTemp.classList.add('white-font');
                morningForecast.classList.add('darkTimeText');
                noonForecast.classList.add('darkTimeText');
                nightForecast.classList.add('darkTimeText');
            }
        }
        // console.log(selectedDark);
    // }
    
});

darkModeBtn.addEventListener('click', function(e){
    darkMode = !darkMode;

   
        navbarColor.classList.remove('darkModeColor');
        navbarColor.classList.add('nav-style');
        userInput.classList.add('box-shadow');
        navTitle.classList.remove('darkModeTitle');
        darkCurrLocation.classList.remove('darkModeColor');
        darkCurrLocation.classList.remove('white-font');
        darkCurrTimes.classList.remove('darkModeColor');
        darkCurrTimes.classList.remove('white-font');
        morningTime.classList.remove('white-font');
        noonTime.classList.remove('white-font');
        nightTime.classList.remove('white-font');
        todayAMTemp.classList.remove('white-font');
        todayNoonTemp.classList.remove('white-font');
        todayPMTemp.classList.remove('white-font');
        date1Box.classList.remove('darktransBG');
        date1Box.classList.remove('white-font');
        date2Box.classList.remove('darktransBG');
        date2Box.classList.remove('white-font');
        date3Box.classList.remove('darktransBG');
        date3Box.classList.remove('white-font');
        date4Box.classList.remove('darktransBG');
        date4Box.classList.remove('white-font');
        date5Box.classList.remove('darktransBG');
        date5Box.classList.remove('white-font');
        day1icon.classList.remove('white-font');
        day2icon.classList.remove('white-font');
        day3icon.classList.remove('white-font');
        day4icon.classList.remove('white-font');
        day5icon.classList.remove('white-font');
        openFavorites.classList.remove('darkModeColor');
        openFavorites.classList.remove('white-font');
        darkBG.classList.add('BGImg');
        darkBG.classList.remove('grayscale');
        nightMode.classList.add('d-none');
        dayMode.classList.remove('d-none');
        dayModeBtn.src = "../assets/croppedyellow.png";
        dayModeBtn.classList.add('croppedSun');
        // offcanvas.classList.remove('selectedDarkBG');
        offcanvas.classList.add('favoritesOpacity');
        offcanvasLabel.classList.remove('white-font');
        closeOffCanvasBtn.classList.remove('btn-close-white');
        modalStyle.classList.remove('darkModeColor');
        whoops.classList.remove('white-font');
        tryAgain.classList.remove('white-font');
           
        if(!darkMode){
            let selectedDark = document.getElementById("selectedDark");
            let morningForecast = document.getElementById("morningForecast");
            let noonForecast = document.getElementById("noonForecast");
            let nightForecast = document.getElementById("nightForecast");
            let darkCityRow = document.getElementById("darkCityRow");
            if(darkCityRow){
                selectedDark.classList.add('black');
            }
            if(selectedDark)
            {
                // diffTimeForecast.classList.add('white-font');
                selectedDark.className = "col bgOpacity white-font border-rad opacity py-4 px-5 mb-4 remove-margin";
                morningForecast.classList.remove('darkTimeText');
                noonForecast.classList.add('darkTimeText');
                nightForecast.classList.add('darkTimeText');
            }
        }
});

// let futureTimes = document.getElementById("futureTimes");
let active = false;
let inactive = false;

// const currentTime = currentData.dt
// console.log(new Date(currentTime * 1000));

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

date1Box.addEventListener('click', function (e) {
    date1Box.classList.add("bgOpacity");
    active = !active;
    inactive = false;
    OtherDatesInfo(darkMode);
    let futureDate1 = document.getElementById("futureDate1");
    let future1Desc = document.getElementById("future1Desc");
    let morning1Icon = document.getElementById("morning1Icon");
    let noon1Icon = document.getElementById("noon1Icon");
    let night1Icon = document.getElementById("night1Icon");
    let date1AMTemp = document.getElementById("date1AMTemp");
    let date1Noon = document.getElementById("date1Noon");
    let date1PM = document.getElementById("date1PM");
    let container = document.getElementById("remove");

    const day1Time = new Date(weatherData.list[7].dt * 1000);
    const dayofWeek = daysOfWeek[day1Time.getUTCDay()];
    console.log(dayofWeek);

    futureDate1.textContent = dayofWeek.toUpperCase();
    future1Desc.textContent = weatherData.list[6].weather[0].description;
    morning1Icon.textContent = weatherIconCode(weatherData.list[6].weather[0].icon);
    noon1Icon.textContent = weatherIconCode(weatherData.list[7].weather[0].icon);
    night1Icon.textContent = weatherIconCode(weatherData.list[8].weather[0].icon, 'night');
    morning1Icon.classList.add(colorIcon(weatherData.list[6].weather[0].icon));
    noon1Icon.classList.add(colorIcon(weatherData.list[7].weather[0].icon));
    night1Icon.classList.add(colorIcon(weatherData.list[8].weather[0].icon, true));

    date1AMTemp.textContent = Math.floor(weatherData.list[6].main.temp) + "°";
    date1Noon.textContent = Math.floor(weatherData.list[7].main.temp) + "°";
    date1PM.textContent = Math.floor(weatherData.list[8].main.temp) + "°";


    if (!active) {
        container.remove();
        date1Box.classList.remove("bgOpacity");
    }
    // night1Icon.className = `${colorIcon(weatherData.list[6].weather[0].icon, true) } iconFont curr-times-font`;


});

date2Box.addEventListener('click', function (e) {
    date2Box.classList.add("bgOpacity");
    inactive = !inactive;
    active = false;
    OtherDatesInfo(darkMode);
    let futureDate1 = document.getElementById("futureDate1");
    let future1Desc = document.getElementById("future1Desc");
    let morning1Icon = document.getElementById("morning1Icon");
    let noon1Icon = document.getElementById("noon1Icon");
    let night1Icon = document.getElementById("night1Icon");
    let date1AMTemp = document.getElementById("date1AMTemp");
    let date1Noon = document.getElementById("date1Noon");
    let date1PM = document.getElementById("date1PM");
    let container = document.getElementById("remove");

    const day1Time = new Date(weatherData.list[15].dt * 1000);
    const dayofWeek = daysOfWeek[day1Time.getUTCDay()];

    futureDate1.textContent = dayofWeek.toUpperCase();
    future1Desc.textContent = weatherData.list[13].weather[0].description;
    morning1Icon.textContent = weatherIconCode(weatherData.list[13].weather[0].icon);
    noon1Icon.textContent = weatherIconCode(weatherData.list[14].weather[0].icon);
    night1Icon.textContent = weatherIconCode(weatherData.list[15].weather[0].icon, 'night');
    morning1Icon.classList.add(colorIcon(weatherData.list[13].weather[0].icon));
    noon1Icon.classList.add(colorIcon(weatherData.list[14].weather[0].icon));
    night1Icon.classList.add(colorIcon(weatherData.list[15].weather[0].icon, true));

    date1AMTemp.textContent = Math.floor(weatherData.list[13].main.temp) + "°";
    date1Noon.textContent = Math.floor(weatherData.list[14].main.temp) + "°";
    date1PM.textContent = Math.floor(weatherData.list[15].main.temp) + "°";

    if (!inactive) {
        container.remove();
        date2Box.classList.remove("bgOpacity");
    }
});

date3Box.addEventListener('click', function (e) {
    date3Box.classList.add("bgOpacity");
    inactive = !inactive;
    active = false;
    OtherDatesInfo(darkMode);
    let futureDate1 = document.getElementById("futureDate1");
    let future1Desc = document.getElementById("future1Desc");
    let morning1Icon = document.getElementById("morning1Icon");
    let noon1Icon = document.getElementById("noon1Icon");
    let night1Icon = document.getElementById("night1Icon");
    let date1AMTemp = document.getElementById("date1AMTemp");
    let date1Noon = document.getElementById("date1Noon");
    let date1PM = document.getElementById("date1PM");
    let container = document.getElementById("remove");

    const day1Time = new Date(weatherData.list[19].dt * 1000);
    const dayofWeek = daysOfWeek[day1Time.getUTCDay()];

    futureDate1.textContent = dayofWeek.toUpperCase();
    future1Desc.textContent = weatherData.list[20].weather[0].description;
    morning1Icon.textContent = weatherIconCode(weatherData.list[20].weather[0].icon);
    noon1Icon.textContent = weatherIconCode(weatherData.list[21].weather[0].icon);
    night1Icon.textContent = weatherIconCode(weatherData.list[22].weather[0].icon, 'night');
    morning1Icon.classList.add(colorIcon(weatherData.list[20].weather[0].icon));
    noon1Icon.classList.add(colorIcon(weatherData.list[21].weather[0].icon));
    night1Icon.classList.add(colorIcon(weatherData.list[22].weather[0].icon, true));

    date1AMTemp.textContent = Math.floor(weatherData.list[20].main.temp) + "°";
    date1Noon.textContent = Math.floor(weatherData.list[21].main.temp) + "°";
    date1PM.textContent = Math.floor(weatherData.list[22].main.temp) + "°";

    if (!inactive) {
        container.remove();
        date3Box.classList.remove("bgOpacity");
    }
});

date4Box.addEventListener('click', function (e) {
    date4Box.classList.add("bgOpacity");
    inactive = !inactive;
    active = false;
    OtherDatesInfo(darkMode);
    let futureDate1 = document.getElementById("futureDate1");
    let future1Desc = document.getElementById("future1Desc");
    let morning1Icon = document.getElementById("morning1Icon");
    let noon1Icon = document.getElementById("noon1Icon");
    let night1Icon = document.getElementById("night1Icon");
    let date1AMTemp = document.getElementById("date1AMTemp");
    let date1Noon = document.getElementById("date1Noon");
    let date1PM = document.getElementById("date1PM");
    let container = document.getElementById("remove");

    const day1Time = new Date(weatherData.list[26].dt * 1000);
    const dayofWeek = daysOfWeek[day1Time.getUTCDay()];

    futureDate1.textContent = dayofWeek.toUpperCase();
    future1Desc.textContent = weatherData.list[26].weather[0].description;
    morning1Icon.textContent = weatherIconCode(weatherData.list[26].weather[0].icon);
    noon1Icon.textContent = weatherIconCode(weatherData.list[27].weather[0].icon);
    night1Icon.textContent = weatherIconCode(weatherData.list[28].weather[0].icon, 'night');
    morning1Icon.classList.add(colorIcon(weatherData.list[26].weather[0].icon));
    noon1Icon.classList.add(colorIcon(weatherData.list[27].weather[0].icon));
    night1Icon.classList.add(colorIcon(weatherData.list[28].weather[0].icon, true));

    date1AMTemp.textContent = Math.floor(weatherData.list[26].main.temp) + "°";
    date1Noon.textContent = Math.floor(weatherData.list[27].main.temp) + "°";
    date1PM.textContent = Math.floor(weatherData.list[28].main.temp) + "°";

    if (!inactive) {
        container.remove();
        date4Box.classList.remove("bgOpacity");
    }
});

date5Box.addEventListener('click', function (e) {
    date5Box.classList.add("bgOpacity");
    inactive = !inactive;
    active = false;
    OtherDatesInfo(darkMode);
    let futureDate1 = document.getElementById("futureDate1");
    let future1Desc = document.getElementById("future1Desc");
    let morning1Icon = document.getElementById("morning1Icon");
    let noon1Icon = document.getElementById("noon1Icon");
    let night1Icon = document.getElementById("night1Icon");
    let date1AMTemp = document.getElementById("date1AMTemp");
    let date1Noon = document.getElementById("date1Noon");
    let date1PM = document.getElementById("date1PM");
    let container = document.getElementById("remove");

    const day1Time = new Date(weatherData.list[35].dt * 1000);
    const dayofWeek = daysOfWeek[day1Time.getUTCDay()];

    futureDate1.textContent = dayofWeek.toUpperCase();
    future1Desc.textContent = weatherData.list[33].weather[0].description;
    morning1Icon.textContent = weatherIconCode(weatherData.list[33].weather[0].icon);
    noon1Icon.textContent = weatherIconCode(weatherData.list[34].weather[0].icon);
    night1Icon.textContent = weatherIconCode(weatherData.list[35].weather[0].icon, 'night');
    morning1Icon.classList.add(colorIcon(weatherData.list[33].weather[0].icon));
    noon1Icon.classList.add(colorIcon(weatherData.list[34].weather[0].icon));
    night1Icon.classList.add(colorIcon(weatherData.list[35].weather[0].icon, true));

    date1AMTemp.textContent = Math.floor(weatherData.list[33].main.temp) + "°F";
    date1Noon.textContent = Math.floor(weatherData.list[34].main.temp) + "°";
    date1PM.textContent = Math.floor(weatherData.list[35].main.temp) + "°";

    if (!inactive) {
        container.remove();
        date5Box.classList.remove("bgOpacity");
    }
});


let favoritesBtn = document.getElementById("favoritesBtn");
let favArray = []
if (localStorage.getItem("cities")) {
    favArray = JSON.parse(localStorage.getItem("cities"));
}


favoritesBtn.addEventListener('click', function (e) {
    if (favArray.includes(cityName.textContent)) {
        // If fav array already includes the city name, we want to remove the city from local storage
        // indexOf is getting the index of the city's name
        // at that index, it is splicing and removing it
        // also changes the src of the button to a outlined heart
        let index = favArray.indexOf(cityName.textContent);
        favArray.splice(index, 1);
        favoritesBtn.src = "../assets/heartoutline.png";
    } else {
        // if city is NOT in fav array, then we push the city to fav array
        // the button image src is changed to filled heart
        favArray.push(cityName.textContent);
        favoritesBtn.src = "../assets/heartfilled.png";
    }
    localStorage.setItem("cities", JSON.stringify(favArray));
});

// assigned inject instead of city component because cityComponent is our WHOLE offcanvas and I only want to target the body, so not the title nor the close button
let inject = document.getElementById('inject');
let closeOffCanvasBtn = document.getElementById('closeOffCanvasBtn');
openFavorites.addEventListener('click', function (e) {
    inject.innerHTML = "";
    // once you open favorite, we don't want the favorite cities to duplicate, thus we reset innerHTML with ""
    // if favArray is greater than 0, for each city, our cityComponent function is called, which is creating the element to showcase each city. We are appending cityComponent to the parent inject because inject is the div/area that's below the title and close button.
    if (favArray.length > 0) {
        favArray.forEach(city => {
            let cityComponent = OffCanvasCity(city);
            inject.appendChild(cityComponent);
        }
        )
    }
});

closeOffCanvasBtn.addEventListener("click", function (e) {
    inject.innerHTML = "";
});

// This function is to remove a city in our favorite's offcanvas
// exported and imported to elements.js
function removeFav(cityName) {
    // indexOf is finding the index position where the value lies in the array
    let index = favArray.indexOf(cityName);
    favArray.splice(index, 1);
    localStorage.setItem("cities", JSON.stringify(favArray));
}