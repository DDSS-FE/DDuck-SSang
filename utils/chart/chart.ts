import { formatDate } from '../formatDate';
import { Candle, Line, TimeLineData } from './types';

const chartStyle = {
  AXIS_COLOR: '#bbb',
  FONT: '10.5px Sans-serif',
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
    this.width = ctx.canvas.width - 50;
    this.height = ctx.canvas.height - 50;
    this._chartData = [];
    this._timeLineData = [];
    this.maxPrice = -Infinity;
    this.minPrice = +Infinity;
    this.maxPeriod = -Infinity;
    this.minPeriod = +Infinity;
  }

  drawXYAxis() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = chartStyle.AXIS_COLOR;
    this.ctx.moveTo(this.width, 0);
    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.stroke();
  }

  drawYAxisText(gridNum: number) {
    const BASIC_MARGIN = 10;
    const MAX_MIN_DIFF = this.maxPrice - this.minPrice;

    for (let i = 0; i <= gridNum; i++) {
      this.ctx.fillText(
        `${(this.maxPrice - (MAX_MIN_DIFF / gridNum) * i).toFixed(2)}`,
        this.width + BASIC_MARGIN,
        (this.height / gridNum) * i + 4.5 // fontsize / 2 - strokeWeight / 2
      );
    }
  }

  drawXAxisText(gridNum: number) {
    const BASIC_MARGIN = 15;
    const period = this.maxPeriod - this.minPeriod;

    for (let i = 0; i <= gridNum; i++) {
      const date = formatDate(this.minPeriod + (period / gridNum) * i);
      date.forEach((day, idx) => {
        this.ctx.fillText(
          day,
          (this.width / gridNum) * i - BASIC_MARGIN,
          this.height + BASIC_MARGIN * idx + 10
        );
      });
    }
  }

  drawGrid(gridNum: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = chartStyle.AXIS_COLOR;

    for (let i = 0; i < gridNum; i++) {
      this.ctx.moveTo(0, (this.height / gridNum) * (gridNum - i));
      this.ctx.lineTo(this.width, (this.height / gridNum) * (gridNum - i));
      this.ctx.moveTo((this.width / gridNum) * (gridNum - i), 0);
      this.ctx.lineTo((this.width / gridNum) * (gridNum - i), this.height);
    }

    this.ctx.stroke();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.font = chartStyle.FONT;

    this.drawXYAxis();
    this.drawGrid(6);
    this.drawXAxisText(6);
    this.drawYAxisText(6);
  }
}
