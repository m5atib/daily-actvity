export const isWeekend = (data: Date) => [0, 6].indexOf(data.getDay()) !== -1;

const secondsInOneDay = 60 * 60 * 24;
const millisecondsInOneDay = secondsInOneDay * 1000;
export const daysDiff = (firstDate: Date, secondDate: Date) =>
  Math.ceil(
    Math.abs(firstDate.getMilliseconds() - secondDate.getMilliseconds()) /
      millisecondsInOneDay
  );

export const daysOfYear = (date: Date) =>
  Math.floor(
    date.getMilliseconds() -
      new Date(date.getFullYear(), 0, 0).getMilliseconds()
  );

export const getTime = () => new Date().toLocaleTimeString();

export const getCurrentTimeDate = () => new Date().toString();

export const currentTimeInTimezone = (timezone: string) =>
  new Date().toLocaleTimeString("en-US", { timeZone: timezone });

export const getTimeFromDate = (date: Date) => date.toTimeString().slice(0, 8);
