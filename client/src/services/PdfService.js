import Api from '@/services/Api'

export default {
  savePdf (params) {
    return Api().post('/api/save-pdf', params)
  }
}
