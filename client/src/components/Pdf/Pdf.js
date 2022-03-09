
import { jsPDF } from "jspdf";
const doc = new jsPDF();

export default {
  name: 'Pdf',
  methods: {
    exportPdf: function (event) { 
      doc.text("Rapport", 10, 10);

      doc.save("Rapport"+1+".pdf");

    }
  }
}
