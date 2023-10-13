export const randomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const round = (n: number, d: number): number => {
  return Number(Math.round(Number(n + "e" + d)) + "e-" + d);
};
