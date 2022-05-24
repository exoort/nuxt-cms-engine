<script>
export default {
  name: 'PreviewSection',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    backgroundImage: {
      type: String,
      required: true
    },
    css: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  fetch () {
    console.log('fetch preview')
  },
  computed: {
    styles () {
      return this.css?.styles
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
  </div>
</template>
