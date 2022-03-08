import DashboardService from '@/services/DashboardService';

export default {
  name: "Dashboard",

  data() {
    return {
      file: null,
      fileSplit: null,
      showSelectChart: false,
      showSelectAxes: false,
      titles: [],
      usersId: [],
      typeChart: null,
      axisX: null,
      axisY: null,
      selectUserId: null,
      arrayX: [],
      arrayY: []
    }
  },

  methods: {
    async uploadFile(e) {
      this.file = e.target.files[0];
    },

    async upload() {
      this.read().then(
        data => {
          this.titles = data.split('\n')[0].split(',');
          this.showSelectChart = true;

          let arrayLine = data.split('\n');
          this.fileSplit = data.split('\n');
          arrayLine.shift();


          arrayLine.forEach(element => {
            element = element.split(',');
            element.forEach(x => {
              if (x.startsWith('WB') && this.usersId.indexOf(x) === -1) {
                this.usersId.push(x)
              }
            })
          });
        }
      );
    },

    async read() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(this.file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    async selectChart(type) {
      this.showSelectChart = false;
      this.typeChart = type;
      this.showSelectAxes = true;
    },

    async generateGraph() {
      let tmpTitles = this.fileSplit[0].split(',');

      let posX = tmpTitles.indexOf(this.axisX);
      let posY = tmpTitles.indexOf(this.axisY);

      this.fileSplit.shift();
      this.fileSplit.forEach(element => {
        let elementSplit= element.split(',');
        if (this.selectUserId !== 'all'){
          if (elementSplit.indexOf(this.selectUserId) !== -1) {
            this.arrayX.push(elementSplit[posX]);
            this.arrayY.push(elementSplit[posY]);
          }
        } else {
          this.arrayX.push(elementSplit[posX]);
          this.arrayY.push(elementSplit[posY]);
        }
      });

      await this.createChart();
      // this.createChart(this.selectUserId, this.axisX, );
    },

    async createChart() {
      var ctx = document.getElementById('turnover').getContext('2d'); //Structure du graphique chiffre d'affaires
      new Chart(ctx, {
        type: this.typeChart,
        data: {
          labels: this.arrayX,
          datasets: [{
            label: this.selectUserId,
            data: this.arrayY,
            backgroundColor: 'rgba(111,207,151,0.3)',
            borderColor: '#27AE60',
            pointBackgroundColor: '#27AE60',
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 10
          }]
        },
      })
    }
  }
}
