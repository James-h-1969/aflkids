// function to return the date at start of week
export function getStartOfWeek(date: Date): Date{
    const diff = (date.getDay() + 6) % 7; // Adjust to Monday (considering Sunday as 0)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
    return startOfWeek;
}

// function to add n days to a date
export function addDaysToDate(date: Date, dayDelta: number): Date{
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + dayDelta);
    return newDate;
}