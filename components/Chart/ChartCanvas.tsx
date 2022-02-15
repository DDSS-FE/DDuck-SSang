import { LegacyRef, useEffect, useRef } from 'react';

import styles from './ChartCanvas.module.scss';

import { ChartData, renderChart } from '../../utils/renderChart';

interface CanvasProps {
  data: ChartData;
  height?: number;
  width?: number;
}

function ChartCanvas({
  data,
  height = 300,
  width = 330,
}: CanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (canvasRef.current !== undefined)
      renderChart(canvasRef.current, data.candleData, data.timeLineData);
  }, [data]);

  return (
    <canvas
      className={styles.el_canvas}
      ref={canvasRef as LegacyRef<HTMLCanvasElement>}
      height={height}
      width={width}
    />
  );
}

export default ChartCanvas;
