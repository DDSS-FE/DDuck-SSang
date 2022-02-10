import { useEffect } from 'react';
import useQuote from '../../hooks/useQuote';
import styles from './Chart.module.scss';
import dynamic from 'next/dynamic';

const DynamicCanvas = dynamic(() => import('./Canvas'), {
  ssr: false,
});

const draw = (c: CanvasRenderingContext2D) => {
  // TODO: draw chart
  console.log(c);
};

const Chart = (): JSX.Element => {
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
    <div className={styles.ly_chart}>
      <div className={styles.ly_chart_view}>
        <DynamicCanvas draw={draw} />
      </div>

      <ul className={styles.bl_horizViewMenu}>
        <li className={styles.active}>1일</li>
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
