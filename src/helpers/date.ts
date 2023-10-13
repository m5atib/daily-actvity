export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const MILLISECONDS_IN_ONE_DAY = 86400000;

export const daysDiff = (firstDate: Date, secondDate: Date): number => {
  const millisecondsDiff = Math.abs(firstDate.getTime() - secondDate.getTime());
  return Math.ceil(millisecondsDiff / MILLISECONDS_IN_ONE_DAY);
};

export const daysOfYear = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const millisecondsDiff = date.getTime() - startOfYear.getTime();
  return Math.floor(millisecondsDiff / MILLISECONDS_IN_ONE_DAY);
};

export const getTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString();
};

export const getCurrentTimeDate = (): string => {
  const now = new Date();
  return now.toString();
};

export const currentTimeInTimezone = (timezone: string): string => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { timeZone: timezone });
};

export const getTimeFromDate = (date: Date): string => {
  return date.toTimeString().slice(0, 8);
};
