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
      {loading && <Spinner />}
      {summaryDetail && (
        <dl className={styles.bl_keyInfo} data-testid="KeyInfo-component">
          <div className={styles.bl_keyInfo_item}>
            <dt>일일 변동폭</dt>
            <dd data-testid="dayLowHigh">
              {summaryDetail.dayLow} ~ {summaryDetail.dayHigh}
            </dd>
          </div>
          <div className={styles.bl_keyInfo_item}>
            <dt>52주 가격 변동폭</dt>
            <dd data-testid="fiftyTwoWeekLowHigh">
              {summaryDetail.fiftyTwoWeekLow} ~ {summaryDetail.fiftyTwoWeekHigh}
            </dd>
          </div>
          <div className={styles.bl_keyInfo_item}>
            <dt>이전 종가</dt>
            <dd data-testid="previousClose">{summaryDetail.previousClose}</dd>
          </div>
          <div className={styles.bl_keyInfo_item}>
            <dt>시가</dt>
            <dd data-testid="open">{summaryDetail.open}</dd>
          </div>
          <div className={styles.bl_keyInfo_item}>
            <dt>거래량</dt>
            <dd data-testid="volume">{summaryDetail.volume}</dd>
          </div>
          <div className={styles.bl_keyInfo_item}>
            <dt>평균 거래량</dt>
            <dd data-testid="averageVolume">{summaryDetail.averageVolume}</dd>
          </div>
        </dl>
      )}
    </>
  );
};

export default KeyInfo;
