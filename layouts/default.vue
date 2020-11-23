<template>
  <div :class="'content-body ' + theme + '-theme'">
    <header class="row p-4 shadow-sm content-header">
      <div class="col-md-8 col-7 pl-md-5 pl-0">
        <NuxtLink to="/">
          <h1 class="h5 font-weight-bold">
            Where is the world?
          </h1>
        </NuxtLink>
      </div>
      <div class="col-md-2 col-5 offset-md-2">
        <span class="theme-toggle" @click="toggleTheme">
          <moon-icon
            :fill="isItLight"
            :color="isItLight ? 'black' : 'white'"
          /> {{toggleButtonTitle}}
        </span>
      </div>
    </header>
    <div class="content container-fluid pt-5">
      <Nuxt/>
    </div>
  </div>
</template>

<script>
import MoonIcon from '../components/MoonIcon'

export default {
  components: { MoonIcon },
  data () {
    return {
      theme: 'light'
    }
  },
  methods: {
    toggleTheme () {
      this.theme = this.isItLight ? 'dark' : 'light'
    }
  },
  computed: {
    toggleButtonTitle () {
      return this.isItLight ? 'Dark Mode' : 'Light Mode'
    },
    isItLight () {
      return this.theme === 'light'
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&family=Roboto&display=swap');
  html, html *, * {
    font-family: 'Nunito Sans',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  :root {
    --dark-body-bg: hsl(207, 26%, 17%);
    --dark-element-bg: hsl(209, 23%, 22%);
    --dark-color: white;
    --light-body-bg: hsl(0, 0%, 98%);
    --light-element-bg: white;
    --light-color: black;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
  a, a:hover, a:active, a:focus, a:visited {
    text-decoration: none !important;
    color: unset;
  }
  .theme-toggle {
    cursor: pointer;
  }
  .dark-theme *, .dark-theme input:focus {
    color: var(--dark-color);
    border-color: var(--dark-element-bg);
  }
  .dark-theme input, .dark-theme input:focus, .dark-theme select, .dark-theme select option {
    background-color: var(--dark-element-bg) !important;
    border-color: var(--dark-element-bg) !important;
  }
  .content.container-fluid {
    max-width: 1440px !important;
  }
  .content-body {
    background-color: var(--light-body-bg);
    min-height: 100vh;
  }
  .dark-theme.content-body {
    background-color: var(--dark-body-bg);
  }
  .content-header {
    background-color: var(--light-element-bg);
    margin: 0;
  }
  .dark-theme .content-header {
    background-color: var(--dark-element-bg);
  }
  .custom-button {
    background: var(--light-element-bg);
    border-color: var(--light-element-bg);
    color: var(--light-color);
  }
  .custom-button:hover, .custom-button:focus, .custom-button:active {
    background: unset;
    border-color: unset;
    color: unset;
  }
  .dark-theme .custom-button {
    background: var(--dark-element-bg);
    border-color: var(--dark-element-bg);
    color: var(--dark-color);
  }
</style>
