import { useRef } from 'react';
import clsx from 'clsx';

import styles from './Chart.module.scss';

const Chart = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className={styles.ly_chart}>
      <canvas ref={canvasRef}></canvas>

      <ul className={styles.bl_chartViewMenu}>
        <li className={clsx(styles.bl_chartViewMenu_item, styles.is_active)}>
          1일
        </li>
        <li className={styles.bl_chartViewMenu_item}>1주</li>
        <li className={styles.bl_chartViewMenu_item}>1달</li>
        <li className={styles.bl_chartViewMenu_item}>1년</li>
        <li className={styles.bl_chartViewMenu_item}>5년</li>
        <li className={styles.bl_chartViewMenu_item}>최대</li>
      </ul>
    </div>
  );
};

export default Chart;
