import { formatDate } from '../formatDate';
import { Candle, Line, TimeLineData } from './types';

export const chartStyle = {
  AXIS_COLOR: '#bbb',
  FONT: '1.8rem Sans-serif',
  SPACING: 25,
};

export default class Chart<T = Candle | Line> {
  ctx: CanvasRenderingContext2D;

  width: number;

  height: number;

  _chartData: T[];

  _timeLineData: TimeLineData;

  maxPrice: number;

  minPrice: number;

  maxPeriod: number;

  minPeriod: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.width = ctx.canvas.width - 100;
    this.height = ctx.canvas.height - 100;
    this._chartData = [];
    this._timeLineData = [];
    this.maxPrice = -Infinity;
    this.minPrice = +Infinity;
    this.maxPeriod = -Infinity;
    this.minPeriod = +Infinity;
  }

  drawYAxisText(gridNum: number) {
    const XAXIS_MARGIN = 8;
    const YAXIS_MARGIN = 4.5;
    const MAX_MIN_DIFF = this.maxPrice - this.minPrice;

    for (let i = 0; i <= gridNum; i++) {
      this.ctx.fillText(
        `${(this.maxPrice - (MAX_MIN_DIFF / gridNum) * i).toFixed(2)}`,
        this.width + XAXIS_MARGIN + chartStyle.SPACING,
        (this.height / gridNum) * i + YAXIS_MARGIN + chartStyle.SPACING
      );
    }
  }

  drawXAxisText(gridNum: number) {
    const YAXIS_MARGIN = 30;
    const XAXIS_MARGIN = 19;
    const TEXT_MARGIN = 15;
    const period = this.maxPeriod - this.minPeriod;

    for (let i = 0; i <= gridNum; i++) {
      const { year, month } = formatDate(
        this.minPeriod + (period / gridNum) * i
      );

      this.ctx.fillText(
        year,
        (this.width / gridNum) * i + chartStyle.SPACING - XAXIS_MARGIN,
        this.height + chartStyle.SPACING + YAXIS_MARGIN
      );
      this.ctx.fillText(
        month,
        (this.width / gridNum) * i + chartStyle.SPACING - XAXIS_MARGIN,
        this.height + chartStyle.SPACING + TEXT_MARGIN + YAXIS_MARGIN
      );
    }
  }

  drawGrid(gridNum: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = chartStyle.AXIS_COLOR;

    for (let i = 0; i <= gridNum; i++) {
      this.ctx.moveTo(
        chartStyle.SPACING,
        (this.height / gridNum) * (gridNum - i) + chartStyle.SPACING
      );
      this.ctx.lineTo(
        this.width + chartStyle.SPACING,
        (this.height / gridNum) * (gridNum - i) + chartStyle.SPACING
      );
      this.ctx.moveTo(
        (this.width / gridNum) * (gridNum - i) + chartStyle.SPACING,
        chartStyle.SPACING
      );
      this.ctx.lineTo(
        (this.width / gridNum) * (gridNum - i) + chartStyle.SPACING,
        this.height + chartStyle.SPACING
      );
    }

    this.ctx.stroke();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.font = chartStyle.FONT;

    this.drawGrid(6);
    this.drawXAxisText(6);
    this.drawYAxisText(6);
  }
}
