<script>
import CmsEngineLayout from './CmsEngineLayout'

export default {
  name: 'CmsEnginePage',
  components: { CmsEngineLayout },
  data () {
    return {
      cmsConfig: null,
      pageConfig: null,
      layout: null,
      pageViewer: null
    }
  },
  fetch () {
    this.cmsConfig = this.$store.getters['cmsEngine/cmsConfig']

    this.layout = this.$store.getters['cmsEngine/useCmsLayout']
      ? this.$store.getters['cmsEngine/currentPageLayout']
      : null

    this.pageViewer = this.$cmsEngine.pageWrapper

    this.pageConfig = this.$store.getters['cmsEngine/currentPageConfig']
  },
  computed: {
    env () {
      return this.cmsConfig?.config?.env || {}
    },
    colors () {
      return this.cmsConfig?.config?.colors || {}
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
        ...this.colors
      }
    }
  }
}
</script>

<template>
  <div v-if="pageConfig" class="cms-engine-page" :style="pageStyles">
    <component
      :is="pageViewer"
      v-if="pageViewer"
    >
      <CmsEngineLayout
        v-if="layout"
        :css="layoutData.css"
        :env="env"
        :structure="layoutData.structure"
        :page-container="layoutData.pageContainer"
        :page-name="pageName"
        :detect-by="detectBy"
      >
        <template v-for="(section, index) in structure">
          <component
            :is="section.component"
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
          :is="section.component"
          v-for="(section, index) in structure"
          :key="`${section.component}-${index}`"
          v-bind="section.data"
          :env="env"
          :css="section.css"
          :page-name="pageName"
          :detect-by="detectBy"
        />
      </template>
    </component>

    <template v-else>
      <CmsEngineLayout
        v-if="layout"
        :css="layoutData.css"
        :env="env"
        :structure="layoutData.structure"
        :page-container="layoutData.pageContainer"
        :page-name="pageName"
        :detect-by="detectBy"
      >
        <template v-for="(section, index) in structure">
          <component
            :is="section.component"
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
          :is="section.component"
          v-for="(section, index) in structure"
          :key="`${section.component}-${index}`"
          v-bind="section.data"
          :env="env"
          :css="section.css"
          :page-name="pageName"
          :detect-by="detectBy"
        />
      </template>
    </template>
  </div>
</template>
