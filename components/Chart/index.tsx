import { useRef } from 'react';
import classes from './chart.module.scss';

const Chart = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className={classes.ly_chart}>
      <canvas ref={canvasRef} id="chart"></canvas>
      <ul className={classes.chart__view}>
        <li className={classes.active}>1일</li>
        <li>1주</li>
        <li>1달</li>
        <li>1년</li>
        <li>5년</li>
        <li>최대</li>
      </ul>
    </div>
  );
};

export default Chart;
