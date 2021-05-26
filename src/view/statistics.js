import AbstractClassView from './abstract-class.js';
import {
  countPriceForType,
  countCountsForType,
  countDurationsForType,
  formatDuration
} from '../utils/data-processing.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HIDE_CLASS } from '../const.js';


const renderMoneyChart = (moneyCtx, points) => {
  const types = points.map((point) => point.type.toUpperCase());
  const typesNotRepeat = Array.from(new Set(types));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typesNotRepeat,
      datasets: [{
        data: typesNotRepeat.map((type) => countPriceForType(points, type.toLowerCase())),
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
  })

}

const renderTypeChart = (typeCtx, points) => {
  const types = points.map((point) => point.type.toUpperCase());
  const typesNotRepeat = Array.from(new Set(types));

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typesNotRepeat,
      datasets: [{
        data: typesNotRepeat.map((type) => countCountsForType(points, type.toLowerCase())),
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
}

const renderTimeChart = (timeCtx, points) => {
  const types = points.map((point) => point.type.toUpperCase());
  const typesNotRepeat = Array.from(new Set(types));

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typesNotRepeat,
      datasets: [{
        data: typesNotRepeat.map((type) => countDurationsForType(points, type.toLowerCase())),
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
}

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
    // this._timeChart = null;

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
  }

  // show() {
  //   if (this.getElement().classList.contains(HIDE_CLASS)) {
  //     this.getElement().classList.remove(HIDE_CLASS);
  //   }
  // }

  // hide() {
  //   if (!this.getElement().classList.contains(HIDE_CLASS)) {
  //     this.getElement().classList.add(HIDE_CLASS);
  //   }
  // }

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

    // const types = Array.from(new Set(this._getPoints().map((point) => point.type)));
    // const prices = types.map((type) => countPriceForType(this._getPoints(), type))
    // console.log(prices);

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
