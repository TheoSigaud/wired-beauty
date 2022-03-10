import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('/api/users')
  },

  addUser (params) {
    return Api().post('/api/users', params)
  },

  deleteUser (params) {
    return Api().post('/api/delete-user', params)
  }
}
