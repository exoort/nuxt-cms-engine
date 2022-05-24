<script>
export default {
  name: 'CmsPage',
  components: {
    PreviewSection: () => import('./cmsParts/PreviewSection')
  },
  props: {
    structure: {
      type: Array,
      default: () => []
    },
    env: {
      type: Object,
      default: () => ({})
    },
    colors: {
      type: Object,
      default: () => ({})
    },
    seo: {
      type: Object,
      default: () => ({})
    },
    css: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    styles () {
      return this.css?.styles
    }
  }
}
</script>

<template>
  <div class="cms-page" :style="styles">
    <template v-for="(section, index) in structure">
      <component :is="section.component" :key="index" v-bind="section.data" :css="section.css" />
    </template>
  </div>
</template>
