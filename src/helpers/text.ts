import { randomNumber } from "./number";

export const extractEmailDomain = (email: string): string => {
  const parts = email.split("@");
  return parts.length === 2 ? parts[1] : "";
};

export const truncate = (value: string, length: number = 15): string => {
  return value.length < length ? value : `..${value.slice(0, length - 3)}`;
};

const URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export const isURL = (url: string): boolean => {
  return URL_REGEX.test(url);
};

export const trunc = (value: string): string => {
  const length = randomNumber(8, 20);
  return value.length < length ? value : `..${value.slice(0, length - 3)}`;
};
