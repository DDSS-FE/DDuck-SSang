import type { NextPage } from 'next';
import { Fragment, useRef } from 'react';
import classes from './chart.module.scss';

interface CanvasProps {
  width: number;
  height: number;
}

const ChartPage: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <Fragment>
      <div className={classes.chart__container}>
        <canvas ref={canvasRef} id="chart"></canvas>
        <ul className={classes.chart__view}>
          <li className={classes.active}>1일</li>
          <li>1주</li>
          <li>1달</li>
          <li>1년</li>
          <li>5년</li>
          <li>최대</li>
        </ul>
        <section className={classes.chart__info}>
          <ul className={classes.chart__info__list}>
            <li className={classes.chart__info__item}>
              <div>일일 변동폭</div>
              <div>2,703.99 - 2,789.62</div>
            </li>
            <li className={classes.chart__info__item}>
              <div>52주 가격변동폭</div>
              <div>2,703.99 - 3,316.08</div>
            </li>
            <li className={classes.chart__info__item}>
              <div>이전 종가</div>
              <div>2,792.00</div>
            </li>
            <li className={classes.chart__info__item}>
              <div>시가</div>
              <div>2,786.41</div>
            </li>
            <li className={classes.chart__info__item}>
              <div>거래량</div>
              <div>639,958</div>
            </li>
          </ul>
        </section>
      </div>
    </Fragment>
  );
};

export default ChartPage;
