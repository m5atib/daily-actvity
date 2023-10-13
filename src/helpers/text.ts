import { randomNumber } from "./number";

export const extractEmailDomain = (email: string) => email.split("@")[1];

export const truncate = (value: string, length: number = 15) =>
  value.length < length ? value : `..${value.slice(0, length - 3)}`;

const URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export const isURL = (url: string) => URL_REGEX.test(url);

export const trunc = (value: string) => {
  const length = randomNumber(8, 20);
  return value.length < length ? value : `..${value.slice(0, length - 3)}`;
};
