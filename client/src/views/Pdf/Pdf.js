import PdfService from '@/services/PdfService'
import UsersService from '@/services/UsersService'

export default {
  name: 'Pdf',
  data () {
    return {
      pdfs: [],
      users: [],
      namePdf: ''
    }
  },
  mounted () {
    this.getPdf().then(() => {
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

    this.getUsers().then(() => {
        $(document).ready(function () {
          $('#tableUsers').DataTable({
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
    })
  },

  methods: {
    async getUsers () {
      const response = await UsersService.fetchUsers()
      this.users = response.data.users
    },

    async getPdf () {
      const response = await PdfService.fetchPdf()
      this.pdfs = response.data.pdf
    },

    async deletePdf(name) {
        PdfService.deletePdf({
          name: name
        }).then(() => {
          this.getPdf();
        });
    },

    async showReport(pdf) {
      fetch(pdf)
        .then(res => res.blob())
        .then((blob) => {
          window.open(
            URL.createObjectURL(blob),
            "blank",
          );
        })
    },

    async addUser(name) {

    }
  }
}
