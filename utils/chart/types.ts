export interface ChartOption {
  margin: number;
  lineWidth: number;
  gridLineWidth: number;
  candleColorB: string;
  candleColorS: string;
  axisColor: string;
  font: string;
  spacing: number;
}

export interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
}

export type CandleData = Candle[];

export type TimeLineData = number[];

export interface ChartData {
  candleData: CandleData;
  timeLineData: TimeLineData;
}

export interface CanvasProps {
  data: {
    candleData: CandleData;
    timeLineData: TimeLineData;
  };
}
