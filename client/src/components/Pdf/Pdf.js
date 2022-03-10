
import { jsPDF } from "jspdf";
const doc = new jsPDF();

export default {
  name: 'Pdf',
  methods: {
    exportPdf: function (event) { 
      let product = document.getElementById("typeProduct").options[this.selectedIndex].text;
      let chart = document.getElementById("typeChart").options[this.selectedIndex].text;
      let option = document.getElementById("typeOption").options[this.selectedIndex].text;

      if(true){
        doc.text("Comparer Moyenne de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début", 10, 10);
      }
      doc.text("Comparer Moyenne"+ +"de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début", 10, 10);
      doc.save("Rapport"+doc+".pdf");
      
    }
  }
}
