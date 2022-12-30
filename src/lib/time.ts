export function getTimeString(time: Date) {
    const hours = padTimeDivision(time.getHours());
    const minutes = padTimeDivision(time.getMinutes());
    const seconds = padTimeDivision(time.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
}

function padTimeDivision(timeDivision: number): string {
    return ("0" + timeDivision.toString()).slice(-2);
}