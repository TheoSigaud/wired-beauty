import { jsPDF } from "jspdf";
import PdfService from "@/services/PdfService";
const doc = new jsPDF();

export default {
  name: 'Pdf',
  props: ['values'],

  data() {
    return {
      namePdf: ''
    }
  },

  methods: {
    exportPdf: function (event) {

      if (this.namePdf !== '') {
        const columnValues = [];
        const labels = [];
        const worksheet = this.values[1];
        for (let z in worksheet) {
          if (worksheet[0][z].toString() == "value_product_code") {
            let indexProductCode = z;
            let indexNameProduct = ++z;
            for (let y in worksheet) {
              if (columnValues.includes(worksheet[y][indexProductCode]) == false && worksheet[y][indexProductCode] !== undefined && Number.isInteger(worksheet[y][indexProductCode])) {
                var obj = {};
                obj['code'] = worksheet[y][indexProductCode];
                obj['name'] = worksheet[y][indexNameProduct];
                columnValues.push(obj);
              }
            }
          }
        }
        for (let i = 0; i < columnValues.length; i++) {
          labels.push(columnValues[i]['name']);
        }

        doc.text("Comparer Moyenne" + labels[0] + "&" + labels[1] + "de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début", 10, 15);
        doc.setFontSize(10);
        doc.addImage(this.values[0][0].toString(), 'png', 10, 30, 100, 100);

        let pdf = doc.output("blob");

        this.base64(pdf).then(
          data => PdfService.savePdf({
            pdf: data,
            name: this.namePdf
          }).then(() => {
            this.$router.push({name: 'Pdf'});
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
  }
}
