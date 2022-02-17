import { useEffect, useRef } from 'react';

import styles from './ChartCanvas.module.scss';

import { CandleChart, CanvasProps } from 'utils/chart';

function ChartCanvas({ data }: CanvasProps): JSX.Element {
  const { candleData, timeLineData } = data;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!!ctx) {
      new CandleChart(
        ctx,
        {
          margin: 30,
          lineWidth: 5,
          candleColorB: 'rgb(93,200,135)',
          candleColorS: 'rgb(225,84,96)',
        },
        { candleData, timeLineData }
      );
    }
  }, [candleData, timeLineData]);

  return (
    <canvas
      className={styles.el_canvas}
      ref={canvasRef}
      height={window.innerHeight}
      width={window.innerWidth * 2}
    />
  );
}

export default ChartCanvas;
