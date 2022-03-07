import {getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
const auth = getAuth();

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      emailReset: '',
      isResetPassword: false,
      errors: {
        email: null,
        password: null,
        login: null,
        emailVerified: null
      }
    }
  },
  methods: {
    async checkForm() {
      this.errors.email = null;
      this.errors.password = null;
      this.errors.login = null;
      this.errors.emailVerified = null;

      this.email = this.email.trim();

      if (!await this.checkMail(this.email)){
        this.errors.email = 'Veuillez saisir une adresse email valide';
      }

      if (this.password === ''){
        this.errors.password = 'Veuillez remplir le champ';
      }

      if (this.errors.email === null && this.errors.password === null){
        await this.loginUser();
      }
    },

    async checkMail(email) {
      if (email.match(/^.+\@.+\..+$/)){
        return true;
      }
      return false;
    },

    async resetPassword(){
      this.emailReset = this.emailReset.trim();

      if (!await this.checkMail(this.emailReset)){
        this.errors.email = 'Veuillez saisir une adresse email valide';
      }else {
        sendPasswordResetEmail(auth, this.emailReset)
          .then(() => {
            this.errors.email = 'Un email a été envoyé si un compte avec cette adresse existe'
          })
          .catch((error) => {
            this.errors.email = 'Un email a été envoyé si un compte avec cette adresse existe'
          });
      }
    },

    async loginUser () {

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          onAuthStateChanged(auth, (user) => {
            if(user.emailVerified){
              this.$router.push({ name: 'Dashboard' })
            }else{
              this.errors.emailVerified = 'Votre email n\'est pas vérifié. Vérifiez votre boîte mail'
            }
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          if(errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password'){
            this.errors.login = 'Identifiants incorrects';
          }
        });
    }
  }
}
