export const randomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const round = (n: number, d: number) =>
  Number(Math.round(Number(n + "e" + d)) + "e-" + d);
