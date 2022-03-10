import { useEffect, useState } from 'react';
import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import { MarketCategoryProps } from 'pages/market/[category]';
import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';
import Spinner from 'components/Spinner';

import useAxios from 'hooks/useAxios';
import { QUOTE_API } from 'utils/config';
import { getStocks, IParsedResponseInput } from 'utils/stockFetcher';
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
  const [timeFrame] = useState([new Date(), Infinity]);
  const [period] = useState(1500);
  const [realtimeData, setRealtimeData] = useState<IParsedResponseInput>();

  useEffect(() => {
    getStocks(setRealtimeData, {
      indicesToFetch: symbolList[category],
      timeFrame,
      period,
    });
  }, [timeFrame, period, category]);

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
