import Link from 'next/link';

import clsx from 'clsx';

import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

interface Props {
  id: number;
  name: string;
  date: string;
  c: number;
  d: number;
  dp: number;
}

const MarketInfoListItem = ({
  id,
  name,
  date,
  c,
  d,
  dp,
}: Props): JSX.Element => (
  <li className={styles.bl_vertMarketInfo_item}>
    <Link href={`/market/${id}`}>
      <a className={styles.bl_vertMarketInfo_link}>
        <span className={styles.bl_vertMarketInfo_marketInfo}>
          <div className={styles.bl_vertMarketInfo_ttlWrapper}>
            <p className={styles.bl_vertMarketInfo_ttl}>
              {/* 코스피 지수 */}
              {name}
            </p>
            <p className={styles.bl_vertMarketInfo_standard}>
              {/* 28/01 */}
              {date} | {/* 서울 */}
              UC
            </p>
          </div>
          {/* /.bl_vertMarketInfo_ttlWrapper */}
        </span>
        <span className={styles.bl_vertMarketInfo_marketPrice}>
          <p className={styles.bl_vertMarketInfo_price}>
            {/* 2,663.34 */}
            {c}
          </p>
          <p
            className={clsx(
              styles.bl_vertMarketInfo_fluctuation,
              styles.bl_vertMarketInfo_fluctuation__red
            )}
          >
            {/* +48.85  */}
            {d}
            {/* (+1.87%) */} ({dp}%)
          </p>
        </span>
      </a>
    </Link>
  </li>
);

export default MarketInfoListItem;
