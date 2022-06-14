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
      return this.$store.getters['cmsEngine/cmsConfig']
    },
    env () {
      return this.cmsConfig?.config?.env || {}
    },
    colors () {
      return this.cmsConfig?.config?.colors || {}
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
        },
        pageContainer: null
      }

      if (!this.cmsConfig?.layouts) {
        return fallbackData
      }

      return this.cmsConfig.layouts[this.layout] || fallbackData
    },
    pageConfig () {
      return this.$store.getters['cmsEngine/currentPageConfig']
    },
    pageName () {
      return this.pageConfig?.url || ''
    },
    detectBy () {
      return this.pageConfig?.detectBy || []
    },
    structure () {
      return this.pageConfig?.structure || []
    },
    css () {
      return this.pageConfig?.config?.css || {}
    },
    seo () {
      return this.pageConfig?.config?.seo || {}
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
      :page-container="layoutData.pageContainer"
      :page-name="pageName"
      :detect-by="detectBy"
    >
      <template v-for="(section, index) in structure">
        <component
          :is="components[section.component]"
          :key="`${section.component}-${index}`"
          v-bind="section.data"
          :env="env"
          :css="section.css"
          :page-name="pageName"
          :detect-by="detectBy"
        />
      </template>
    </CmsEngineLayout>

    <template v-else>
      <component
        :is="components[section.component]"
        v-for="(section, index) in structure"
        :key="`${section.component}-${index}`"
        v-bind="section.data"
        :env="env"
        :css="section.css"
        :page-name="pageName"
        :detect-by="detectBy"
      />
    </template>
  </div>
</template>
