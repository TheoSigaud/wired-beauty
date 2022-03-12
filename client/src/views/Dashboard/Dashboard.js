import * as XLSX from 'xlsx/xlsx.mjs';
import Pdf from '../../components/Pdf/Pdf.vue';
import Navbar from '../../components/Navbar/Navbar.vue';

export default {
  name: "Dashboard",
  components: {
    Pdf,
    Navbar
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
      showAddGraph: false,
      showOption: false,
      showCompare: false,
      showScore: false,
      pdfValues: [],
      charts: [],
      label1: '',
      label2: ''
    }
  },

  methods: {

    async uploadFile(e) {
      this.file = e.target.files[0];
      this.errorUpload = null;
      document.getElementById('NameFileUploaded').innerHTML = e.target.files[0]['name'];
    },

    async upload() {
      this.typeChart = '';
      this.typeProduct = '';
      this.typeOption = '';
      this.showSelection = false;
      this.showGenerate = false;
      this.showAddGraph = false;
      this.pdfValues = [];
      this.charts = [];
      let containerCharts = document.getElementById('containerCharts');
      containerCharts.innerHTML = '';

      let data = await this.file.arrayBuffer();
      this.workbook = XLSX.read(data);

      this.showSelection = true;
    },

    async checkGenerate() {
      if (this.typeChart === 'score') {
        this.showOption = true;
        this.showScore = true;
        this.showCompare = false;
      } else {
        this.showOption = false;
        this.showCompare = true;
        this.showScore = false;
      }

      if (this.typeChart !== ''
        && this.typeProduct !== ''
        && ((this.typeOption !== '' && this.showOption) || this.showOption === false)) {
        this.showGenerate = true;
      }else {
        this.showGenerate = false;
      } 

    },

    async generateChart() {
      await this.dataChartLine(XLSX.utils.sheet_to_json(this.workbook.Sheets.score_skinbiosense, {header: 1}));

      this.xls = XLSX.utils.sheet_to_json(this.workbook.Sheets.légende, { header: 1 });
      this.pdfValues.push(this.xls);

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

    //////////////////////
    ////   CALCUL     ////
    //////////////////////

    async quartile(array, percentile) {
      array.sort();
      let index = (percentile/100) * array.length;
      let result;
      if (Math.ceil(index) === index) {
        result = (array[(index-1)] + array[index])/2;
      }
      else {
        result = array[Math.ceil(index)];
      }
      return result;
    },

    async thirdQuartile(array) {
      console.log(Math.ceil(0.75*array.length))
      console.log(array[Math.ceil(0.75*array.length)])
      return array[Math.ceil(0.75*array.length)];
    },

    //////////////////////////////
    //      COMPARE      ////
    //////////////////////////////
    async dataChartLine(data, type) {
      let indexSkin = data[0].indexOf("score_skinbiosense");
      let indexTime = data[0].indexOf("session_id");
      let indexValue = data[0].indexOf("mesure");
      let indexProduct = data[0].indexOf("product_code");

      let dataSkc = {
        data: {
          t0: [],
          timme: [],
          t7: [],
          t14: []
        },
        average: {
          t0: [],
          timme: [],
          t7: [],
          t14: []
        }
      }

      let dataVitc = {
        data: {
          t0: [],
          timme: [],
          t7: [],
          t14: []
        },
        average: {
          t0: [],
          timme: [],
          t7: [],
          t14: []
        }
      }

      data.shift();

      data.forEach(element => {
        if (element[0] !== undefined) {
          if (element[indexSkin] === Number(this.typeProduct)) {
            switch (element[indexProduct]) {
              case 417432:
                switch (element[indexTime]) {
                  case 1:
                    dataSkc.data.t0.push(element[indexValue]);
                    break;
                  case 2:
                    dataSkc.data.timme.push(element[indexValue]);
                    break;
                  case 3:
                    dataSkc.data.t7.push(element[indexValue]);
                    break;
                  case 4:
                    dataSkc.data.t14.push(element[indexValue]);
                    break;
                }
                break;
              case 100218:
                switch (element[indexTime]) {
                  case 1:
                    dataVitc.data.t0.push(element[indexValue]);
                    break;
                  case 2:
                    dataVitc.data.timme.push(element[indexValue]);
                    break;
                  case 3:
                    dataVitc.data.t7.push(element[indexValue]);
                    break;
                  case 4:
                    dataVitc.data.t14.push(element[indexValue]);
                    break;
                }
                break;
            }
          }
        }
      });

      let arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

      dataSkc.average.t0 = arrAvg(dataSkc.data.t0);
      dataSkc.average.timme = arrAvg(dataSkc.data.timme);
      dataSkc.average.t7 = arrAvg(dataSkc.data.t7);
      dataSkc.average.t14 = arrAvg(dataSkc.data.t14);

      dataVitc.average.t0 = arrAvg(dataVitc.data.t0);
      dataVitc.average.timme = arrAvg(dataVitc.data.timme);
      dataVitc.average.t7 = arrAvg(dataVitc.data.t7);
      dataVitc.average.t14 = arrAvg(dataVitc.data.t14);


      switch (this.typeChart) {
        case 'compare':
          await this.chartLine(dataSkc.average, dataVitc.average);
          await this.chartCandle(dataSkc.data, dataVitc.data);
          break;
        case 'score':
          switch (this.typeOption) {
            case 'skc':
              await this.chartLineScore(dataSkc.average, this.typeOption);
              await this.chartCandleScore(dataSkc.data, this.typeOption);
              break;
            case 'vitc':
              await this.chartLineScore(dataVitc.average, this.typeOption);
              await this.chartCandleScore(dataVitc.data, this.typeOption);
              break;
          }
          break;
      }
    },

    async chartLine(skc, vitc) {
      let tmpPdf = [];

      let dataSkc = [skc.t0, skc.timme, skc.t7, skc.t14];
      let dataVitc = [vitc.t0, vitc.timme, vitc.t7, vitc.t14];

      let dataBetween = []

      for (let i = 0; i < dataSkc.length; i++) {
        dataBetween.push([dataVitc[i], dataSkc[i]]);
      }

      const datasetsSkc = [
        {
          label: 'Skc',
          data: dataSkc,
          borderColor: '#0dd1db',
          pointBackgroundColor: '#0dd1db',
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 10,
          borderDash: [10, 5],
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
          borderWidth: 0,
          barThickness: 5,
          order: 2,
        }
      ];

      this.label1 = datasetsSkc[0]['label'];
      this.label2 = datasetsSkc[1]['label'];


      let containerCharts;

      switch (this.typeProduct) {
        case "1":
          containerCharts = document.getElementById('ChartCompareHydratant');
          break;
        case "2":
          containerCharts = document.getElementById('ChartCompareAntiOxydant');
          break;
        case "3":
          containerCharts = document.getElementById('ChartCompareBarriere');
          break;
        default:
          containerCharts = document.getElementById('containerCharts');
      };


      let nameChart = 'chart' + this.countCharts.toString();

      this.countCharts++;

      let div = document.createElement("div");
      div.setAttribute('style', "width: 500px");
      let canvas = document.createElement("canvas");
      canvas.setAttribute('id', nameChart);

      div.append(canvas);
      containerCharts.append(div);
      const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'rgba(246,247, 247,0.6)';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };
      let ctx = document.getElementById(nameChart).getContext('2d');
      let chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['T0', 'Timme', 'T7', 'T14'],
          datasets: datasetsSkc
        },
        options: {
          animation: {
            onComplete: function () {
              tmpPdf.push(this.toBase64Image())
            }
          },
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
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time'
              },
            },
            y: {
              title: {
                display: true,
                text: 'uA.V'
              },
            }
          }
        },
        plugins: [plugin]

      });

      this.charts.push(tmpPdf);
    },

    async chartCandle(skc, vitc) {
      let tmpPdf = [];

      let dataSkcLine = [
        [Math.min(...skc.t0), Math.max(...skc.t0)],
        [Math.min(...skc.timme), Math.max(...skc.timme)],
        [Math.min(...skc.t7), Math.max(...skc.t7)],
        [Math.min(...skc.t14), Math.max(...skc.t14)]
      ];

      let dataSkcBar = [
        [await this.quartile(skc.t0, 25), await this.quartile(skc.t0, 75)],
        [await this.quartile(skc.timme, 25), await this.quartile(skc.timme, 75)],
        [await this.quartile(skc.t7, 25), await this.quartile(skc.t7, 75)],
        [await this.quartile(skc.t14, 25), await this.quartile(skc.t14, 75)]
      ];

      let dataSkcMedian = [
        [await this.quartile(skc.t0, 50), await this.quartile(skc.t0, 50)],
        [await this.quartile(skc.timme, 50), await this.quartile(skc.timme, 50)],
        [await this.quartile(skc.t7, 50), await this.quartile(skc.t7, 50)],
        [await this.quartile(skc.t14, 50), await this.quartile(skc.t14, 50)]
      ];

      let dataVitcLine = [
        [Math.min(...vitc.t0), Math.max(...vitc.t0)],
        [Math.min(...vitc.timme), Math.max(...vitc.timme)],
        [Math.min(...vitc.t7), Math.max(...vitc.t7)],
        [Math.min(...vitc.t14), Math.max(...vitc.t14)]
      ];

      let dataVitcBar = [
        [await this.quartile(vitc.t0, 25), await this.quartile(vitc.t0, 75)],
        [await this.quartile(vitc.timme, 25), await this.quartile(vitc.timme, 75)],
        [await this.quartile(vitc.t7, 25), await this.quartile(vitc.t7, 75)],
        [await this.quartile(vitc.t14, 25), await this.quartile(vitc.t14, 75)]
      ];

      let dataVitcMedian = [
        [await this.quartile(vitc.t0, 50), await this.quartile(vitc.t0, 50)],
        [await this.quartile(vitc.timme, 50), await this.quartile(vitc.timme, 50)],
        [await this.quartile(vitc.t7, 50), await this.quartile(vitc.t7, 50)],
        [await this.quartile(vitc.t14, 50), await this.quartile(vitc.t14, 50)]
      ];

      let tmpSkcAbr = {
        t0: [],
        timme: [],
        t7: [],
        t14: []
      };

      let tmpVitcAbr = {
        t0: [],
        timme: [],
        t7: [],
        t14: []
      }

      for (let i = 0; i < 4; i++) {
        let interQuartile = (await this.quartile(skc[Object.keys(skc)[i]], 75) - await this.quartile(skc[Object.keys(skc)[i]], 25));
        let abr = await this.quartile(skc[Object.keys(skc)[i]], 75) + 1.5 * interQuartile;
        skc[Object.keys(skc)[i]].forEach(element => {
          if (element > abr) {
            tmpSkcAbr[Object.keys(tmpSkcAbr)[i]].push([abr, abr]);
          }
        })
      }

      for (let i = 0; i < 4; i++) {
        let interQuartile = (await this.quartile(vitc[Object.keys(vitc)[i]], 75) - await this.quartile(vitc[Object.keys(vitc)[i]], 25));
        let abr = await this.quartile(vitc[Object.keys(vitc)[i]], 75) + 1.5 * interQuartile;
        vitc[Object.keys(vitc)[i]].forEach(element => {
          if (element > abr) {
            tmpVitcAbr[Object.keys(tmpVitcAbr)[i]].push([abr, abr]);
          }
        })
      }

      let dataSkcAbr = [
        tmpSkcAbr.t0,
        tmpSkcAbr.timme,
        tmpSkcAbr.t7,
        tmpSkcAbr.t14
      ];

      let dataVitcAbr = [
        tmpVitcAbr.t0,
        tmpVitcAbr.timme,
        tmpVitcAbr.t7,
        tmpVitcAbr.t14
      ];

      const datasetsSkc = [
        {
          label: 'hide',
          data: dataSkcAbr,
          backgroundColor: 'rgb(148,195,114)',
          borderColor: 'rgb(59,170,118)',
          minBarLength: 4,
          barPercentage: 0.04,
          stack: 'skc'
        },
        {
          label: 'hide',
          data: dataSkcMedian,
          backgroundColor: 'rgb(0,0,0)',
          minBarLength: 3,
          stack: 'skc'
        },
        {
          label: 'hide',
          data: dataVitcMedian,
          backgroundColor: 'rgb(0,0,0)',
          minBarLength: 3,
          stack: 'vitc'
        },
        {
          label: 'Skc',
          data: dataSkcBar,
          backgroundColor: 'rgb(190,45,45)',
          borderWidth: 0,
          stack: 'skc'
        },
        {
          label: 'hide',
          data: dataVitcAbr,
          backgroundColor: 'rgb(195,114,176)',
          borderColor: 'rgb(59,170,118)',
          minBarLength: 4,
          barPercentage: 0.04,
          stack: 'vitc'
        },
        {
          label: 'Vitc',
          data: dataVitcBar,
          backgroundColor: 'rgb(13,209,219)',
          borderWidth: 0,
          stack: 'vitc'
        },
        {
          label: 'hide',
          data: dataSkcLine,
          backgroundColor: 'rgb(0,0,0)',
          borderWidth: 0,
          barPercentage: 0.02,
          stack: 'skc'
        },
        {
          label: 'hide',
          data: dataVitcLine,
          backgroundColor: 'rgb(0,0,0)',
          borderWidth: 0,
          barPercentage: 0.02,
          stack: 'vitc'
        }
      ];
      let containerCharts;
      switch (this.typeProduct) {
        case '1':
          containerCharts = document.getElementById('ChartCompareHydratant');
          break;
        case '2':
          containerCharts = document.getElementById('ChartCompareAntiOxydant');
          break;
        case '3':
          containerCharts = document.getElementById('ChartCompareBarriere');
          break;
      };

      let nameChart = 'chart' + this.countCharts.toString();

      this.countCharts++;

      let div = document.createElement("div");
      div.setAttribute('style', "width: 500px");
      let canvas = document.createElement("canvas");
      canvas.setAttribute('id', nameChart);
      let chartImg = canvas.toDataURL("image/png", 1.0);
      div.append(canvas);
      containerCharts.append(div);
      const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'rgba(246,247, 247,0.6)';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };
      let ctx = document.getElementById(nameChart).getContext('2d');

      let chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['T0', 'Timme', 'T7', 'T14'],
          datasets: datasetsSkc
        },
        options: {
          animation: {
            onComplete: function () {
              tmpPdf.push(this.toBase64Image())
            }
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Time'
              },
            },
            y: {
              ticks: {
                stepSize: 0.1
              },
              stacked: false,
              title: {
                display: true,
                text: 'uA.V'
              },
            }
          },
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
        },
        plugins: [plugin]
      });

      this.charts.push(tmpPdf);
    },



    ///////////////////////
    ////   Score       ////
    ///////////////////////


    async chartLineScore(value, type) {
      let tmpPdf = [];

      let data = [value.t0, value.timme, value.t7, value.t14];

      const datasets = [
        {
          label: type,
          data: data,
          borderColor: '#c03522',
          pointBackgroundColor: '#c03522',
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 10,
          order: 0
        }
      ];
      this.showScore = true;
      let containerCharts;
      switch (this.typeProduct) {
        case '1':
          containerCharts = document.getElementById('ChartScoreHydratant');
          break;
        case '2':
          containerCharts = document.getElementById('ChartScoreAntiOxydant');
          break;
        case '3':
          containerCharts = document.getElementById('ChartscoreBarriere');
          break;
      };

      let nameChart = 'chart' + this.countCharts.toString();

      this.countCharts++;

      let div = document.createElement("div");
      div.setAttribute('style', "width: 500px");
      let canvas = document.createElement("canvas");
      canvas.setAttribute('id', nameChart);

      div.append(canvas);
      containerCharts.append(div);
      const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'rgba(246,247, 247,0.6)';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };
      let ctx = document.getElementById(nameChart).getContext('2d');

      let chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['T0', 'Timme', 'T7', 'T14'],
          datasets: datasets
        },
        options: {
          animation: {
            onComplete: function () {
              tmpPdf.push(this.toBase64Image())
            }
          },
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
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time'
              },
            },
            y: {
              title: {
                display: true,
                text: 'uA.V'
              },
            }
          }
        },
        plugins: [plugin]
      });

      this.charts.push(tmpPdf);
    },

    async chartCandleScore(value, type) {
      let tmpPdf = [];

      let dataLine = [
        [Math.min(...value.t0), Math.max(...value.t0)],
        [Math.min(...value.timme), Math.max(...value.timme)],
        [Math.min(...value.t7), Math.max(...value.t7)],
        [Math.min(...value.t14), Math.max(...value.t14)]
      ];

      let dataBar = [
        [await this.quartile(value.t0, 25), await this.quartile(value.t0, 75)],
        [await this.quartile(value.timme, 25), await this.quartile(value.timme, 75)],
        [await this.quartile(value.t7, 25), await this.quartile(value.t7, 75)],
        [await this.quartile(value.t14, 25), await this.quartile(value.t14, 75)]
      ];

      let dataMedian = [
        [await this.quartile(value.t0, 50), await this.quartile(value.t0, 50)],
        [await this.quartile(value.timme, 50), await this.quartile(value.timme, 50)],
        [await this.quartile(value.t7, 50), await this.quartile(value.t7, 50)],
        [await this.quartile(value.t14, 50), await this.quartile(value.t14, 50)]
      ];


      const datasets = [
        {
          label: 'hide',
          data: dataMedian,
          backgroundColor: 'rgb(0,0,0)',
          minBarLength: 3,
          stack: type
        },
        {
          label: 'Skc',
          data: dataBar,
          backgroundColor: 'rgb(190,45,45)',
          borderWidth: 0,
          stack: type
        },
        {
          label: 'hide',
          data: dataLine,
          backgroundColor: 'rgb(0,0,0)',
          borderWidth: 0,
          barPercentage: 0.02,
          stack: type
        }
      ];
      let containerCharts;
      switch (this.typeProduct) {
        case '1':
          containerCharts = document.getElementById('ChartCompareHydratant');
          break;
        case '2':
          containerCharts = document.getElementById('ChartCompareAntiOxydant');
          break;
        case '3':
          containerCharts = document.getElementById('ChartCompareBarriere');
          break;
      };


      let nameChart = 'chart' + this.countCharts.toString();

      this.countCharts++;

      let div = document.createElement("div");
      div.setAttribute('style', "width: 500px");
      let canvas = document.createElement("canvas");
      canvas.setAttribute('id', nameChart);
      let textarea = document.createElement("textarea");
      textarea.setAttribute('placeholder', 'Commentaires');

      div.append(canvas);
      div.append(textarea);
      containerCharts.append(div);
      const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'rgba(246,247, 247,0.6)';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };
      let ctx = document.getElementById(nameChart).getContext('2d');

      let chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['T0', 'Timme', 'T7', 'T14'],
          datasets: datasets
        },
        options: {
          animation: {
            onComplete: function () {
              tmpPdf.push(this.toBase64Image())
            }
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Time'
              },
            },
            y: {
              ticks: {
                stepSize: 0.1
              },
              stacked: false,
              title: {
                display: true,
                text: 'uA.V'
              },
            }
          },
          plugins: {
            legend: {
              position: 'right',
              labels: {
                filter: function (item, chart) {
                  return !item.text.includes('hide');
                }
              }
            }
          },
        },
        plugins: [plugin]
      });
      this.charts.push(tmpPdf);
    }
  }
}
