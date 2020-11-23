export const ALL_REGIONS = 'All'

export const Regions = [
  ALL_REGIONS,
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania'
]
const FIELDS = '?fields=name;population;capital;flag;region;alpha3Code'

export const state = () => ({
  countries: [],
  error: false,
  selectedCountry: null,
  sort: 'Name'
})

export const mutations = {
  setCountries (state, { countries }) {
    state.countries = countries
  },
  setCountry (state, { country }) {
    state.selectedCountry = country
  },
  setError (state, { status, message }) {
    state.error = {
      status,
      message
    }
  },
  setSortType (state, { sort }) {
    state.sort = sort
  }
}

export const actions = {
  async fetchCountries ({ commit, dispatch }, payload) {
    try {
      let response = null
      if (payload?.search) {
        response = await this.$axios.$get(`/name/${payload.search}${FIELDS}`)
      } else if (!payload?.region || payload?.region === ALL_REGIONS) {
        response = await this.$axios.$get(`/all${FIELDS}`)
      } else {
        response = await this.$axios.$get(`/region/${payload.region.toLowerCase()}${FIELDS}`)
      }
      dispatch('sortCountries', { countries: response || [] })
      return response
    } catch (e) {
      // TODO:
      //   please add reason to the payload based on the api response if they add the error types and -
      //   reasons to the documentation
      if (e?.response?.status === 404) {
        commit('setCountries', { countries: [] })
      }
      commit('setError', { message: 'Error in getting countries', status: e.response.status })
      throw e
    }
  },
  setSortType ({ commit, dispatch, state: { countries } }, { sort }) {
    commit('setSortType', { sort })
    dispatch('sortCountries', { countries })
  },
  async sortCountries ({ state: { sort, countries }, commit }, { countries: targetCountries }) {
    const sortedCountries = sortArray(sort, targetCountries || countries)
    await commit('setCountries', { countries: sortedCountries })
    return sortedCountries
  },
  async fetchCountry ({ commit }, { code }) {
    try {
      const response = await this.$axios.$get(`/alpha/${code}`)
      commit('setCountry', { country: response })
      return response
    } catch (e) {
      // TODO:
      //   please add reason to the payload based on the api response if they add the error types and -
      //   reasons to the documentation
      if (e?.response?.status === 404) {
        commit('setError', { message: 'Couldn\'t find the country', status: e.response.status })
      }
      commit('setError', { message: e?.response?.message, status: e?.response?.status })
      throw e
    }
  }
}

function sortArray (sortBy, array) {
  const clonedArray = [...array]
  if (sortBy.toLowerCase() === 'name') {
    return clonedArray.sort(compareByName)
  } else if (sortBy.toLowerCase() === 'population') {
    return clonedArray.sort(compareByPopulation)
  } else {
    return array
  }
}
function compareByName (a, b) {
  if (a.name < b.name) {
    return -1
  } else if (a.name > b.name) {
    return 1
  } else {
    return 0
  }
}
function compareByPopulation (a, b) {
  if (a.population > b.population) {
    return -1
  } else if (a.population < b.population) {
    return 1
  } else {
    return 0
  }
}
