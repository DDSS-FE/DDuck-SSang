import { Fragment } from 'react';
import classes from './custom404.module.scss';

export default function Custom404() {
  return (
    <Fragment>
      <section className={classes.bl_errPg}>
        <header className={classes.bl_errPg_header}>
          <h1>404</h1>
        </header>
        <div className={classes.el_errPg_msg}>
          <div>이런...!</div>
          <div>이 페이지는 존재하지 않거나 이용할 수 없습니다.</div>
        </div>
        <button>홈페이지로 돌아가기</button>
      </section>
    </Fragment>
  );
}
