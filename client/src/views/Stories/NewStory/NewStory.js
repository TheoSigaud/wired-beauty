import StoriesService from '@/services/StoriesService';

export default {
  name: "NewStory",
  data () {
    return {
      name: '',
      description: '',
      image: null,
      errors: {
        name: null,
        description: null,
        image: null
      }
    }
  },

  methods: {
    async uploadImage(e) {
      this.image =  e.target.files[0];

      document.getElementById('previewImage').src = URL.createObjectURL(this.image);
    },

    async checkForm() {

      this.errors.name = null;
      this.errors.description = null;
      this.errors.image = null;

      if (this.name.length < 3 || this.name.length > 80){
        this.errors.name = 'Minimum 3 et maximum 80 caractères';
      }

      if (this.description.length < 3 || this.description.length > 200){
        this.errors.description = 'Minimum 3 et maximum 200 caractères ('+this.description.length+'/200)';
      }

      if (!this.image){
        this.errors.image = 'L\'image est obligatoire';
      }


      if (this.errors.name === null
        && this.errors.description === null
        && this.errors.image === null){
        await this.addStory();
      }
    },

    async addStory() {

      this.base64().then(
        data =>  StoriesService.addStory({
          name: this.name,
          description: this.description,
          image: data
        }).then(
          this.redirection,
        )
      );
    },

    async base64() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(this.image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    async selectInput() {
      document.getElementById('uploadImage').click();
    },

    async redirection(){
      this.$router.push({ name: 'Stories' })
    },
  }
}
