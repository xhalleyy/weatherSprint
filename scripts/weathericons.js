function weatherIconCode(){
    
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
    case '03d':
        return 'a';
    case '04d':
        return '3';
    case '09d':
        return 'W';
    case '10d':
        return 'u';
    case '11d':
        return 'y';
    case '13d':
        return 'I';
    case '50d':
        return 'Z';
    default: 
        return 'a';
    }
}