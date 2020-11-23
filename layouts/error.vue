<template>
  <div class="container text-center">
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <b-button class="custom-button shadow-sm" to="/">
      <left-icon /> Go to Country list
    </b-button>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error'
}
</script>
