export { weatherIconCode, colorIcon}

function weatherIconCode(code, time) {

    switch (code) {
        case '01d':
            return time != 'night' ? '1' : '6';
        case '02d':
            return time!= 'night' ? 'A': 'a';
        case '03d':
            return  'a';
        case '04d':
            return  '3';
        case '09d':
            return 'W';
        case '10d':
            return time != 'night' ? 'V' : 'u';
        case '11d':
            return time != 'night' ? 'Y' : 'y';
        case '13d':
            return 'I';
        case '50d':
            return time != 'night' ? 'Z' : '!';
        
        case '01n':
            return time == 'night' ? '6' : '1';
        case '02n':
            return time == 'night' ? 'a' : 'A' ;
        case '03n':
            return 'a';
        case '04n':
            return '3';
        case '09n':
            return 'W';
        case '10n':
            return time == 'night' ? 'u' : 'V';
        case '11n':
            return time == 'night' ? 'y' : 'Y';
        case '13n':
            return 'I';
        case '50n':
            return time == 'night' ? '!' : 'Z';
        default:
            return 'a';
    }
}
function colorIcon(icon, night) {
    switch (icon) {
        case '01d':
            return night ? 'clearNight' : 'yellow';
        case '02d':
            return night ? 'purple' : 'blue';
        case '03d':
            return night ? 'purple' : 'blue';
        case '04d':
            return 'lightGrayColor';
        case '09d':
            return 'lightGrayColor';
        case '10d':
            return night ? 'purple' : 'blue';
        case '11d':
            return 'lightGrayColor';
        case '13d':
            return 'lightGrayColor';
        case '50d':
            return night ? 'purple' : 'blue';

        case '01n':
            return night ? 'clearNight' : 'yellow';
        case '02n':
            return night ? 'purple' : "blue";
        case '03n':
            return night ?'purple' : "blue";
        case '04n':
            return 'lightGrayColor';
        case '09n':
            return 'lightGrayColor';
        case '10n':
            return night ?'purple' : "blue";
        case '11n':
            return night ?'purple' : "blue";
        case '13n':
            return 'lightGrayColor';
        case '50n':
            return night ?'purple' : "blue";
        default:
            return 'lightGrayColor';
    }
}