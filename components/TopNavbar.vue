<template>
  <b-navbar :type="'is-dark'" :shadow="true" wrapper-class="container">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="~/assets/logo.svg" />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item :tag="'router-link'" :to="'/'"> Home </b-navbar-item>
      <b-navbar-item :tag="'router-link'" :to="'/blog'"> Blog </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item :tag="'div'">
        <form @submit.prevent="doSearch">
          <b-input
            v-model="searchQuery"
            placeholder="Search..."
            type="search"
            icon="magnify"
            name="q"
            icon-clickable
          >
          </b-input>
        </form>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      searchQuery: '',
    }
  },
  mounted() {
    this.searchQuery = String(this.$route.query?.q ?? '')
  },
  methods: {
    doSearch() {
      this.$router.push('/search?q=' + this.searchQuery)
    },
  },
})
</script>
