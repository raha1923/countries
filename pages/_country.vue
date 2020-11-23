<template>
  <LazyDetail :hasError="hasError" />
</template>
<script>
export default {
  async asyncData ({ params: { country }, store }) {
    try {
      const countryData = await store.dispatch('fetchCountry', { code: country })
      return { country, info: countryData }
    } catch {
      return { country, hasError: true }
    }
  },
  transition: 'fade'
}
</script>
