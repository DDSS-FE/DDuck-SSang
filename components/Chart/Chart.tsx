import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import useAxios from 'hooks/useAxios';

import { CANDLE_API } from 'utils/config';
import { ChartData, ChartType } from 'utils/chart';

import styles from 'components/Chart/Chart.module.scss';

import { Spinner } from 'components/Spinner';
import { PeriodButton } from 'components/PeriodButton';
import { ChartTypeToggleButton } from 'components/ChartTypeToggleButton';

const DynamicCanvas = dynamic(() => import('components/Chart/ChartCanvas'), {
  ssr: false,
});

export function Chart({ symbol }: { symbol: string }): JSX.Element {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [period, setPeriod] = useState('D');
  const [type, setType] = useState<ChartType>('candle');

  const { data, loading } = useAxios<ChartData>(
    `${CANDLE_API}?symbol=${symbol}&period=${period}`
  );

  useEffect(() => {
    setHeight(window.innerHeight / 2);
    setWidth(window.innerWidth);
  }, [setHeight, setWidth]);

  return (
    <>
      {loading && <Spinner />}
      <div className={styles.ly_chart}>
        <div className={styles.ly_chart_view}>
          {data && !loading ? (
            <DynamicCanvas type={type} data={data} />
          ) : (
            <canvas height={height} width={width} />
          )}
        </div>

        <div className={styles.ly_chart_btnWrapper}>
          <PeriodButton setPeriod={setPeriod} />
          <ChartTypeToggleButton type={type} setType={setType} />
        </div>
      </div>
    </>
  );
}

export default Chart;
