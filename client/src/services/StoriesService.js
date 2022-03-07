import Api from '@/services/Api'

export default {
  fetchStories () {
    return Api().get('/api/stories')
  },

  getStory (params) {
    return Api().get('/api/story/' + params.id)
  },

  updateStory (params) {
    return Api().put('/api/story/' + params.id, params)
  },

  addStory (params) {
    return Api().post('/api/stories', params)
  },

  deleteStory (id) {
    return Api().delete('/api/story/' + id)
  }
}
