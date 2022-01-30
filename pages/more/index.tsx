import type { NextPage } from 'next';
import classes from './more.module.scss';
import { Fragment } from 'react';

const MorePage: NextPage = () => {
  return (
    <Fragment>
      <main className={classes.bl_moreMenu}>
        <ul className={classes.bl_moreMenu_list}>
          <li className={classes.bl_moreMenu_item}>
            <button className={classes.el_btn_socialGoggle}>
              Google 계정으로 로그인
            </button>
          </li>
          <li className={classes.bl_moreMenu_item}>
            <button className={classes.el_btn_menu}>Menu1</button>
          </li>
          <li className={classes.bl_moreMenu_item}>
            <button className={classes.el_btn_menu}>Menu2</button>
          </li>
        </ul>
      </main>
    </Fragment>
  );
};

export default MorePage;
