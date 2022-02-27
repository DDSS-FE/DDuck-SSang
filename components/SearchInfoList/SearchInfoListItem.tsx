import Link from 'next/link';

import styles from 'components/SearchInfoList/SearchInfoList.module.scss';

interface Props {
  name: string;
  symbol: string;
  category: string;
  index: string;
}

const SearchInfoListItem = ({
  name,
  symbol,
  category,
  index,
}: Props): JSX.Element => (
  <li className={styles.bl_vertSearchInfo_item}>
    <Link href={`/market/${category}/${symbol}`}>
      <a className={styles.bl_vertSearchInfo_link}>
        <span className={styles.bl_vertSearchInfo_SearchInfo}>
          <div className={styles.bl_vertSearchInfo_ttlWrapper}>
            <p className={styles.bl_vertSearchInfo_ttl}>{name}</p>
            <p className={styles.bl_vertSearchInfo_standard}>
              {symbol} | {index}
            </p>
          </div>
        </span>
      </a>
    </Link>
  </li>
);

export default SearchInfoListItem;
