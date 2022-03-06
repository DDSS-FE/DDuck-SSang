import { useEffect, useState } from 'react';
import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import { MarketCategoryProps } from 'pages/market/[category]';
import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';
import Spinner from 'components/Spinner';

import useAxios from 'hooks/useAxios';
import { QUOTE_API } from 'utils/config';
import { getStocks, IParsedResponseInput } from 'utils/stockFetcher';

type MarketInfoData = MarketInfo[];

interface MarketInfo {
  id: number;
  name: string;
  symbol: string;
  c: number; // current
  d: number; // change
  dp: number; // percent change
}

export interface IRealtimeDataItem {
  c: number | null;
  p: number;
  s: string;
  t: number;
  v: number;
}
export interface IRealtimeData {
  data: IRealtimeDataItem[];
  indicesToFetch: string[];
  period: number;
  timeFrame: number[] | string;
}

const MarketInfoList = ({ category }: MarketCategoryProps): JSX.Element => {
  const { data, loading } = useAxios<MarketInfoData>(
    `${QUOTE_API}?category=${category}`
  );

  const [timeFrame] = useState([new Date(), Infinity]);
  const [period] = useState(1500);
  const [realtimeData, setRealtimeData] = useState<IParsedResponseInput>();

  useEffect(() => {
    getStocks(setRealtimeData, {
      indicesToFetch: [
        'BINANCE:BTCUSDT',
        'BINANCE:ETHUSDT',
        'BINANCE:BNBUSDT',
        'BINANCE:XRPUSDT',
        'BINANCE:ADAUSDT',
        'BINANCE:LUNAUSDT',
        'BINANCE:AVAXUSDT',
        'BINANCE:DOGEUSDT',
      ],
      timeFrame,
      period,
    });
  }, [timeFrame, period]);

  return (
    <>
      {loading && <Spinner />}
      {data && (
        <ul className={styles.bl_vertMarketInfo}>
          {data.map((d) => (
            <MarketInfoListItem
              key={d.id}
              category={category}
              {...d}
              realtimeData={realtimeData}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default MarketInfoList;
