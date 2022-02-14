import dynamic from 'next/dynamic';

import styles from './Chart.module.scss';

import { STOCK_CANDLE_API } from '../../utils/config';
import useAxios from '../../hooks/useAxios';

const DynamicCanvas = dynamic(() => import('./ChartCanvas'), {
  ssr: false,
});

function Chart(): JSX.Element {
  const { data } = useAxios(STOCK_CANDLE_API);

  return (
    <div className={styles.ly_chart}>
      <div className={styles.ly_chart_view}>
        {data ? <DynamicCanvas data={data} /> : null}
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
}

export default Chart;
