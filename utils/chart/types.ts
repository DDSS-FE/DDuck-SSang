export interface ChartOption {
  margin: number;
  lineWidth: number;
}

export interface CandleChartOption extends ChartOption {
  candleColorB?: string;
  candleColorS?: string;
}

export interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
}

export type CandleData = Candle[];

export interface Line {
  c: number;
}

export type LineData = Line[];

export type TimeLineData = number[];

export interface CanvasProps {
  data: {
    candleData: CandleData;
    timeLineData: TimeLineData;
  };
}
