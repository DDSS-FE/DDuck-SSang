const formatUSDate = (unixTime: number) =>
  new Date(unixTime).toLocaleString('en-GB', { timeZone: 'UTC' });

export const formatDate = (
  unixTime: number
): {
  year: string;
  month: string;
} => {
  const [day, month, year] = formatUSDate(unixTime).slice(0, 10).split('/');
  return { year, month: `${month}-${day}` };
};

// export const formatDecimal = (value: number) => value.toFixed(2);
