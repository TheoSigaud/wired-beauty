import UsersService from '@/services/UsersService'

export default {
  name: 'Users',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const response = await UsersService.fetchUsers()
      this.users = response.data.users
    }
  }
}
