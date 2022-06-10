<template>
  <div>
    <nuxt-link to="/test/123">
      test
    </nuxt-link>

    <nuxt-link :to="$cmsUrl({ path: '/test/:id', params: { id: 123 }, query: { test: 'test'}})">
      test2
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ExamplePage'
}
</script>
