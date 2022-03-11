import UsersService from '@/services/UsersService'
import {getAuth, onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
const auth = getAuth();

export default {
  name: 'Users',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getUsers();
  },
  methods: {
    async getUsers () {
      const response = await UsersService.fetchUsers()
      this.users = response.data.users
    },

    async deleteUser(uid) {
      onAuthStateChanged(auth, (user) => {
        UsersService.deleteUser({
          uid: uid
        }).then(() => {
          this.getUsers();
        });
      });
    },

    async resetPassword(email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

    }
  }
}
