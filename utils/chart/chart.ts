import { formatDate } from 'utils/formatDate';
import { Candle, CandleData, ChartData, ChartOption } from 'utils/chart/types';

export default class Chart {
  ctx: CanvasRenderingContext2D;

  width: number;

  height: number;

  type: string;

  chartData: ChartData;

  option: ChartOption;

  maxPrice: number;

  minPrice: number;

  maxPeriod: number;

  minPeriod: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    {
      type,
      data,
      option,
    }: { type: string; data: ChartData; option?: Partial<ChartOption> }
  ) {
    this.ctx = ctx;
    this.width = ctx.canvas.width - 100; //50;
    this.height = ctx.canvas.height - 100; //50;
    this.type = type;
    this.option = {
      margin: 30,
      lineWidth: 5,
      gridLineWidth: 1,
      candleColorB: 'red',
      candleColorS: 'blue',
      axisColor: '#bbb',
      font: '1.8rem Sans-serif',
      spacing: 25,
      ...option,
    };
    this.maxPrice = Math.max(...data.candleData.map(({ h }) => h));
    this.minPrice = Math.min(...data.candleData.map(({ l }) => l));
    this.maxPeriod = data.timeLineData[data.timeLineData.length - 1] * 1000;
    this.minPeriod = data.timeLineData[0] * 1000;
    this.chartData = {
      candleData: this.formatingData(data.candleData),
      timeLineData: data.timeLineData,
    };

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

  // drawXYAxis() {
  //   this.ctx.beginPath();
  //   this.ctx.strokeStyle = this.option.axisColor;
  //   this.ctx.moveTo(this.width, 0);
  //   this.ctx.lineTo(this.width, this.height);
  //   this.ctx.lineTo(0, this.height);
  //   this.ctx.stroke();
  // }

  drawYAxisText(gridNum: number) {
    const XAXIS_MARGIN = 8;
    const YAXIS_MARGIN = 4.5;
    const MAX_MIN_DIFF = this.maxPrice - this.minPrice;

    for (let i = 0; i <= gridNum; i++) {
      this.ctx.fillText(
        `${(this.maxPrice - (MAX_MIN_DIFF / gridNum) * i).toFixed(2)}`,
        this.width + XAXIS_MARGIN + this.option.spacing,
        (this.height / gridNum) * i + YAXIS_MARGIN + this.option.spacing
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
        (this.width / gridNum) * i + this.option.spacing - XAXIS_MARGIN,
        this.height + this.option.spacing + YAXIS_MARGIN
      );
      this.ctx.fillText(
        month,
        (this.width / gridNum) * i + this.option.spacing - XAXIS_MARGIN,
        this.height + this.option.spacing + TEXT_MARGIN + YAXIS_MARGIN
      );
    }
  }

  drawGrid(gridNum: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.option.axisColor;
    this.ctx.lineWidth = this.option.gridLineWidth;

    for (let i = 0; i <= gridNum; i++) {
      this.ctx.moveTo(
        this.option.spacing,
        (this.height / gridNum) * (gridNum - i) + this.option.spacing
      );
      this.ctx.lineTo(
        this.width + this.option.spacing,
        (this.height / gridNum) * (gridNum - i) + this.option.spacing
      );
      this.ctx.moveTo(
        (this.width / gridNum) * (gridNum - i) + this.option.spacing,
        this.option.spacing
      );
      this.ctx.lineTo(
        (this.width / gridNum) * (gridNum - i) + this.option.spacing,
        this.height + this.option.spacing
      );
    }

    this.ctx.stroke();
  }

  drawCandle() {
    const { candleData } = this.chartData;
    const widthPercent = this.width / candleData.length;

    candleData.forEach(({ o, h, l, c }: Candle, i) => {
      this.ctx.strokeStyle =
        c > o ? this.option.candleColorB : this.option.candleColorS;

      this.ctx.lineWidth = (widthPercent / 100) * this.option.lineWidth;

      const xPoint = i * widthPercent + widthPercent / 2;
      const yOpenPoint = o;
      const yCPoint = yOpenPoint === c ? c + this.ctx.lineWidth : c;

      this.ctx.beginPath();
      this.ctx.moveTo(xPoint + this.option.spacing, h + this.option.spacing);
      this.ctx.lineTo(xPoint + this.option.spacing, l + this.option.spacing);
      this.ctx.stroke();

      this.ctx.lineWidth = (widthPercent / 100) * (100 - this.option.margin);
      this.ctx.beginPath();
      this.ctx.moveTo(
        xPoint + this.option.spacing,
        yOpenPoint + this.option.spacing
      );
      this.ctx.lineTo(
        xPoint + this.option.spacing,
        yCPoint + this.option.spacing
      );
      this.ctx.stroke();
    });
  }

  drawLine() {
    const { candleData } = this.chartData;
    const widthPercent = this.width / candleData.length;

    this.ctx.beginPath();

    candleData.forEach(({ c }: { c: number }, i) => {
      const xPoint = i * widthPercent + widthPercent / 2;

      this.ctx.strokeStyle = 'blue';
      this.ctx.lineTo(xPoint + this.option.spacing, c + this.option.spacing);
    });

    this.ctx.stroke();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.font = this.option.font;

    this.drawGrid(6);
    this.drawXAxisText(6);
    this.drawYAxisText(6);

    if (this.type === 'candle') {
      this.drawCandle();
    } else if (this.type === 'line') {
      this.drawLine();
    }
  }
}
