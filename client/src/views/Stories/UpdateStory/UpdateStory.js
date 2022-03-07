import StoriesService from '@/services/StoriesService';

export default {
  name: "UpdateStory",
  data () {
    return {
      name: '',
      description: '',
      image: null,
      newImage: null,
      idStory: this.$route.params.id,
      errors: {
        name: null,
        description: null
      }
    }
  },

  async mounted(){
    await this.getStory();
  },

  methods: {

    async getStory () {
      const response = await StoriesService.getStory({
        id: this.$route.params.id
      })
      this.name = response.data.name
      this.description = response.data.description
      this.image = response.data.image
    },

    async uploadImage(e) {
      this.newImage =  e.target.files[0];

      document.getElementById('previewImage').src = URL.createObjectURL(this.newImage);
    },

    async checkForm() {

      this.errors.name = null;
      this.errors.description = null;
      this.errors.image = null;

      if (this.name.length < 3 || this.name.length > 80){
        this.errors.name = 'Minimum 3 et maximum 50 caractères';
      }

      if (this.description.length < 3 || this.description.length > 200){
        this.errors.description = 'Minimum 3 et maximum 200 caractères ('+this.description.length+'/200)';
      }


      if (this.errors.name === null
        && this.errors.description === null){
        await this.updateStory();
      }
    },

    async updateStory() {

      if(this.newImage) {
        this.base64().then(
          data =>  StoriesService.updateStory({
            id: this.idStory,
            name: this.name,
            description: this.description,
            newImage: data
          }).then(
            this.redirection,
          )
        )
      }else{
        await StoriesService.updateStory({
          id: this.idStory,
          name: this.name,
          description: this.description
        }).then(
          this.redirection,
        )
      }
    },

    async base64() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(this.newImage);
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
