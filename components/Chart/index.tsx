import dynamic from 'next/dynamic';

import { PeriodButton } from 'components/PeriodButton';
import styles from 'components/Chart/Chart.module.scss';

import { STOCK_CANDLE_API } from 'utils/config';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';

const DynamicCanvas = dynamic(() => import('./ChartCanvas'), {
  ssr: false,
});

export function Chart(): JSX.Element {
  const [period, setPeriod] = useState('D');
  const { data, fetchData } = useAxios(STOCK_CANDLE_API, period);

  useEffect(() => {
    fetchData();
  }, [period]);

  return (
    <div className={styles.ly_chart}>
      <div className={styles.ly_chart_view}>
        {data ? <DynamicCanvas data={data} /> : null}
      </div>

      <PeriodButton callPeriod={setPeriod} />
    </div>
  );
}

export default Chart;
