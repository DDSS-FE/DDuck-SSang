import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import { MarketCategory } from 'pages/market/[category]';
import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';
import Spinner from 'components/Spinner';

import useAxios from 'hooks/useAxios';
import { QUOTE_API } from 'utils/config';
import { IParsedResponseInput } from 'utils/stockFetcher';

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

const MarketInfoList = ({
  category,
  realtimeData,
}: {
  category?: MarketCategory;
  realtimeData?: IParsedResponseInput;
}): JSX.Element => {
  const {
    data: marketInfoData,
    loading,
    error,
  } = useAxios<OpenPriceData>(`${QUOTE_API}?category=${category}`);

  return (
    <>
      {loading && <Spinner />}
      {error && (
        <div className="errorMsg">
          <p>마켓 데이터를 가져오는 데 실패했습니다.</p>
          <p> 잠시 후에 다시 시도해주세요.</p>
        </div>
      )}
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
