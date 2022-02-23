import dynamic from 'next/dynamic';

import { PeriodButton } from 'components/PeriodButton';
import styles from 'components/Chart/Chart.module.scss';
import Spinner from 'components/Spinner';

import { STOCK_CANDLE_API } from 'utils/config';
import useAxios from 'hooks/useAxios';
import { ChartData } from 'utils/chart';
import { useState, useEffect } from 'react';

const DynamicCanvas = dynamic(() => import('./ChartCanvas'), {
  ssr: false,
});

export function Chart({ symbol }: { symbol: string }): JSX.Element {
  const [period, setPeriod] = useState('D');
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const { data, loading, fetchData } = useAxios<ChartData>(
    `${STOCK_CANDLE_API}?symbol=${symbol}&period=${period}`
  );

  useEffect(() => {
    fetchData();
    setHeight(window.innerHeight / 2);
    setWidth(window.innerWidth);
  }, [period]);

  return (
    <>
      {loading && <Spinner />}
      <div className={styles.ly_chart}>
        <div className={styles.ly_chart_view}>
          {data && !loading ? (
            <DynamicCanvas data={data} />
          ) : (
            <canvas height={height} width={width}></canvas>
          )}
        </div>

        <PeriodButton setPeriod={setPeriod} />
      </div>
    </>
  );
}

export default Chart;
