<script>
import CmsEnginePage from '../../lib/core/CmsEnginePage'
export default {
  name: 'CmsPageWrapper',
  components: {
    CmsEnginePage
  },
  fetch () {
    console.log('fetch page viewer')
  }
}
</script>

<template>
  <CmsEnginePage />
</template>
