import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

export default {
  name: 'Navbar',

  data() {
    return {
      displayNavbar: false
    }
  },
  displayNavbar: false,
  methods: {
    async logOut() {
      signOut(auth).then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
  }
}
