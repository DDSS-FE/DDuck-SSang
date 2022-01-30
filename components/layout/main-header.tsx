import { NextComponentType } from 'next';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './main-header.module.scss';

const MainHeader: NextComponentType = () => {
  return (
    <Fragment>
      <div className={classes.ly_header}>
        <header className={classes.ly_header_inner}>
          <h2 className={classes.ly_header_cat}>뉴스</h2>
          <FontAwesomeIcon
            icon={faSearch}
            className={classes.ly_header_icon}
          ></FontAwesomeIcon>
        </header>
        <nav className={classes.ly_header_nav}>
          <a href="#" className={classes.ly_header_nav_cat}>
            <span className={classes.active}>암호 화폐</span>
          </a>
          <a href="#" className={classes.ly_header_nav_cat}>
            <span>상품</span>
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
      </div>
    </Fragment>
  );
};

export default MainHeader;
