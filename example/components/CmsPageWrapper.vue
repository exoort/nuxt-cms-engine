<script>
import { CmsEnginePage } from '../../lib'
export default {
  name: 'CmsPageWrapper',
  components: {
    CmsEnginePage
  },
  computed: {
    components () {
      return {
        PreviewSection: () => import('./cmsParts/PreviewSection')
      }
    }
  }
}
</script>

<template>
  <CmsEnginePage :components="components" />
</template>
