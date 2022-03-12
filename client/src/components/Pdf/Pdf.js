import { jsPDF } from "jspdf";
import PdfService from "@/services/PdfService";
const doc = new jsPDF();

export default {
  name: 'Pdf',
  props: ['values', 'charts'],
  data() {
    return {
      namePdf: ''
    }
  },
  methods: {
    exportPdf: function (event) {
      if (this.namePdf !== '') {
        var reportValues = [];
        var labels = [];
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        const worksheet = this.values[0];
        var ReportName = this.namePdf + " - Report " + date;
        let commentHydratant = document.getElementById('CommentHydratant').value;
        let commentAntiOxydant = document.getElementById('CommentAntiOxydant').value;
        let commentBarriere = document.getElementById('CommentBarriere').value;

        for (let z in worksheet) {
          if (worksheet[0][z].toString() == "value_product_code") {
            let indexProductCode = z;
            let indexNameProduct = ++z;
            for (let y in worksheet) {
              if (reportValues.includes(worksheet[y][indexProductCode]) == false && worksheet[y][indexProductCode] !== undefined && Number.isInteger(worksheet[y][indexProductCode])) {
                var obj = {};
                obj['code'] = worksheet[y][indexProductCode];
                obj['name'] = worksheet[y][indexNameProduct];
                reportValues.push(obj);
              }
            }
          }
        }
        for (let i = 0; i < reportValues.length; i++) {
          labels.push(reportValues[i]['name']);
        }
        function ProductPage(chart){
          let image_bg = new Image();
          image_bg.src = require('../../assets/img/pdf/report-bg.png')
          doc.addImage(image_bg, 'PNG', 80, 8, 80, 80);

          let imagem = new Image();
          imagem.src = require('../../assets/img/pdf/Logo-WB.png')
          doc.addImage(imagem, 'PNG', 162, 5, 30, 37);

          doc.setFont(undefined, "normal");
          doc.setFillColor(143, 223, 204)
          doc.rect(49, 0, 400, 5, 'F')
          doc.setFillColor(33, 42, 44)
          doc.roundedRect(100, 50, 150, 48, 2, 2, 'F')


          let img_comment = new Image();
          img_comment.src = require('../../assets/img/pdf/Vector.png')
          doc.addImage(img_comment, 'PNG', 105, 56, 5, 5);

          doc.setFillColor(246, 247, 247)
          doc.rect(0, 110, 800, 35, 'F')
          doc.setFontSize(15).setFont(undefined, "bold")
          doc.text("Avis global", 25, 128)

          doc.setFillColor(143, 223, 204)
          doc.rect(80, 152, 10, 3, 'F')
          doc.setFontSize(7).setFont(undefined, "bold")
          doc.text(labels[0], 93, 154)
          doc.setFillColor(150, 167, 228)
          doc.rect(120, 152, 10, 3, 'F')
          doc.text(labels[1], 133, 154)

          doc.setFillColor(33, 42, 44)
          doc.rect(0, 282, 800, 15, 'F')
          doc.setTextColor('#FFF').setFont(undefined, "bold").setFontSize(15)
          doc.text("1", 10, 292).setFont(undefined, "normal")
          doc.setFillColor(246, 247, 247)
          doc.line(14.1, 294, 14.1, 286, 'F').setFont(undefined, "normal").setFontSize(12)
          doc.text("2", 16, 292)
          doc.setFontSize(10)
          doc.text("Rapport auto-généré", 26, 291)



          doc.setTextColor('#FFF').setFontSize(16).setFont(undefined, "bold")
          doc.text("Comments", 115, 60).setFontSize(13).setFont(undefined, "normal")
          doc.text("Lorem ipsum dolor sit amet, consectetur ", 105, 68)
          doc.text("adipiscing elit. Elit integer dui pretium sed ac", 105, 72)
          doc.text("vitae, et mattis facilisis. Tincidunt nisl, orci sit", 105, 76)
          doc.text("commodo quam. Eu, aliquam, feugiat dictum", 105, 80)
          doc.text("scelerisque nam. Gravida amet eget dictum ", 105, 84)
          doc.text("fermentum pretium facilisis faucibus id", 105, 88)
          doc.text("vestibulum.", 105, 92)

          doc.setTextColor('#8fdfcc').setFontSize(20)
          doc.setFont(undefined, "bold")
          doc.text("Part A", 10, 42)
          doc.setFont(undefined, "normal")
          doc.setTextColor('#212A2C')
          doc.text("Rapport autogénéré", 10, 52);
          doc.setFont(undefined, "bold")
          doc.text("Perception " + labels[0], 10, 62);

          doc.setFontSize(10)
          doc.text("Date : ", 10, 80)
          doc.text("Place : ", 10, 88)
          doc.text("Samples Number : ", 10, 96)
          doc.setFontSize(10).setFont(undefined, "normal")
          doc.text(today.toDateString(), 20, 80)
          doc.text(" Paris", 22, 88)

          if(chart !== undefined && chart.length > 1){
            doc.addImage(chart[0][0], 'PNG', 2, 170, 100, 50);
            doc.addImage(chart[1][0], 'PNG', 110, 170, 100, 50);
          }

          let img_best = new Image();
          img_best.src = require('../../assets/img/pdf/Vector_best_points.png')
          doc.addImage(img_best, 'PNG', 25, 228, 2, 2);

          doc.setFont(undefined,"bold").setFontSize(10)
          doc.text("Strong points ", 29, 230)
          doc.text("Best Rating 6/6 ", 25, 235)
          doc.setFont(undefined,"normal")
          doc.text("Lorem ipsum dolor sit amet", 25, 240)
          doc.text("consectetur adipiscing elit. Elit", 25, 245)
          doc.text("et mattis facilisis. Tincidunt nisl.", 25, 250)

          let img_worst = new Image();
          img_worst.src = require('../../assets/img/pdf/Vector_weak_points.png')
          doc.addImage(img_worst, 'PNG', 110, 228, 2, 2);

          doc.setFont(undefined,"bold").setFontSize(10)
          doc.text("Weak points ", 114, 230)
          doc.text("Worse rating 1/6 ", 110, 235)
          doc.setFont(undefined,"normal")
          doc.text("Lorem ipsum dolor sit amet", 110, 240)
          doc.text("consectetur adipiscing elit. Elit", 110, 245)
          doc.text("et mattis facilisis. Tincidunt nisl.", 110, 250)


        }
        ProductPage(this.charts)


        if (this.charts.length > 2) {
          doc.addPage()
          doc.addImage(this.charts[2][0], 'PNG', 2, 170, 100, 50);
          doc.addImage(this.charts[3][0], 'PNG', 110, 170, 100, 50);
        }

        let pdf = doc.output("blob");

        this.base64(pdf).then(
          data => PdfService.savePdf({
            pdf: data,
            name: this.namePdf
          }).then(() => {
            this.$router.push({ name: 'Pdf' });
          })
        );

      }
    },

    async base64(pdf) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(pdf);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
  },
}

