<template>
  <LazyList />
</template>
<script>
export default {
  async asyncData ({ store }) {
    try {
      await store.dispatch('fetchCountries')
    } catch {
      return { hasError: true }
    }
  },
  transition: 'fade'
}
</script>
