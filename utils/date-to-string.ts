export const dateToString = (date: string | Date): string =>
  new Date(date).toLocaleString('en-GB', { dateStyle: 'short' });
