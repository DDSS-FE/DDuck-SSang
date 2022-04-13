import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartColumn,
  faStar,
  faBars,
  faComments,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

import styles from 'components/NavBar/NavBar.module.scss';

const NavBar = (): JSX.Element => {
  const router = useRouter();

  return (
    <nav className={styles.bl_tabNav}>
      <ul className={styles.bl_tabNav_inner}>
        <li>
          <Link href="/market/stock">
            <a
              className={clsx(
                styles.bl_tabNav_link,
                router.pathname === '/market/stock' && styles.is_active
              )}
            >
              <FontAwesomeIcon
                className={styles.bl_tabNav_icon}
                icon={faChartColumn}
              />
              <p>시장</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/news/new">
            <a
              className={clsx(
                styles.bl_tabNav_link,
                router.pathname === '/news/new' && styles.is_active
              )}
            >
              <FontAwesomeIcon
                className={styles.bl_tabNav_icon}
                icon={faNewspaper}
              />
              <p>뉴스</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/comments">
            <a className={clsx(styles.bl_tabNav_link)}>
              <FontAwesomeIcon
                className={styles.bl_tabNav_icon}
                icon={faComments}
              />
              <p>댓글</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/watchlist">
            <a
              className={clsx(
                styles.bl_tabNav_link,
                router.pathname === '/watchlist' && styles.is_active
              )}
            >
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
            <a
              className={clsx(
                styles.bl_tabNav_link,
                router.pathname === '/more' && styles.is_active
              )}
            >
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
