import PdfService from '@/services/PdfService'
import {getAuth, onAuthStateChanged} from "firebase/auth";
const auth = getAuth();

export default {
  name: 'Users',
  data () {
    return {
      reports: []
    }
  },

  mounted () {
    this.getReports();
  },

  methods: {
    async getReports() {
      onAuthStateChanged(auth, (user) => {
        PdfService.fetchPdfUser({
          email: user.email
        }).then((response) => {
          this.reports = response.data.reports;

          $(document).ready(function () {
            $('#table').DataTable({
              responsive: true,
              paging: true,
              ordering: true,
              info: true,
              language: {
                lengthMenu: "Nombre d'éléments par page: _MENU_",
                zeroRecords: "Aucun résultat ...",
                info: "Page _PAGE_ sur _PAGES_",
                infoEmpty: "",
                infoFiltered: "(Filtrer à partir de _MAX_ total enregistrés)",
                paginate: {
                  "next": "Suivant",
                  "previous": "Précédent"
                },
                search: "",
                searchPlaceholder: "Rechercher"
              }
            });
          });
        });
      });
    },

    async getPdf(name) {
      PdfService.getPdf({
        name: name
      }).then((response) => {
        fetch(response.data.pdf[0].pdf)
          .then(res => res.blob())
          .then((blob) => {
            window.open(
              URL.createObjectURL(blob),
              "blank",
            );
          })
      });
    }
  }
}
