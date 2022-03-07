const getUSDate = () => {
  const d = new Date();
  return d.toLocaleString('en-US', { timeZone: 'America/New_York' });
};
// * : for Chart
const formatUSDate = (unixTime: number) =>
  new Date(unixTime).toLocaleString('en-GB', { timeZone: 'UTC' });

export const formatDate = (
  unixTime?: number
): {
  year: string;
  month: string;
} => {
  // * : for Chart
  if (unixTime) {
    const [day, month, year] = formatUSDate(unixTime).slice(0, 10).split('/');
    return { year, month: `${month}-${day}` };
  }
  const [month, day, year] = getUSDate().split(',')[0].split('/');
  return { year, month: `${month}-${day}` };
};

export const formatTime = () => {
  const [hh, mm, ss] = getUSDate().split(' ')[1].split(':').map(Number);
  return { hh, mm, ss };
};
const USTime = formatTime();
export const KRTime = new Date().toTimeString().split(' ')[0];

// * : 장외거래 가격 있으나 거래 시간으로 closed 표시
export const USMarketClosed =
  USTime.hh < 9 || USTime.hh >= 16 || (USTime.hh === 9 && USTime.mm < 30)
    ? 'closed'
    : 'open';

export const marketTime = USMarketClosed ? 'closed' : KRTime;
