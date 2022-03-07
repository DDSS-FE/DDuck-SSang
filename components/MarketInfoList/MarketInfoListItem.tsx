import Link from 'next/link';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import { MarketCategory } from 'pages/market/[category]';

import { KRTime, USMarketClosed, marketTime } from 'utils/formatDate';
import { formatChange } from 'utils/quote';

export interface Props {
  category: MarketCategory;
  symbol: string;
  // name: string;
  c: number;
  d: number;
  dp: number;
}

const MarketInfoListItem = ({
  category,
  symbol,
  // name,
  c,
  d,
  dp,
}: Props): JSX.Element => (
  <>
    <li
      className={styles.bl_vertMarketInfo_item}
      data-testid="MarketInfoListItem-component"
    >
      <Link href={`/market/${category}/${symbol}`}>
        <a className={styles.bl_vertMarketInfo_link}>
          <span className={styles.bl_vertMarketInfo_marketInfo}>
            <div className={styles.bl_vertMarketInfo_ttlWrapper}>
              <p className={styles.bl_vertMarketInfo_ttl}>{symbol}</p>
              <p className={styles.bl_vertMarketInfo_standard}>
                <FontAwesomeIcon
                  className={clsx(
                    styles.bl_vertMarketInfo_icon,
                    category !== 'crypto'
                      ? styles[`${USMarketClosed}`]
                      : styles.open
                  )}
                  icon={faClock}
                />
                {category !== 'crypto' ? marketTime : KRTime} | US
              </p>
            </div>
          </span>
          <span className={styles.bl_vertMarketInfo_marketPrice}>
            <p className={styles.bl_vertMarketInfo_price}>{c}</p>
            <p
              className={
                dp > 0
                  ? styles.bl_vertMarketInfo_fluctuation__red
                  : styles.bl_vertMarketInfo_fluctuation__blue
              }
            >
              {formatChange(d)}({formatChange(dp)}%)
            </p>
          </span>
        </a>
      </Link>
    </li>
  </>
);

export default MarketInfoListItem;
