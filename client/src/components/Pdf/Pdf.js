import { jsPDF } from "jspdf";
const doc = new jsPDF();

export default {
  name: 'Pdf',
  props: ['values'],
  methods: {
    exportPdf: function (event) {
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
      var today = new Date();
      var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      let product = this.values.product;
      doc.text("Comparer Moyenne" + labels[0] + "&" + labels[1] + "de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début", 10, 15);
      doc.setFontSize(10);
      doc.addImage(this.values[0][0].toString(), 'png', 10, 30, 100, 100);
      doc.save("Data Vision - Rapport du " + date + ".pdf");


    }
  }
}
