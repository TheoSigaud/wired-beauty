import StoriesService from '@/services/StoriesService'

export default {
  name: "Stories",

  data () {
    return {
      stories: [],
      idDeleteStory: null
    }
  },
  async mounted() {
    await this.getStories();
  },
  methods: {
    async getStories () {
      const response = await StoriesService.fetchStories()
      this.stories = response.data.stories
    },

    async deleteStory () {
      await StoriesService.deleteStory(this.idDeleteStory)
      await this.getStories()
    }
  }
}
