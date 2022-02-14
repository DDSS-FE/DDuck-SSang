interface ChartOption {
  margin?: number;
  lineWidth?: number;
  candleColorB?: string;
  candleColorS?: string;
  width?: number;
  height?: number;
}

export type ChartData = Candle[]; //| Line[] | null;

interface Candle {
  o: number;
  c: number;
  h: number;
  l: number;
}

export const renderChart = (
  canvas: HTMLCanvasElement,
  candleData: ChartData
) => {
  console.log(candleData);
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 50;

  class ChartsCandle {
    _canvas: HTMLCanvasElement;

    ctx: CanvasRenderingContext2D;

    width: number;

    height: number;

    p1H: number;

    _options: ChartOption;

    data: ChartData;

    constructor(
      _canvas: HTMLCanvasElement,
      _options: ChartOption = {
        margin: 20,
        lineWidth: 5,
        candleColorB: 'red',
        candleColorS: 'blue',
      }
    ) {
      this._canvas = _canvas;
      this.ctx = _canvas.getContext('2d') as CanvasRenderingContext2D;
      this.width = _canvas.width;
      this.height = _canvas.height;
      this.p1H = this.height / 100;
      this._options = _options;
      this.data = [];
    }

    formating(data: ChartData) {
      let [max, min, stat, heightRate] = [-Infinity, Infinity, 0, 0];

      data.forEach(({ h, l }: { h: number; l: number }) => {
        max = h > max ? h : max;
        min = !min || l < min ? l : min;
      });

      stat = max - min;

      heightRate = stat / 100;

      data = data.map(({ h, l, o, c }: Candle) => {
        return {
          l: (100 - (stat - (max - l)) / heightRate) * this.p1H,
          h: (100 - (stat - (max - h)) / heightRate) * this.p1H,
          o: (100 - (stat - (max - o)) / heightRate) * this.p1H,
          c: (100 - (stat - (max - c)) / heightRate) * this.p1H,
        };
      });

      return data;
    }

    setData(data: ChartData) {
      this.data = [...this.data, ...this.formating(data)];
      return this;
    }

    cleanData() {
      this.data = [];
      return this;
    }

    draw() {
      const dataLen = this.data.length;
      const data = this.data;
      const ctx = this.ctx;

      ctx.clearRect(0, 0, this.width, this.height);
      const widthPercent = this.width / dataLen;

      data.forEach(({ c, o }, i) => {
        ctx.strokeStyle =
          c > o
            ? (this._options.candleColorB as string)
            : c < o
            ? (this._options.candleColorS as string)
            : 'white';

        const xPoint = i * widthPercent + widthPercent / 2;

        const yOpenPoint = data[i].o;
        let yClosePoint = data[i].c;

        ctx.lineWidth =
          (widthPercent / 100) * (this._options.lineWidth as number);

        yClosePoint =
          yOpenPoint === yClosePoint
            ? yClosePoint + ctx.lineWidth
            : yClosePoint;

        ctx.beginPath();
        ctx.moveTo(xPoint, data[i].h);
        ctx.lineTo(xPoint, data[i].l);
        ctx.stroke();

        ctx.lineWidth =
          (widthPercent / 100) * (100 - (this._options.margin as number));
        ctx.beginPath();
        ctx.moveTo(xPoint, yOpenPoint);
        ctx.lineTo(xPoint, yClosePoint);
        ctx.stroke();
      });

      return this;
    }

    options(option: ChartOption) {
      this.width = option.width as number;
      this.height = option.height as number;

      return this;
    }
  }

  const candleChart = new ChartsCandle(canvas);

  candleChart.setData(candleData).draw();
};
