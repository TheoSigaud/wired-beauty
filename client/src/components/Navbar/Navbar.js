import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
const auth = getAuth();

export default {
  name: 'Navbar',

  data () {
    return {
      admin: false
    }
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user.email === 'wired@gmail.com') {
        this.admin = true;
      } else {
        this.admin = false;
      }
    })
  },

  methods: {
    async logOut () {
      signOut(auth).then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
  }
}
