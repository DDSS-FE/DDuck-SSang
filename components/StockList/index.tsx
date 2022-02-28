import clsx from 'clsx';
import Link from 'next/link';

import styles from 'components/StockList/StockList.module.scss';

import IconButton from 'components/IconButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const StockList = ({ editMode }: { editMode?: boolean }): JSX.Element => {
  return (
    <ul className={styles.bl_vertStocks}>
      <li className={styles.bl_vertStocks_item}>
        {editMode ? (
          // 관심 목록 - 편집
          <div className={styles.bl_vertStocks_inner}>
            <span
              className={clsx(
                styles.bl_vertStocks_stock,
                styles.bl_vertStocks_stock__sort
              )}
            >
              <div className={styles.bl_vertStocks_ttlWrapper}>
                <p className={styles.bl_vertStocks_ttl}>코스피 지수</p>
                <p className={styles.bl_vertStocks_standard}>서울</p>
              </div>
            </span>
            <span className={styles.bl_vertStocks_marketPrice}>
              <IconButton
                onClick={() => console.log('편집')}
                icon={faTimes}
                color="red"
                bgc="rgb(249,249,250)"
              />
            </span>
          </div>
        ) : (
          // 시장, 관심 목록
          <Link href="/market/1">
            <a className={styles.bl_vertStocks_link}>
              <span className={clsx(styles.bl_vertStocks_stock)}>
                <div className={styles.bl_vertStocks_ttlWrapper}>
                  <p className={styles.bl_vertStocks_ttl}>코스피 지수</p>
                  <p className={styles.bl_vertStocks_standard}>28/01 | 서울</p>
                </div>
              </span>
              <span className={styles.bl_vertStocks_marketPrice}>
                <p className={styles.bl_vertStocks_price}>2,663.34</p>
                <p
                  className={clsx(
                    styles.bl_vertStocks_fluctuation,
                    styles.bl_vertStocks_fluctuation__red
                  )}
                >
                  +48.85 (+1.87%)
                </p>
              </span>
            </a>
          </Link>
        )}
      </li>
    </ul>
  );
};

export default StockList;
