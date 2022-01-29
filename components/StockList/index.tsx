import Link from 'next/link';

import styles from './StockList.module.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

const StockList = (): JSX.Element => {
  return (
    <ul className={styles.bl_vertPosts}>
      <li className={styles.bl_vertPosts_item}>
        <Link href="/market/1">
          <a className={styles.bl_vertPosts_link}>
            <span className={styles.bl_vertPosts_stock}>
              <p className={styles.bl_vertPosts_ttl}>코스피 지수</p>
              <p className={styles.bl_vertPosts_standard}>28/01 | 서울</p>
            </span>

            <span className={styles.bl_vertPosts_marketPrice}>
              <p className={styles.bl_vertPosts_price}>2,663.34</p>
              <p
                className={cx(
                  styles.bl_vertPosts_fluctuation,
                  styles.bl_vertPosts_fluctuation__red
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
