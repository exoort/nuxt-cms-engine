<script>
export default {
  name: 'CmsPageWrapper',
  fetch () {
    console.log('fetch page viewer')
  }
}
</script>

<template>
  <div>
    <slot />
  </div>
</template>
