import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import { MarketCategory } from 'pages/market/[category]';

import { KRTime, USMarketClosed, marketTime } from 'utils/formatDate';
import { IParsedResponseInput } from 'utils/stockFetcher';
import { symbolToName } from 'utils/quote';

export interface Props {
  category?: MarketCategory;
  symbol: string;
  name?: string;
  c: number;
  d: number;
  dp: number;
  realtimeData?: IParsedResponseInput;
}

const MarketInfoListItem = ({
  category,
  symbol,
  c,
  d,
  dp,
  realtimeData,
}: Props): JSX.Element => {
  const [newC, setNewC] = useState(c);
  const [newD, setNewD] = useState(dp);
  const [newDP, setNewDP] = useState(d);

  useEffect(() => {
    if (realtimeData) {
      const checkForUpdate = realtimeData?.data?.find(
        (item) => item.s === symbol
      );
      if (checkForUpdate) {
        setNewC(checkForUpdate.p);
        setNewD(checkForUpdate.p - c);
        setNewDP(((checkForUpdate.p - c) / c) * 100);
      }
    }
  }, [realtimeData, c, symbol]);

  return (
    <li
      className={styles.bl_vertMarketInfo_item}
      data-testid={`market-info-list-item`}
    >
      <Link href={`/market/${category}/${symbol}`}>
        <a className={styles.bl_vertMarketInfo_link}>
          <span className={styles.bl_vertMarketInfo_marketInfo}>
            <div className={styles.bl_vertMarketInfo_ttlWrapper}>
              <p className={styles.bl_vertMarketInfo_ttl}>
                {symbolToName[symbol]}
              </p>
              <p className={styles.bl_vertMarketInfo_standard}>
                <FontAwesomeIcon
                  className={clsx(
                    styles.bl_vertMarketInfo_icon,
                    category === 'stock'
                      ? styles[`${USMarketClosed}`]
                      : styles.open
                  )}
                  icon={faClock}
                />
                {category === 'stock'
                  ? `${marketTime} | US`
                  : `${realtimeData?.timeFrame || KRTime} | KR`}
              </p>
            </div>
          </span>
          <span
            className={
              newDP < 0
                ? styles.bl_vertMarketInfo_marketPrice__blue
                : styles.bl_vertMarketInfo_marketPrice__red
            }
          >
            <span className={styles.bl_vertMarketInfo_price}>{newC}</span>
            <p
              className={
                newDP < 0
                  ? styles.bl_vertMarketInfo_fluctuation__blue
                  : styles.bl_vertMarketInfo_fluctuation__red
              }
            >
              {newD.toFixed(3)}({newDP.toFixed(3)}%)
            </p>
          </span>
        </a>
      </Link>
    </li>
  );
};
export default MarketInfoListItem;
