<template>
  <div class="container-fluid px-md-5 px-2">
    <div class="row my-4">
      <div class="col">
        <b-button class="custom-button shadow-sm" to="/">
          <left-icon /> Back
        </b-button>
      </div>
    </div>
    <div v-if="!hasError" class="row">
      <div class="col-md-6 col-12">
        <div class="row">
          <img :src="info.flag" class="col-md-8 col-12 offset-md-2 rounded-sm flag" :alt="info.name">
        </div>
      </div>
      <div class="col-md-6 col-12">
        <h1 class="my-5 h3 font-weight-bold">
          {{ info.name }}
        </h1>
        <div class="row">
          <div class="col-12 col-md-6">
            <span class="font-weight-bold">Native Name: </span>
            <span>{{ info.nativeName }}</span>
          </div>
          <div class="col-12 col-md-6">
            <span class="font-weight-bold">Top Level Domain: </span>
            <span>{{ topLevelDomain }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <span class="font-weight-bold">Population: </span>
            <span>{{ population }}</span>
          </div>
          <div class="col-12 col-md-6">
            <span class="font-weight-bold">Currencies: </span>
            <span>{{ currencies }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <span class="font-weight-bold">Region: </span>
            <span>{{ info.region }}</span>
          </div>
          <div class="col-12 col-md-6">
            <span class="font-weight-bold">Languages: </span>
            <span>{{ languages }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span class="font-weight-bold">Sub Region: </span>
            <span>{{ info.subregion }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span class="font-weight-bold">Capital: </span>
            <span>{{ info.capital }}</span>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col">
            <span class="font-weight-bold">Border Countries: </span>
            <b-button v-for="country in borderCountries" :key="country.code" class="custom-button shadow-sm m-2" :to="`/${country.code}`">
              {{ country.name }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row">
      Wrong country code, please try to correct it or go back to the list.
    </div>
  </div>
</template>
<script>
import countries from 'i18n-iso-countries'
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export default {
  props: ['hasError'],
  computed: {
    info () {
      return this.$store.state.selectedCountry
    },
    languages () {
      return this.info.languages.map(({ name }) => name).join(', ')
    },
    currencies () {
      return this.info.currencies.map(({ name }) => name).join(', ')
    },
    topLevelDomain () {
      return this.info.topLevelDomain.join(', ')
    },
    population () {
      return this.info.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    borderCountries () {
      return this.info.borders
        .map(country => ({ name: countries.getName(country, 'en'), code: country }))
        .filter(({ name }) => name)
    }
  }
}
</script>
<style>
  .flag {
    border: 15px solid rgba(1, 1, 1, .01);
    padding: 0;
  }
  .dark-theme .flag {
    border: 15px solid rgba(250, 250, 250, .01);
    padding: 0;
  }
</style>
