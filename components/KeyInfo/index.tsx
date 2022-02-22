import styles from 'components/KeyInfo/KeyInfo.module.scss';

import { MARKET_INFO_API } from 'utils/config';
import useAxios from 'hooks/useAxios';
import Spinner from 'components/Spinner';

interface MarketInfoSummary {
  dayLow: number;
  dayHigh: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  previousClose: number;
  open: number;
  volume: number;
  averageVolume: number;
}

export const KeyInfo = ({ symbol }: { symbol: string }): JSX.Element => {
  const { data: summaryDetail, loading } = useAxios<MarketInfoSummary>(
    `${MARKET_INFO_API}?symbol=${symbol}`
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ul className={styles.bl_keyInfo} data-testid="KeyInfo-component">
          <li>
            <p>일일 변동폭</p>
            <p>
              {summaryDetail?.dayLow} ~ {summaryDetail?.dayHigh}
            </p>
          </li>
          <li>
            <p>52주 가격 변동폭</p>
            <p>
              {summaryDetail?.fiftyTwoWeekLow} ~{' '}
              {summaryDetail?.fiftyTwoWeekHigh}
            </p>
          </li>
          <li>
            <p>이전 종가</p>
            <p>{summaryDetail?.previousClose}</p>
          </li>
          <li>
            <p>시가</p>
            <p>{summaryDetail?.open}</p>
          </li>
          <li>
            <p>거래량</p>
            <p>{summaryDetail?.volume}</p>
          </li>
          <li>
            <p>평균 거래량</p>
            <p>{summaryDetail?.averageVolume}</p>
          </li>
        </ul>
      )}
    </>
  );
};

export default KeyInfo;
