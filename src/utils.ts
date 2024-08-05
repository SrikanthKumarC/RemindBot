export const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
export const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const { format, parse, setHours, setMinutes } = require("date-fns");

const timeObj = { hours: "1", minutes: "0", amorpm: "am" };
type TimeObj = typeof timeObj;

const currentDate = new Date(); // Or use a specific date if needed
type CurrentDate = typeof currentDate;


export function combineDateAndTime(timeObj: TimeObj, currentDate: CurrentDate): Date {
  // Convert hours to 24-hour format
  let hours = parseInt(timeObj.hours);
  const minutes = parseInt(timeObj.minutes);
  const isPM = timeObj.amorpm.toLowerCase() === "pm";

  if (isPM && hours !== 12) {
    hours += 12;
  } else if (!isPM && hours === 12) {
    hours = 0;
  }

  // Combine the current date with the provided time
  let combinedDate = setHours(currentDate, hours);
  combinedDate = setMinutes(combinedDate, minutes);
  return combinedDate;
}

