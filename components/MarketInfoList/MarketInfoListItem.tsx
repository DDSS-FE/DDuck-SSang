import Link from 'next/link';

import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import { MarketCategory } from 'pages/market/[category]';

import { marketTime, KRTime } from 'utils/formatDate';
import { formatChange } from 'utils/quote';

interface Props {
  category: MarketCategory;
  symbol: string;
  name: string;
  c: number;
  d: number;
  dp: number;
}

const MarketInfoListItem = ({
  category,
  symbol,
  name,
  c,
  d,
  dp,
}: Props): JSX.Element => (
  <li className={styles.bl_vertMarketInfo_item}>
    <Link href={`/market/${category}/${symbol}`}>
      <a className={styles.bl_vertMarketInfo_link}>
        <span className={styles.bl_vertMarketInfo_marketInfo}>
          <div className={styles.bl_vertMarketInfo_ttlWrapper}>
            <p className={styles.bl_vertMarketInfo_ttl}>{name}</p>
            <p className={styles.bl_vertMarketInfo_standard}>
              {/* 시계를 넣을지 말지 */}
              {category === 'crypto' ? KRTime : marketTime} | US
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
);

export default MarketInfoListItem;
