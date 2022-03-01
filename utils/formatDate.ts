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

export const formatTime = (unixTime: number) => {
  const [hh, mm, ss] = formatUSDate(unixTime)
    .slice(12)
    .split(':')
    .map((t) => +t);
  return { hh, mm, ss };
};

const USTime = formatTime(new Date().getTime());

export const KRTime = new Date().toTimeString().split(' ')[0];

export const USMarketClosed =
  USTime.hh < 9 || USTime.hh >= 16 || (USTime.hh === 9 && USTime.mm < 30)
    ? 'closed'
    : 'open';

export const marketTime = USMarketClosed ? 'closed' : KRTime;
