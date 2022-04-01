import { useEffect, useState } from 'react';
import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import { MarketCategoryProps } from 'pages/market/[category]';
import { MarketInfoListItem } from 'components/MarketInfoList';
import { Spinner } from 'components/Spinner';

import useAxios from 'hooks/useAxios';
import { QUOTE_API } from 'utils/config';
import { getStocks, IParsedResponseInput } from 'utils/getStocks';
import { symbolList } from 'utils/quote';

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

export interface OpenPriceData {
  data: OpenPriceDataItem[];
}

export interface OpenPriceDataItem {
  d: number;
  dp: number;
  c: number;
  id: number;
  symbol: string;
}

const MarketInfoList = ({ category }: MarketCategoryProps): JSX.Element => {
  const { data: marketInfoData, loading } = useAxios<OpenPriceData>(
    `${QUOTE_API}?category=${category}`
  );
  const [realtimeData, setRealtimeData] = useState<IParsedResponseInput>();

  useEffect(() => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`
    );
    getStocks(socket, setRealtimeData, {
      indicesToFetch: symbolList[category],
      timeFrame: [new Date(), Infinity],
      period: 1000,
    });
    return () => {
      socket.close();
    };
  }, [category]);

  console.log(realtimeData);

  return (
    <>
      {loading && <Spinner />}
      {marketInfoData && (
        <ul className={styles.bl_vertMarketInfo}>
          {marketInfoData.data.map((d) => (
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
