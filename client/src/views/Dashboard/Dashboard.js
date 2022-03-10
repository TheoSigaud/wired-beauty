import DashboardService from '@/services/DashboardService';
import * as XLSX from 'xlsx/xlsx.mjs';
import {empty} from "nightwatch/lib/core/queue";
import Pdf from '../../components/Pdf/Pdf.vue';

export default {
  name: "Dashboard",
  components:{
    Pdf
  },
  data() {
    return {
      charts: [],
      countCharts: 0,
      file: null,
      errorUpload: null,
      workbook: null,
      typeChart: '',
      typeProduct: '',
      typeOption: '',
      showSelection: false,
      showGenerate: false,
      showAddGraph: false
    }
  },

  methods: {

    async uploadFile(e) {
      this.file = e.target.files[0];
      this.errorUpload = null;
    },

    async upload() {
      this.charts = [];
      this.typeChart = '';
      this.typeProduct = '';
      this.typeOption = '';
      this.showSelection = false;
      this.showGenerate = false;
      this.showAddGraph = false;

      let containerCharts = document.getElementById('containerCharts');
      containerCharts.innerHTML = '';

      let data = await this.file.arrayBuffer();
      this.workbook = XLSX.read(data);

      this.showSelection = true;
    },

    async checkGenerate() {
      if (this.typeChart !== ''
        && this.typeProduct !== ''
        && this.typeOption !== ''){
        this.showGenerate = true;
      }
    },

    async generateChart() {
      switch (this.typeChart) {
        case 'compare':
          await this.dataMoisturizingChartLine(XLSX.utils.sheet_to_json(this.workbook.Sheets.Vivo, { header: 1 }));
          break
      }

      this.typeChart = '';
      this.typeProduct = '';
      this.typeOption = '';
      this.showSelection = false;
      this.showGenerate = false;

      this.showAddGraph = true;
    },

    async addGraph() {
      this.showSelection = true;
    },


    //////////////////////////////
    //      COMPARE      ////
    //////////////////////////////
    async dataMoisturizingChartLine(data) {
        let indexSkin = data[0].indexOf("score_skinbiosense");
        let indexTime = data[0].indexOf("session_id");
        let indexValue = data[0].indexOf("mesure");
        let indexProduct = data[0].indexOf("product_code");

        let dataSkc = {
          t0: [],
          timme: [],
          t7: [],
          t14: []
        }

      let dataVitc = {
        t0: [],
        timme: [],
        t7: [],
        t14: []
      }

        data.shift();

        data.forEach(element => {
          if (element[0] !== undefined) {
            if (element[indexSkin] === Number(this.typeProduct)) {
              switch (element[indexProduct]) {
                case 417432:
                  switch (element[indexTime]) {
                    case 1:
                      dataSkc.t0.push(element[indexValue]);
                      break;
                    case 2:
                      dataSkc.timme.push(element[indexValue]);
                      break;
                    case 3:
                      dataSkc.t7.push(element[indexValue]);
                      break;
                    case 4:
                      dataSkc.t14.push(element[indexValue]);
                      break;
                  }
                  break;
                case 100218:
                  switch (element[indexTime]) {
                    case 1:
                      dataVitc.t0.push(element[indexValue]);
                      break;
                    case 2:
                      dataVitc.timme.push(element[indexValue]);
                      break;
                    case 3:
                      dataVitc.t7.push(element[indexValue]);
                      break;
                    case 4:
                      dataVitc.t14.push(element[indexValue]);
                      break;
                  }
                  break;
              }
            }
          }
        });

      let arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

      dataSkc.t0 = arrAvg(dataSkc.t0);
      dataSkc.timme = arrAvg(dataSkc.timme);
      dataSkc.t7 = arrAvg(dataSkc.t7);
      dataSkc.t14 = arrAvg(dataSkc.t14);

      dataVitc.t0 = arrAvg(dataVitc.t0);
      dataVitc.timme = arrAvg(dataVitc.timme);
      dataVitc.t7 = arrAvg(dataVitc.t7);
      dataVitc.t14 = arrAvg(dataVitc.t14);

      await this.moisturizingChartLine(dataSkc, dataVitc);
    },

    async moisturizingChartLine(skc, vitc) {
      let dataSkc = [skc.t0, skc.timme, skc.t7, skc.t14];
      let dataVitc = [vitc.t0, vitc.timme, vitc.t7, vitc.t14];

      let dataBetween = []

      for (let i = 0; i < dataSkc.length; i++) {
        dataBetween.push([dataVitc[i], dataSkc[i]]);
      }

      const datasetsSkc = [
        {
          label: 'SKC',
          data: dataSkc,
          borderColor: '#0dd1db',
          pointBackgroundColor: '#0dd1db',
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 10,
          borderDash: [10,5],
          order: 1,
          type: 'line'
        },
        {
          label: 'Vitc',
          data: dataVitc,
          borderColor: '#c03522',
          pointBackgroundColor: '#c03522',
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 10,
          order: 0,
          type: 'line'
        },
        {
          label: 'hide',
          data: dataBetween,
          backgroundColor: 'rgba(111,207,151,0.3)',
          pointBackgroundColor: '#27AE60',
          borderWidth: 0,
          barThickness: 5,
          order: 2,
        }
      ];

      let containerCharts = document.getElementById('containerCharts');

      let nameChart = 'chart'+this.countCharts.toString();

      this.countCharts++;

      let div = document.createElement("div");
      div.setAttribute('style', "width: 1000px");
      let canvas = document.createElement("canvas");
      canvas.setAttribute('id', nameChart);

      div.append(canvas);
      containerCharts.append(div);

      let ctx = document.getElementById(nameChart).getContext('2d');

      let chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['T0', 'Timme', 'T7', 'T14'],
          datasets: datasetsSkc
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                filter: function (item, chart) {
                  return !item.text.includes('hide');
                }
              }
            }
          }
        }
      });

      this.charts.push(chart.toBase64Image());
    }
  }
}
