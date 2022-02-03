import Link from 'next/link';

import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NavBar = (): JSX.Element => {
  return (
    <nav className={styles.bl_tabNav}>
      <ul className={styles.bl_tabNav_inner}>
        <li>
          {/* 첫 페이지 로딩에서 시장 탭 active 필요 */}
          <Link href="/">
            <a
              className={cx(
                styles.bl_tabNav_link,
                styles.bl_tabNav_link__market,
                styles.is_active
              )}
            >
              시장
            </a>
          </Link>
        </li>
        <li>
          <Link href="/news">
            <a
              className={cx(styles.bl_tabNav_link, styles.bl_tabNav_link__news)}
            >
              뉴스
            </a>
          </Link>
        </li>
        <li>
          <Link href="/watchlist">
            <a
              className={cx(styles.bl_tabNav_link, styles.bl_tabNav_link__star)}
            >
              관심목록
            </a>
          </Link>
        </li>
        <li>
          <Link href="/more">
            <a
              className={cx(styles.bl_tabNav_link, styles.bl_tabNav_link__more)}
            >
              더보기
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
