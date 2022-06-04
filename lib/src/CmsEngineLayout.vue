<script>
export default {
  name: 'CmsEngineLayout',
  props: {
    components: {
      type: Object,
      default: () => ({})
    },
    css: {
      type: Object,
      default: () => ({})
    },
    structure: {
      type: Array,
      default: () => [{}]
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
          :is="components[section.component]"
          v-if="section.component !== 'slot'"
          :key="`${section.component}-${index}`"
          v-bind="section.data"
          :css="section.css"
        />

        <slot v-else />
      </template>
    </template>
  </div>
</template>
