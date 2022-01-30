import { NextComponentType } from 'next';
import { Fragment } from 'react';
import classes from './more-header.module.scss';

const MoreHeader: NextComponentType = () => {
  return (
    <Fragment>
      <div className={classes.ly_header}>
        <header className={classes.ly_header_inner}>
          <div className={classes.ly_header_cat}></div>
        </header>
      </div>
    </Fragment>
  );
};

export default MoreHeader;
