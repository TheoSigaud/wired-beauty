import { getAuth, updateProfile, sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import UsersService from '@/services/UsersService';

export default {
  name: 'Register',
  data () {
    return {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
      msgMail: false,
      isDisabled: false,
      errors: {
        pseudo: null,
        email: null,
        password: null,
        confirmPassword: null,
        register: null
      }
    }
  },
  methods: {
    async checkForm() {
      this.isDisabled = true;

      this.errors.pseudo = null;
      this.errors.email = null;
      this.errors.password = null;
      this.errors.confirmPassword = null;
      this.errors.register = null;

      if (this.pseudo.length < 3 || this.pseudo.length > 50){
        this.errors.pseudo = 'Minimum 3 et maximum 50 caractères';
      }

      if (!this.email.match(/.+\@.+\..+/)){
        this.errors.email = 'Veuillez saisir une adresse email valide';
      }

      if (!(this.password.length > 5 && this.password.length <= 30)){
        this.errors.password = 'Le mot de passe doit posséder minimum 6 et maximum 30 caractères';
      }

      if (this.password !== this.confirmPassword){
        this.errors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }

      if (this.errors.pseudo === null
        && this.errors.email === null
        && this.errors.password === null
        && this.errors.confirmPassword === null){
        await this.addUser();
      }else{
        this.isDisabled = false;
      }
    },

    async addUser () {
      const auth = getAuth();

      const response = await UsersService.checkUser({
        email: this.email,
        pseudo: this.pseudo,
      });

      if (response.data){
        this.errors.register = response.data;
      }else{
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            updateProfile(auth.currentUser, {
              displayName: this.pseudo
            }).then(() => {
              sendEmailVerification(auth.currentUser)
                .then(async () => {
                  await UsersService.addUser({
                    pseudo: this.pseudo,
                    email: this.email,
                  });
                  this.msgMail = true;
                }).catch((error) => {
                this.errors.register = 'Erreur pendant l\'envoi du mail';
              });
            }).catch((error) => {
              this.errors.register = 'Erreur pendant l\'enregistrement du pseudo';
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use'){
              this.errors.register = 'Un compte avec cette email existe déjà';
            }
          });
      }
      this.isDisabled = false;
    }
  }
}
