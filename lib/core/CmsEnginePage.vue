<script>
import CmsEngineLayout from '../src/CmsEngineLayout'

export default {
  name: 'CmsEnginePage',
  components: { CmsEngineLayout },
  props: {
    components: {
      type: Object,
      default: () => ({})
    },
    styles: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    cmsConfig () {
      return this.$store.getters['cmsEngine/cmsConfig']?.config
    },
    pageConfig () {
      return this.$store.getters['cmsEngine/currentPageConfig']
    },
    structure () {
      return this.pageConfig?.structure || []
    },
    css () {
      return this.pageConfig?.css || {}
    },
    env () {
      return this.cmsConfig?.env || {}
    },
    colors () {
      return this.cmsConfig?.colors || {}
    },
    seo () {
      return this.cmsConfig?.seo || {}
    },
    layout () {
      return this.$store.getters['cmsEngine/useCmsLayout']
        ? this.$store.getters['cmsEngine/currentPageLayout']
        : null
    },
    layoutData () {
      const fallbackData = {
        structure: [],
        css: {
          styles: {}
        }
      }

      if (!this.cmsConfig?.layouts) {
        return fallbackData
      }

      return this.cmsConfig.layouts[this.layout] || fallbackData
    },
    pageStyles () {
      const styles = this.css?.styles || {}
      return {
        ...styles,
        ...this.colors,
        ...this.styles
      }
    }
  }
}
</script>

<template>
  <div class="cms-engine-page" :style="pageStyles">
    <CmsEngineLayout
      v-if="layout"
      :components="components"
      :css="layoutData.css"
      :structure="layoutData.structure"
    >
      <template v-for="(section, index) in structure">
        <component
          :is="components[section.component]"
          :key="`${section.component}-${index}`"
          v-bind="section.data"
          :css="section.css"
        />
      </template>
    </CmsEngineLayout>

    <template v-else>
      <component
        :is="components[section.component]"
        v-for="(section, index) in structure"
        :key="`${section.component}-${index}`"
        v-bind="section.data"
        :css="section.css"
      />
    </template>
  </div>
</template>
