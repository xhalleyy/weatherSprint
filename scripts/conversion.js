function currentTempConvert (weatherData){
    let currentFahrenheit = (weatherData - 273.15)* (9/5) + 32;
}

function MaxTempConvert (number){
    let maxFahrenheit = (maxTemp - 273.15)* (9/5) + 32;
}

function MinTempConvert (number){
    let minFahrenheit = (minTemp - 273.15)* (9/5) + 32;
}

export {currentTempConvert, MaxTempConvert, MinTempConvert}