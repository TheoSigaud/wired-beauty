import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth();

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: null,
        password: null,
        login: null,
      }
    }
  },

  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$router.push({name: 'Dashboard'});
      }
    });
  },

  methods: {
    async checkForm() {
      this.errors.email = null;
      this.errors.password = null;
      this.errors.login = null;

      this.email = this.email.trim();

      if (!await this.checkMail(this.email)) {
        this.errors.email = 'Veuillez saisir une adresse email valide';
      }

      if (this.password === '') {
        this.errors.password = 'Veuillez remplir le champ';
      }

      if (this.errors.email === null && this.errors.password === null) {
        await this.loginUser();
      }
    },

    async checkMail(email) {
      if (email.match(/^.+\@.+\..+$/)) {
        return true;
      }
      return false;
    },

    async loginUser() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          onAuthStateChanged(auth, (user) => {
            this.$router.push({name: 'Dashboard'});
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
            this.errors.login = 'Identifiants incorrects';
          }
        });
    }
  }
}
