import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import UsersService from '@/services/UsersService';

export default {
  name: 'NewUser',

  data() {
    return {
      email: '',
      password: '',
      isDisabled: false,
      errors: {
        email: null,
        register: null
      }
    }
  },

  methods: {
    async checkForm() {
      this.isDisabled = true;

      this.errors.email = null;
      this.errors.register = null;

      if (!this.email.match(/.+\@.+\..+/)) {
        this.errors.email = 'Veuillez saisir une adresse email valide';
      }

      if (this.errors.email === null) {
        await this.addUser();
      } else {
        this.isDisabled = false;
      }
    },

    async addUser() {
      const auth = getAuth();

      const response = await UsersService.addUser({
        email: this.email
      })

      if (response.status === 201) {
        sendPasswordResetEmail(auth, this.email)
          .then(async () => {
            await this.redirection();
          })
      }

      if (response.success === false) {
        this.errors.register = 'Un compte avec cette email existe déjà';
      }

      this.isDisabled = false;
    },

    async redirection() {
      this.$router.push({name: 'Users'});
    }
  }
}
