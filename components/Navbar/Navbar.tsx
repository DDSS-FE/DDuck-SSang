import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faNewspaper,
  faStar,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className={styles.bl_nav}>
      <div className={styles.bl_nav_inner}>
        <div>
          <FontAwesomeIcon icon={faChartLine} />
          <Link href="/">
            <span>시장</span>
          </Link>
        </div>
        <div>
          <FontAwesomeIcon icon={faNewspaper} />
          <Link href="/news">
            <span>뉴스</span>
          </Link>
        </div>
        <div>
          <FontAwesomeIcon icon={faStar} />
          <Link href="/watchlist">
            <span>관심목록</span>
          </Link>
        </div>
        <div>
          <FontAwesomeIcon icon={faBars} />
          <Link href="/more">
            <span>더보기</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
