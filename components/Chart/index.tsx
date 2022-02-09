import { useEffect, useRef } from 'react';
import useQuote from '../../hooks/useQuote';
import classes from './Chart.module.scss';

const Chart = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { fetchQuote, data, loading, error } = useQuote(
    'http://localhost:4000/market'
  );

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
