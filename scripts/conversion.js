export { formatTime }

// Need to change to 12 hour format 

function formatTime(dateTime, timezone) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC', 
        timeZoneName: 'short'
    }; // Adjust timeZoneName as needed
    return new Intl.DateTimeFormat('en-US', options).format(new Date((dateTime * 1000) + (timezone * 1000)));
}
