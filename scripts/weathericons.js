export function weatherIconCode(code) {

    switch (code) {
        case '01d':
            return '1';
        case '02d':
            return 'A';
        case '03d':
            return 'a';
        case '04d':
            return '3';
        case '09d':
            return 'W';
        case '10d':
            return 'V';
        case '11d':
            return 'Y';
        case '13d':
            return 'I';
        case '50d':
            return 'Z';
        case '01n':
            return '6';
        case '02n':
            return 'a';
        case '03n':
            return 'a';
        case '04n':
            return '3';
        case '09n':
            return 'W';
        case '10d':
            return 'u';
        case '11n':
            return 'y';
        case '13n':
            return 'I';
        case '50n':
            return '!';
        default:
            return 'a';
    }
}

export function colorIcon(icon) {
    switch (icon) {
        case '01d':
            return 'yellow';
        case '02d':
            return 'blue';
        case '03d':
            return 'blue';
        case '04d':
            return 'darkGrayColor';
        case '09d':
            return 'darkGrayColor';
        case '10d':
            return 'blue';
        case '11d':
            return 'darkGrayColor';
        case '13d':
            return 'darkGrayColor';
        case '50d':
            return 'blue';
        case '01n':
            return 'clearNight';
        case '02n':
            return 'purple';
        case '03n':
            return 'purple';
        case '04n':
            return 'darkGrayColor';
        case '09n':
            return 'darkGrayColor';
        case '10n':
            return 'purple';
        case '11n':
            return 'purple';
        case '13n':
            return 'darkGrayColor';
        case '50n':
            return 'purple';
        default:
            return 'darkGrayColor';
    }
}