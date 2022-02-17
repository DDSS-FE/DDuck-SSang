export interface MarketInfoSummary {
  previousClose: number;
  dayLow: number;
  dayHigh: number;
  open: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  volume: number;
  marketCap: number;
  dividendRate: number;
  averageVolume: number;
  beta: number;
}

export interface MarketInfoProps {
  data: {
    summaryDetail: MarketInfoSummary;
  };
}
