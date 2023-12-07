const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();

export { now, hours, minutes }

// Need to change to 12 hour format 

export function formatTime(dateTime, timezone) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit', timeZone: 'UTC', timeZoneName: 'short'
    }; // Adjust timeZoneName as needed
    return new Intl.DateTimeFormat('en-US', options).format(new Date((dateTime * 1000) + (timezone * 1000)));
}
