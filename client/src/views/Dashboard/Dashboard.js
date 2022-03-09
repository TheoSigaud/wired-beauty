import DashboardService from '@/services/DashboardService';
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
  name: "Dashboard",

  data() {
    return {
      chart: null,
      file: null,
      errorUpload: null,
    }
  },

  methods: {

    async uploadFile(e) {
      this.file = e.target.files[0];
      this.errorUpload = null;
    },

    async upload() {
      const data = await this.file.arrayBuffer();
      const workbook = XLSX.read(data);

      await this.dataMoisturizingChartLine(XLSX.utils.sheet_to_json(workbook.Sheets.Vivo, { header: 1 }));
    },


    //////////////////////////////
    //      MOISTURIZING      ////
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
            if (element[indexSkin] === 2) {
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
      const dataSkc = [skc.t0, skc.timme, skc.t7, skc.t14];
      const dataVitc = [vitc.t0, vitc.timme, vitc.t7, vitc.t14];

      const dataBetween = []

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


      let ctx = document.getElementById('moisturizingChartLine').getContext('2d'); //Structure du graphique chiffre d'affaires
      this.chart = new Chart(ctx, {
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
                  // Logic to remove a particular legend item goes here
                  return !item.text.includes('hide');
                }
              }
            }
          }
        }
      })
    }
  }
}
