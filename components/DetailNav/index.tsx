import { NextComponentType } from 'next';

import styles from './DetailNav.module.scss';

const DetailNav: NextComponentType = () => {
  return (
    <nav className={styles.ly_header_nav}>
      <a href="#" className={styles.ly_header_nav_cat}>
        <span className={styles.active}>개요</span>
      </a>
      <a href="#" className={styles.ly_header_nav_cat}>
        <span>분석</span>
      </a>
      <a href="#" className={styles.ly_header_nav_cat}>
        <span>주식시장</span>
      </a>
      <a href="#" className={styles.ly_header_nav_cat}>
        <span>경제지표</span>
      </a>
      <a href="#" className={styles.ly_header_nav_cat}>
        <span>경제뉴스</span>
      </a>
    </nav>
  );
};

export default DetailNav;
