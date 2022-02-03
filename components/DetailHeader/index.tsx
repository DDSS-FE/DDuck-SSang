import { NextComponentType } from 'next';
import classes from './DetailHeader.module.scss';

const DetailHeader: NextComponentType = () => {
  return (
    <nav className={classes.ly_header_nav}>
      <a href="#" className={classes.ly_header_nav_cat}>
        <span className={classes.active}>개요</span>
      </a>
      <a href="#" className={classes.ly_header_nav_cat}>
        <span>분석</span>
      </a>
      <a href="#" className={classes.ly_header_nav_cat}>
        <span>주식시장</span>
      </a>
      <a href="#" className={classes.ly_header_nav_cat}>
        <span>경제지표</span>
      </a>
      <a href="#" className={classes.ly_header_nav_cat}>
        <span>경제뉴스</span>
      </a>
    </nav>
  );
};

export default DetailHeader;
