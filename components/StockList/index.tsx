import Link from 'next/link';

import styles from './StockList.module.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

const StockList = (): JSX.Element => {
  return (
    <ul className={styles.bl_vertStocks}>
      <li className={styles.bl_vertStocks_item}>
        <Link href="/market/1">
          <a className={styles.bl_vertStocks_link}>
            <span className={styles.bl_vertStocks_stock}>
              <p className={styles.bl_vertStocks_ttl}>코스피 지수</p>
              <p className={styles.bl_vertStocks_standard}>28/01 | 서울</p>
            </span>

            <span className={styles.bl_vertStocks_marketPrice}>
              <p className={styles.bl_vertStocks_price}>2,663.34</p>
              <p
                className={cx(
                  styles.bl_vertStocks_fluctuation,
                  styles.bl_vertStocks_fluctuation__red
                )}
              >
                +48.85 (+1.87%)
              </p>
            </span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default StockList;
