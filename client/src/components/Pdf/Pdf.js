import { jsPDF } from "jspdf";
import UsersService from '@/services/PdfService'
import PdfService from "../../services/PdfService";
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

      let pdf = doc.output("blob");

      this.base64(pdf).then(
        data => PdfService.savePdf({
          pdf: data
        }).then((response) => {
          console.log(response.data.pdf)

          let test = response.data.pdf;
          fetch(test)
            .then(res => res.blob())
            .then((blob) => {
              window.open(
                URL.createObjectURL(blob),
                "_blank",
                "height=650,width=500,scrollbars=yes,location=yes"
              );

              setTimeout(() => {
                window.URL.revokeObjectURL(blob);
              }, 100);
            })

          //
          // let pdfWindow = window.open("")
          // pdfWindow.document.write(
          //   "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          //   encodeURI(response.data.pdf) + "'></iframe>"
          // )

        })
      );



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
