import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('/api/users')
  },
  addUser (params) {
    return Api().post('/api/users', params)
  }
}
