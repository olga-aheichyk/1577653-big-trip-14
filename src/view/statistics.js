import AbstractClassView from './abstract-class.js';
import {
  countPriceForType,
  countCountForType,
  countDurationForType,
  formatDuration
} from '../utils/data-processing.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const renderMoneyChart = (moneyCtx, points) => {
  const sortedTypes = points.sort((a, b) => countPriceForType(points, a.type) - countPriceForType(points, b.type))
    .map((point) => point.type.toUpperCase());
  const sortedTypesNotRepeat = Array.from(new Set(sortedTypes));
  const data = sortedTypesNotRepeat.map((type) => countPriceForType(points, type.toLowerCase()));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTypesNotRepeat,
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
          formatter: (val) => `€  ${val}`,
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

const renderTypeChart = (typeCtx, points) => {
  const sortedTypes = points.sort((a, b) => countCountForType(points, a.type) - countCountForType(points, b.type)).map((point) => point.type.toUpperCase());
  const sortedTypesNotRepeat = Array.from(new Set(sortedTypes));
  const data = sortedTypesNotRepeat.map((type) => countCountForType(points, type.toLowerCase()));


  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTypesNotRepeat,
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
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
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

const renderTimeChart = (timeCtx, points) => {
  const sortedTypes = points.sort((a, b) => countDurationForType(points, a.type) - countDurationForType(points, b.type))
    .map((point) => point.type.toUpperCase());
  const sortedTypesNotRepeat = Array.from(new Set(sortedTypes));
  const data = sortedTypesNotRepeat.map((type) => countDurationForType(points, type.toLowerCase()));

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTypesNotRepeat,
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
          formatter: (val) => `${formatDuration(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME-SPENT',
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

  _getPoints() {
    return this._points.getPoints();
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

  _setCharts() {
    if (this._moneyChart == !null) {
      this._moneyChart = null;
    }

    const BAR_HEIGHT = 55;


    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    moneyCtx.height = BAR_HEIGHT * 7;
    this._moneyChart = renderMoneyChart(moneyCtx, this._getPoints());


    if (this._typeChart == !null) {
      this._typeChart = null;
    }

    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    typeCtx.height = BAR_HEIGHT * 7;
    this._typeChart = renderTypeChart(typeCtx, this._getPoints());


    if (this._timeChart == !null) {
      this._timeChart = null;
    }

    const timeCtx = this.getElement().querySelector('.statistics__chart--time');
    timeCtx.height = BAR_HEIGHT * 7;
    this._timeChart = renderTimeChart(timeCtx, this._getPoints());
  }
}
