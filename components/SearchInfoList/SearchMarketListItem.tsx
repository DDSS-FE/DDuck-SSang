import Link from 'next/link';

import styles from 'components/SearchInfoList/SearchInfoList.module.scss';

interface Props {
  name: string;
  symbol: string;
  category: string;
  ticker: string;
}

const SearchMarketListItem = ({
  name,
  symbol,
  ticker,
  category,
}: Props): JSX.Element => (
  <li className={styles.bl_vertSearchInfo_item}>
    <Link href={`/market/${ticker}/${symbol}`}>
      <a className={styles.bl_vertSearchInfo_link}>
        <span className={styles.bl_vertSearchInfo_SearchInfo}>
          <div className={styles.bl_vertSearchInfo_ttlWrapper}>
            <p className={styles.bl_vertSearchInfo_ttl}>{name}</p>
            <p className={styles.bl_vertSearchInfo_standard}>
              {ticker === 'crypto' ? symbol.slice(8) : symbol} | {category}
            </p>
          </div>
        </span>
      </a>
    </Link>
  </li>
);

export default SearchMarketListItem;
