import styles from 'components/KeyInfo/KeyInfo.module.scss';

import { MarketInfoProps } from 'utils/market/types';
import { formatDecimal } from 'utils/formatDate';

export const KeyInfo = ({ data }: MarketInfoProps): JSX.Element => {
  const {
    summaryDetail: {
      dayLow,
      dayHigh,
      fiftyTwoWeekLow,
      fiftyTwoWeekHigh,
      previousClose,
      open,
      volume,
      averageVolume,
    },
  } = data;
  return (
    <ul className={styles.bl_keyInfo}>
      <li>
        <p>일일 변동폭</p>
        <p>
          {formatDecimal(dayLow)} ~ {formatDecimal(dayHigh)}
        </p>
      </li>
      <li>
        <p>52주 가격 변동폭</p>
        <p>
          {formatDecimal(fiftyTwoWeekLow)} ~ {formatDecimal(fiftyTwoWeekHigh)}
        </p>
      </li>
      <li>
        <p>이전 종가</p>
        <p>{formatDecimal(previousClose)}</p>
      </li>
      <li>
        <p>시가</p>
        <p>{formatDecimal(open)}</p>
      </li>
      <li>
        <p>거래량</p>
        <p>{volume.toLocaleString()}</p>
      </li>
      <li>
        <p>평균 거래량</p>
        <p>{averageVolume.toLocaleString()}</p>
      </li>
      {/* 
      이곳에 들어가는 데이터는 어디서 가져와야 할 지 논의 필요
      <li>
        <p># 구성종목</p>
        <p>91.53 ~ 168.59</p>
      </li> */}
      {/* <li>
        <p>1년 변동률</p>
        <p>91.53 ~ 168.59</p>
      </li> */}
    </ul>
  );
};

export default KeyInfo;
