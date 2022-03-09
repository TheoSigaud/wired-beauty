import DashboardService from '@/services/DashboardService';
import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';

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
      console.log(workbook);
    },

    async createChart() {

      if (this.chart !== null) {
        this.chart.destroy();
      }
      let ctx = document.getElementById('graph').getContext('2d'); //Structure du graphique chiffre d'affaires
      this.chart = new Chart(ctx, {
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
        options: {
          maintainAspectRatio: true
        }
      })
    }
  }
}
