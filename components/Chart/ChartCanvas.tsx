import { useEffect, useRef } from 'react';

import styles from 'components/Chart/ChartCanvas.module.scss';

import { CanvasProps, Chart } from 'utils/chart';

function ChartCanvas({ data }: CanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (!!ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      new Chart(ctx, {
        type: 'candle',
        data,
        // option: {
        //   candleColorB: 'rgb(93,200,135)',
        //   candleColorS: 'rgb(225,84,96)',
        // },
      });
    }
  }, [data]);

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
