interface ChartOption {
  margin?: number;
  lineWidth?: number;
  candleColorB?: string;
  candleColorS?: string;
  width?: number;
  height?: number;
}

export type ChartData = {
  candleData: CandleData;
  timeLineData: TimeLineData;
};

export type CandleData = Candle[];

export type TimeLineData = number[];

interface Candle {
  o: number;
  c: number;
  h: number;
  l: number;
}

export const renderChart = (
  canvas: HTMLCanvasElement,
  candleData: CandleData,
  timeLineData: TimeLineData
) => {
  canvas.width = window.innerWidth - 5;
  canvas.height = window.innerHeight / 2;

  class ChartsCandle {
    _canvas: HTMLCanvasElement;

    ctx: CanvasRenderingContext2D;

    width: number;

    height: number;

    p1H: number;

    _options: ChartOption;

    _candleData: CandleData;

    _timeLineData: TimeLineData;

    max: number;

    min: number;

    constructor(
      _canvas: HTMLCanvasElement,
      _options: ChartOption = {
        margin: 50,
        lineWidth: 5,
        candleColorB: 'red',
        candleColorS: 'blue',
      }
    ) {
      this._canvas = _canvas;
      this.ctx = _canvas.getContext('2d') as CanvasRenderingContext2D;
      this.width = _canvas.width - 50;
      this.height = _canvas.height - 50;
      this.p1H = this.height / 100;
      this._options = _options;
      this._candleData = [];
      this._timeLineData = [];
      this.max = -Infinity;
      this.min = +Infinity;
    }

    formatingValue(_candleData: CandleData) {
      let [max, min, stat, heightRate] = [-Infinity, Infinity, 0, 0];
      _candleData.forEach(({ h, l }: { h: number; l: number }) => {
        max = h > max ? h : max;
        min = !min || l < min ? l : min;
      });

      this.max = max;
      this.min = min;

      stat = max - min;

      heightRate = stat / 100;

      _candleData = _candleData.map(({ h, l, o, c }: Candle) => {
        return {
          l: (100 - (stat - (max - l)) / heightRate) * this.p1H,
          h: (100 - (stat - (max - h)) / heightRate) * this.p1H,
          o: (100 - (stat - (max - o)) / heightRate) * this.p1H,
          c: (100 - (stat - (max - c)) / heightRate) * this.p1H,
        };
      });

      return _candleData;
    }

    setData(_candleData: CandleData, _timeLineData: TimeLineData) {
      this._candleData = [
        ...this._candleData,
        ...this.formatingValue(_candleData),
      ];
      this._timeLineData = [..._timeLineData];

      return this;
    }

    cleanData() {
      this._candleData = [];
      return this;
    }

    draw() {
      const dataLen = this._candleData.length;
      const thisCandleData = this._candleData;
      const ctx = this.ctx;

      ctx.clearRect(0, 0, this.width, this.height);
      const widthPercent = this.width / dataLen;

      ctx.beginPath();
      ctx.strokeStyle = '#BBB';
      ctx.moveTo(this.width, 0);
      ctx.lineTo(this.width, this.height);
      ctx.lineTo(0, this.height);
      ctx.stroke();

      ctx.font = '10.5px Sans-serif';

      const drawPriceText = (
        context: CanvasRenderingContext2D,
        gridNum: number
      ) => {
        const BASIC_MARGIN = 10;
        const MAX_MIN_DIFF = this.max - this.min;
        context.fillText(
          `${this.max.toFixed(2)}`,
          this.width + BASIC_MARGIN,
          BASIC_MARGIN
        );

        for (let i = 1; i < gridNum; i++) {
          context.fillText(
            `${(this.max - (MAX_MIN_DIFF / gridNum) * i).toFixed(2)}`,
            this.width + BASIC_MARGIN,
            (this.height / gridNum) * i + BASIC_MARGIN / 2
          );
        }
        context.fillText(
          `${this.min.toFixed(2)}`,
          this.width + BASIC_MARGIN,
          this.height
        );
      };

      const formatDate = (dateStr: string) => {
        const [day, month, year] = dateStr.slice(0, 10).split('/');
        return `${year}.${month}-${day}`;
      };

      const drawPeriodText = (
        context: CanvasRenderingContext2D,
        gridNum: number
        // periodType = '60'
      ) => {
        const max = Math.max(...this._timeLineData) * 1000;
        const min = Math.min(...this._timeLineData) * 1000;
        const BASIC_MARGIN = 15;
        const MAX_MIN_DIFF = max - min;

        const minDay = formatDate(
          new Date(min).toLocaleString('en-GB', { timeZone: 'UTC' })
        ).split('.');

        minDay.forEach((day, idx) => {
          context.fillText(`${day}`, 0, this.height + BASIC_MARGIN * idx + 10);
        });

        for (let i = 1; i < gridNum; i++) {
          const date = formatDate(
            new Date(+(min + (MAX_MIN_DIFF / gridNum) * i)).toLocaleString(
              'en-GB',
              { timeZone: 'UTC' }
            )
          );
          const days = date.split('.');

          days.forEach((day, idx) => {
            context.fillText(
              `${day}`,
              (this.width / 6) * i - BASIC_MARGIN,
              this.height + BASIC_MARGIN * idx + 10
            );
          });
        }

        const maxDay = formatDate(
          new Date(max).toLocaleString('en-GB', { timeZone: 'UTC' })
        ).split('.');
        maxDay.forEach((day, idx) => {
          context.fillText(
            `${day}`,
            this.width - 15,
            this.height + BASIC_MARGIN * idx + 10
          );
        });
      };

      const drawGrid = (context: CanvasRenderingContext2D, gridNum: number) => {
        for (let i = 0; i < gridNum; i += 1) {
          context.beginPath();
          context.strokeStyle = '#BBB';
          context.moveTo(0, (this.height / 6) * (gridNum - i));
          context.lineTo(this.width, (this.height / 6) * (gridNum - i));
          context.stroke();

          context.beginPath();
          context.strokeStyle = '#BBB';
          context.moveTo((this.width / 6) * (gridNum - i), 0);
          context.lineTo((this.width / 6) * (gridNum - i), this.height);
          context.stroke();
        }
      };
      drawGrid(ctx, 6);
      drawPeriodText(ctx, 6);
      drawPriceText(ctx, 6);

      thisCandleData.forEach(({ c, o }, i) => {
        ctx.strokeStyle =
          c > o
            ? (this._options.candleColorB as string)
            : c < o
            ? (this._options.candleColorS as string)
            : 'white';

        const xPoint = i * widthPercent + widthPercent / 2;

        const yOpenPoint = thisCandleData[i].o;
        let yClosePoint = thisCandleData[i].c;

        ctx.lineWidth =
          (widthPercent / 100) * (this._options.lineWidth as number);

        yClosePoint =
          yOpenPoint === yClosePoint
            ? yClosePoint + ctx.lineWidth
            : yClosePoint;

        ctx.beginPath();
        ctx.moveTo(xPoint, thisCandleData[i].h);
        ctx.lineTo(xPoint, thisCandleData[i].l);
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

  candleChart.setData(candleData, timeLineData).draw();
};
