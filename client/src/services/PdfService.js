import Api from '@/services/Api'

export default {
  fetchPdf () {
    return Api().get('/api/pdf')
  },

  savePdf (params) {
    return Api().post('/api/save-pdf', params)
  },

  deletePdf (params) {
    return Api().post('/api/delete-pdf', params)
  }
}
