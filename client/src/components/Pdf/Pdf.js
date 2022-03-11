import { jsPDF } from "jspdf";
const doc = new jsPDF();

export default {
  name: 'Pdf',
  props: ['values'], 
  methods: {
    exportPdf: function (event) { 
      var reportValues = [];
      var labels = [];
      var today = new Date();
      var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      const worksheet = this.values[2];
      var ReportName = "[WB]Report " + date;
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

      let product = this.values.product;
      doc.rect(10,10,100,100,'F')
      
      if(true){
        doc.text("Report :  Date début", 10, 15);
        doc.text("Comparer Moyenne" + labels[0] + "&" + labels[1] + "de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début", 10, 15);
        doc.text("Comparer Moyenne" + labels[0] + "&" + labels[1] + "de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début", 10, 15);
        doc.text("Comparer Moyenne" + labels[0] + "&" + labels[1] + "de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début", 10, 15);
      }
      if(true){
        doc.text("Report :  Date début", 10, 15);
        doc.text("Comparer Moyenne" + labels[0] + "&" + labels[1] + "de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début", 10, 15);
      } 
      doc.setFontSize(5);
      doc.canvas.toDataURL(this.values[0][0].toString(), 'png', 10, 30, 100, 100);
      if (commentHydratant !== ""){doc.text(commentHydratant);}
      if (commentAntiOxydant !== ""){doc.text(commentAntiOxydant);}
      if (commentBarriere !== ""){doc.text(commentBarriere);} 
      doc.save(ReportName+".pdf");


    }
  }
}
