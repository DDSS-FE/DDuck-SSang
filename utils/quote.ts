export const formatChange = (change: number) =>
  change > 0 ? `+${change}` : change;

export const symbolList = {
  stock: ['AAPL', 'TSLA', 'NVDA', 'AMD', 'MSFT', 'AMZN', 'FB', 'BABA'],
  crypto: [
    'BINANCE:BTCUSDT',
    'BINANCE:ETHUSDT',
    'BINANCE:BNBUSDT',
    'BINANCE:XRPUSDT',
    'BINANCE:ADAUSDT',
    'BINANCE:LUNAUSDT',
    'BINANCE:AVAXUSDT',
    'BINANCE:DOGEUSDT',
  ],
};

interface IStrObj {
  [key: string]: string; // ⭐ index signature
}

export const symbolToName: IStrObj = {
  AAPL: '애플',
  TSLA: '테슬라',
  NVDA: '엔비디아',
  AMD: 'AMD',
  MSFT: '마이크로소프트',
  AMZN: '아마존닷컴',
  FB: '메타',
  BABA: '알리바바 ADR',
  'BINANCE:BTCUSDT': '비트코인',
  'BINANCE:ETHUSDT': '이더리움',
  'BINANCE:BNBUSDT': '바이낸스코인',
  'BINANCE:XRPUSDT': '리플',
  'BINANCE:ADAUSDT': '에이다',
  'BINANCE:LUNAUSDT': '루나',
  'BINANCE:AVAXUSDT': '아발란체',
  'BINANCE:DOGEUSDT': '도지코인',
};
