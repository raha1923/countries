<template>
  <div>
    <div class="row m-5 mt-auto mb-auto">
      <div class="col-md-5 col-12 mb-4 mb-md-0">
        <b-form-input
          v-model="search"
          type="text"
          placeholder="Search for country"
          debounce="500"
        />
      </div>
      <div class="col-md-2 col-12 offset-md-3 offset-0">
        <b-form-select
          :value="sort"
          :options="sortTypes"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
          @change="updateSort"
        />
      </div>
      <div class="col-md-2 col-12">
        <b-form-select
          v-model="region"
          :options="regions"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        />
      </div>
    </div>
    <div class="animated d-flex fadeIn flex-wrap justify-content-around">
      <NuxtLink
        v-for="country in countries"
        :key="country.alpha3Code"
        :to="`/${country.alpha3Code}`"
      >
        <b-card
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="shadow-sm m-4 card-item"
          no-body
        >
          <b-row class="no-gutters">
            <b-card-img
              :src="country.flag"
              :alt="country.name"
              height="200"
              width="300"
              class="cover-images"
              top
            />
          </b-row>
          <b-card-body>
            <b-card-text>
              <b-card-title :title="country.name" class="font-weight-bold card-title" />
              <div>
                <span class="font-weight-bold">Population: </span>
                <span>{{ country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
              </div>
              <div>
                <span class="font-weight-bold">Region: </span>
                <span>{{ country.region }}</span>
              </div>
              <div>
                <span class="font-weight-bold">Capital: </span>
                <span>{{ country.capital }}</span>
              </div>
            </b-card-text>
          </b-card-body>
        </b-card>
      </NuxtLink>
      <span v-if="!countries || (countries.length === 0)">Based on the name you have entered, we couldn't find any country. Please try again.</span>
    </div>
  </div>
</template>

<script>
import { ALL_REGIONS, Regions } from '../store'

const SortTypes = ['Name', 'Population']

export default {
  data () {
    return {
      regions: Regions,
      region: ALL_REGIONS,
      sortTypes: SortTypes,
      search: ''
    }
  },
  computed: {
    countries () {
      return this.$store.state.countries
    },
    sort () {
      return this.$store.state.sort
    }
  },
  watch: {
    async search (val) {
      const region = (() => {
        if (val && (val !== '')) {
          this.region = ALL_REGIONS
          return ALL_REGIONS
        } else {
          return this.region
        }
      })()
      await this.$store.dispatch('fetchCountries', {
        search: val,
        region
      })
    },
    async region (val) {
      if (val === ALL_REGIONS) {
        if (!this.search || (this.search === '')) {
          await this.$store.dispatch('fetchCountries')
        }
      } else {
        this.search = ''
        await this.$store.dispatch('fetchCountries', {
          search: null,
          region: val
        })
      }
    }
  },
  methods: {
    updateSort (sort) {
      this.$store.dispatch('setSortType', { sort })
    }
  }
}
</script>

<style>
  .card-item {
    max-width: 19rem !important;
  }
  .dark-theme .card-item {
    background: var(--dark-element-bg);
  }
  .card-title {
    font-size: 20px;
  }
  .cover-images {
    object-fit: cover
  }
</style>
