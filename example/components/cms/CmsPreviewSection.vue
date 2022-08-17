<script>
import CommonComponent from '../common/CommonComponent'
export default {
  name: 'PreviewSection',
  components: { CommonComponent },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    backgroundImage: {
      type: String,
      required: false,
      default: ''
    },
    css: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      testData: null
    }
  },
  async fetch () {
    await this.getTestData()
  },
  computed: {
    styles () {
      return this.css?.styles
    }
  },
  methods: {
    async getTestData () {
      this.testData = await this.$axios.$get('https://jsonplaceholder.typicode.com/users')
    }
  }
}
</script>

<template>
  <div class="preview-section" :style="styles">
    <img :src="backgroundImage" alt="">

    <h1>
      {{ title }}
    </h1>

    <p>{{ description }}</p>

    <nuxt-link to="/test/321/case">
      Test link
    </nuxt-link>

    <CommonComponent />
  </div>
</template>
