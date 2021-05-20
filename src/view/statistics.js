import AbstractClassView from './abstract-class.js';
//import Chart from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HIDE_CLASS } from '../const.js';

// const renderMoneyChart = (moneyCtx, labelsArr, ) => {

// }

// const renderTypeChart = (typeCtx, labelsArr, ) => {

// }

// const renderTimeChart = (timeCtx, labelsArr, ) => {

// }

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

    // this._moneyChart = null;
    // this._typeChart = null;
    // this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _getPoints() {
    return this._points.getPoints();
  }

  show() {
    if (this.getElement().classList.contains(HIDE_CLASS)) {
      this.getElement().classList.remove(HIDE_CLASS);
    }
  }

  hide() {
    if (!this.getElement().classList.contains(HIDE_CLASS)) {
      this.getElement().classList.add(HIDE_CLASS);
    }
  }

  _setCharts() {
    // const moneyCtx = document.querySelector('.statistics__chart--money');
    // const typeCtx = document.querySelector('.statistics__chart--transport');
    // const timeCtx = document.querySelector('.statistics__chart--time');
  }
}
