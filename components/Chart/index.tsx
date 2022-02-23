import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import styles from 'components/Chart/Chart.module.scss';

import useAxios from 'hooks/useAxios';

import { STOCK_CANDLE_API } from 'utils/config';
import { ChartData } from 'utils/chart';

import { PeriodButton } from 'components/PeriodButton';
import Spinner from 'components/Spinner';

const DynamicCanvas = dynamic(() => import('./ChartCanvas'), {
  ssr: false,
});

export function Chart(): JSX.Element {
  const [period, setPeriod] = useState('D');
  const { data, loading, fetchData } = useAxios<ChartData>(
    STOCK_CANDLE_API,
    period
  );

  useEffect(() => {
    fetchData();
  }, [period]);

  return (
    <div className={styles.ly_chart}>
      <div className={styles.ly_chart_view}>
        {loading && <Spinner />}
        {data && <DynamicCanvas data={data} />}
      </div>

      <PeriodButton callPeriod={setPeriod} />
    </div>
  );
}

export default Chart;
