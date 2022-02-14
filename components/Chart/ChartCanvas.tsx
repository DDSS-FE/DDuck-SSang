import { LegacyRef, useEffect, useRef } from 'react';

import styles from './ChartCanvas.module.scss';

import { ChartData } from '../../utils/drawChart';

interface CanvasProps {
  data: ChartData;
  drawChart: (data: ChartData, context: CanvasRenderingContext2D) => void;
  height?: number;
  width?: number;
}

function ChartCanvas({
  data,
  drawChart,
  height = 300,
  width = 330,
}: CanvasProps): JSX.Element {
  const canvas = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const context = canvas.current?.getContext('2d');
    drawChart(data, context as CanvasRenderingContext2D);
  }, [data, drawChart]);

  return (
    <canvas
      className={styles.el_canvas}
      ref={canvas as LegacyRef<HTMLCanvasElement>}
      height={height}
      width={width}
    />
  );
}

export default ChartCanvas;
