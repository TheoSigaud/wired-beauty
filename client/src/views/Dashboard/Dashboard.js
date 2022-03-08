import DashboardService from '@/services/DashboardService';

export default {
  name: "Dashboard",

  data () {
    return {
      image: null
    }
  },

  methods: {
    async uploadImage(e) {
      this.image = e.target.files[0];
    },

    async upload() {
      this.read().then(
        data => console.log(data)
      );
    },

    async read() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(this.image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
  }
}
