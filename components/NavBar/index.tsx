import Link from 'next/link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartColumn,
  faNewspaper,
  faStar,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

import styles from './NavBar.module.scss';

const NavBar = (): JSX.Element => {
  return (
    <nav className={styles.bl_tabNav}>
      <ul className={styles.bl_tabNav_inner}>
        <li>
          <Link href="/">
            <a className={clsx(styles.bl_tabNav_link, styles.is_active)}>
              <FontAwesomeIcon
                className={styles.bl_tabNav_icon}
                icon={faChartColumn}
              />
              <p>시장</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/news">
            <a className={styles.bl_tabNav_link}>
              <FontAwesomeIcon
                className={styles.bl_tabNav_icon}
                icon={faNewspaper}
              />
              <p>뉴스</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/watchlist">
            <a className={styles.bl_tabNav_link}>
              <FontAwesomeIcon
                className={styles.bl_tabNav_icon}
                icon={faStar}
              />
              <p>관심목록</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/more">
            <a className={styles.bl_tabNav_link}>
              <FontAwesomeIcon
                className={styles.bl_tabNav_icon}
                icon={faBars}
              />
              <p>더보기</p>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
