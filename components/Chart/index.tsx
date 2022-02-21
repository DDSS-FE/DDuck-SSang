import dynamic from 'next/dynamic';
import clsx from 'clsx';

import styles from 'components/Chart/Chart.module.scss';

import { STOCK_CANDLE_API } from 'utils/config';
import useAxios from 'hooks/useAxios';

const DynamicCanvas = dynamic(() => import('./ChartCanvas'), {
  ssr: false,
});

export function Chart(): JSX.Element {
  const { data } = useAxios(STOCK_CANDLE_API);

  return (
    <div className={styles.ly_chart}>
      <div className={styles.ly_chart_view}>
        {data ? <DynamicCanvas data={data} /> : null}
      </div>

      <ul className={styles.bl_chartViewMenu}>
        <li className={styles.bl_chartViewMenu_item}>15분</li>
        <li className={styles.bl_chartViewMenu_item}>30분</li>
        <li className={styles.bl_chartViewMenu_item}>60분</li>
        <li className={clsx(styles.bl_chartViewMenu_item, styles.is_active)}>
          1일
        </li>
        <li className={styles.bl_chartViewMenu_item}>1주</li>
        <li className={styles.bl_chartViewMenu_item}>1달</li>
        <li className={styles.bl_chartViewMenu_item}>1년</li>
      </ul>
    </div>
  );
}

export default Chart;
