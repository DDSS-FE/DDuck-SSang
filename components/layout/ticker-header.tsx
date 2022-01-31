import { NextComponentType } from 'next';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faStar,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import classes from './ticker-header.module.scss';

const TickerHeader: NextComponentType = () => {
  return (
    <Fragment>
      <header className={classes.ly_header}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={classes.ly_header_icon1}
        />
        <h2 className={classes.ly_header_ticker}>코스피지수</h2>
        <FontAwesomeIcon icon={faSearch} className={classes.ly_header_icon2} />
        <FontAwesomeIcon icon={faStar} className={classes.ly_header_icon3} />
      </header>
    </Fragment>
  );
};

export default TickerHeader;
