import Chart from './chart';
import { Candle, CandleChartOption, CandleData, TimeLineData } from './types';

export default class CandleChart extends Chart<Candle> {
  options: CandleChartOption;

  constructor(
    ctx: CanvasRenderingContext2D,
    options: CandleChartOption,
    {
      candleData,
      timeLineData,
    }: { candleData: CandleData; timeLineData: TimeLineData }
  ) {
    super(ctx);

    this.options = options;
    this.maxPeriod = timeLineData[timeLineData.length - 1] * 1000;
    this.minPeriod = timeLineData[0] * 1000;
    this.maxPrice = Math.max(...candleData.map(({ h }) => h));
    this.minPrice = Math.min(...candleData.map(({ l }) => l));
    this._chartData = this.formatingData(candleData);

    this.draw();
  }

  formatingData(candleData: CandleData) {
    const heightRate = (this.maxPrice - this.minPrice) / 100;
    const priceToPoint = (price: number) =>
      (100 - (price - this.minPrice) / heightRate) * (this.height / 100);

    return candleData.map(({ o, h, l, c }: Candle) => ({
      o: priceToPoint(o),
      h: priceToPoint(h),
      l: priceToPoint(l),
      c: priceToPoint(c),
    }));
  }

  draw() {
    super.draw();

    const widthPercent = this.width / this._chartData.length;

    this._chartData.forEach(({ o, h, l, c }: Candle, i) => {
      this.ctx.strokeStyle =
        c > o
          ? (this.options.candleColorB as string)
          : (this.options.candleColorS as string);

      this.ctx.lineWidth =
        (widthPercent / 100) * (this.options.lineWidth as number);

      const xPoint = i * widthPercent + widthPercent / 2;
      const yOpenPoint = o;
      const yCPoint = yOpenPoint === c ? c + this.ctx.lineWidth : c;

      this.ctx.beginPath();
      this.ctx.moveTo(xPoint, h);
      this.ctx.lineTo(xPoint, l);
      this.ctx.stroke();

      this.ctx.lineWidth =
        (widthPercent / 100) * (100 - (this.options.margin as number));
      this.ctx.beginPath();
      this.ctx.moveTo(xPoint, yOpenPoint);
      this.ctx.lineTo(xPoint, yCPoint);
      this.ctx.stroke();
    });
  }
}
