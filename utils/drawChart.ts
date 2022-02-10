export type ChartData = Candle[] | Line[] | null;

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
  time: number;
}

interface Line {
  close: number;
  time: number;
}

function drawYAxis(data: ChartData, c: CanvasRenderingContext2D): void {
  console.log(data, c);
}

function drawChart(data: ChartData, c: CanvasRenderingContext2D): void {
  // TODO: draw chart
  drawYAxis(data, c);
}

export default drawChart;
