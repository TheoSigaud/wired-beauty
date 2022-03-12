import Api from '@/services/Api'

export default {
  fetchPdf () {
    return Api().get('/api/pdf')
  },

  fetchPdfUser (params) {
    return Api().post('/api/user-pdf', params)
  },

  savePdf (params) {
    return Api().post('/api/save-pdf', params)
  },

  deletePdf (params) {
    return Api().post('/api/delete-pdf', params)
  },

  pdfUser (params) {
    return Api().post('/api/pdf-user', params)
  },

  getPdf (params) {
    return Api().post('/api/get-pdf', params)
  },

  fetchUsersPdf (params) {
    return Api().post('/api/users-pdf', params)
  },

  deletePdfuser (params) {
    return Api().post('/api/delete-user-pdf', params)
  }
}
