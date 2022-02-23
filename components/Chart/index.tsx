import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import styles from 'components/Chart/Chart.module.scss';

import useAxios from 'hooks/useAxios';

import { STOCK_CANDLE_API, STOCK_LINE_API } from 'utils/config';
import { ChartData } from 'utils/chart';

import Spinner from 'components/Spinner';
import { PeriodButton } from 'components/PeriodButton';
import ChartTypeToggleButton, {
  ChartType,
} from 'components/ChartTypeToggleButton';

const DynamicCanvas = dynamic(() => import('./ChartCanvas'), {
  ssr: false,
});

export function Chart({ symbol }: { symbol: string }): JSX.Element {
  const [period, setPeriod] = useState('D');
  const [chartType, setChartType] = useState<ChartType>('candle');
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const { data, loading, fetchData } = useAxios<ChartData>(
    `${STOCK_CANDLE_API}?symbol=${symbol}&period=${period}`
  );

  useEffect(() => {
    fetchData();
    setHeight(window.innerHeight / 2);
    setWidth(window.innerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <div className={styles.ly_chart}>
      <div className={styles.ly_chart_view}>
        {loading && <Spinner />}
        {data && !loading ? (
          <DynamicCanvas data={data} />
        ) : (
          <canvas height={height} width={width}></canvas>
        )}
      </div>

      <div className={styles.ly_chart_btnWrapper}>
        <PeriodButton setPeriod={setPeriod} />
        <ChartTypeToggleButton type={chartType} setChartType={setChartType} />
      </div>
    </div>
  );
}

export default Chart;
