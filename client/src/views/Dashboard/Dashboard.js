import DashboardService from '@/services/DashboardService';

export default {
  name: "Dashboard",

  data() {
    return {
      image: null,
      showSelectChart: false,
      showSelectAxes: false,
      titles: [],
      usersId: [],
      typeChart: null,
      axisX: null,
      axisY: null,
      selectUserId: null
    }
  },

  mounted() {
    this.createChart();
  },

  methods: {
    async uploadImage(e) {
      this.image = e.target.files[0];
    },

    async upload() {
      this.read().then(
        data => {
          this.titles = data.split('\n')[0].split(',');
          this.showSelectChart = true;

          let arrayLine = data.split('\n');
          arrayLine.shift();

          arrayLine.forEach(element => {
            element = element.split(',')[1];
            if (this.usersId.indexOf(element) === -1) {
              this.usersId.push(element)
            }
          });
          console.log(this.usersId);
        }
      );
    },

    async read() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(this.image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    async selectChart(type) {
      this.showSelectChart = false;
      this.typeChart = type;
      this.showSelectAxes = true;
    },

    async createChart() {
      var ctx = document.getElementById('turnover').getContext('2d'); //Structure du graphique chiffre d'affaires
      const chartTurnover = new Chart(ctx, {
        type: 'line',
        data: {
          labels: '',
          datasets: [{
            label: 'Chiffre d\'affaires',
            data: '',
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
