import AbstractClassView from './abstract-class.js';
import {
  countPriceForType,
  getCountForType,
  countDurationForType,
  formatDuration
} from '../utils/data-processing.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderChart = (container, points, countingFunction, returnedValue) => {
  const types = points.sort((a, b) => countingFunction(points, a.type) - countingFunction(points, b.type)).map((point) => point.type.toUpperCase());
  const typesNotRepeat = Array.from(new Set(types));
  const data = typesNotRepeat.map((type) => countingFunction(points, type.toLowerCase()));

  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typesNotRepeat,
      datasets: [{
        data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: returnedValue,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => {
  return `
    <section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`;
};

export default class Statistics extends AbstractClassView {
  constructor(points) {
    super();

    this._points = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  remove() {
    super.removeElement();
    if (this._moneyChart !== null) {
      this._moneyChart = null;
    }

    if (this._typeChart !== null) {
      this._typeChart = null;
    }

    if (this._timeChart !== null) {
      this._timeChart = null;
    }
  }

  restoreHandlers() {
    this._setCharts();
  }

  _getPoints() {
    return this._points.getPoints();
  }

  _setCharts() {
    if (this._moneyChart == !null) {
      this._moneyChart = null;
    }

    const BAR_HEIGHT = 55;
    const typesNotRepeatLength = Array.from(new Set(this._getPoints().map((point) => point.type))).length;
    const CTX_HEIGHT = BAR_HEIGHT * typesNotRepeatLength;

    const formatMoneyValue = (val) => `€  ${val}`;
    const formatTypeValue = (val) => `${val}x`;
    const formatTimeValue = (val) => `${formatDuration(val)}`;

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    moneyCtx.height = CTX_HEIGHT;
    this._moneyChart = renderChart(moneyCtx, this._getPoints(), countPriceForType, formatMoneyValue);


    if (this._typeChart == !null) {
      this._typeChart = null;
    }

    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    typeCtx.height = CTX_HEIGHT;
    this._typeChart = renderChart(typeCtx, this._getPoints(), getCountForType, formatTypeValue);


    if (this._timeChart == !null) {
      this._timeChart = null;
    }

    const timeCtx = this.getElement().querySelector('.statistics__chart--time');
    timeCtx.height = CTX_HEIGHT;
    this._timeChart = renderChart(timeCtx, this._getPoints(), countDurationForType, formatTimeValue);
  }
}
