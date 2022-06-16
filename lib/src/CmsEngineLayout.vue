<script>
export default {
  name: 'CmsEngineLayout',
  props: {
    css: {
      type: Object,
      default: () => ({})
    },
    structure: {
      type: Array,
      default: () => [{}]
    },
    pageContainer: {
      type: String,
      default: null
    },
    env: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      default: ''
    },
    detectBy: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    styles () {
      return this.css?.styles || {}
    }
  }
}
</script>

<template>
  <div
    class="cms-engine-layout"
    :style="styles"
  >
    <slot v-if="!structure.length" />

    <template v-else>
      <template v-for="(section, index) in structure">
        <component
          :is="section.component"
          v-if="section.component !== 'page'"
          :key="`${section.component}-${index}`"
          v-bind="section.data"
          :env="env"
          :css="section.css"
          :page-name="pageName"
          :detect-by="detectBy"
        >
          <slot v-if="pageContainer === section.component" />
        </component>

        <slot v-else />
      </template>
    </template>
  </div>
</template>
