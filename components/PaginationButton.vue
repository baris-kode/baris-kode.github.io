<template>
  <div v-if="countPage() > 1">
    <b-pagination :total="total" :per-page="perPage" :current="current">
      <template #default="props">
        <b-pagination-button
          :id="`page_${props.page.number}`"
          :page="props.page"
          tag="nuxt-link"
          :to="`${getLink(props.page.number)}`"
        >
          {{ props.page.number }}
        </b-pagination-button>
      </template>

      <template #previous="props">
        <b-pagination-button
          :page="props.page"
          tag="nuxt-link"
          :to="`${getLink(props.page.number)}`"
        >
          Previous
        </b-pagination-button>
      </template>

      <template #next="props">
        <b-pagination-button
          :page="props.page"
          tag="router-link"
          :to="`${getLink(props.page.number)}`"
        >
          Next
        </b-pagination-button>
      </template>
    </b-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    contentPath: {
      type: String,
      required: true,
    },
    perPage: {
      type: Number,
      required: false,
      default: 10,
    },
    searchField: {
      type: String,
      required: false,
      default: null,
    },
    searchValue: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      total: 0,
      current: 1,
    }
  },
  watch: {
    $route() {
      this.current = this.getCurrentPage()
    },
    searchValue() {
      this.countItems().then((items) => {
        this.total = items?.length ?? 0
      })
    },
  },
  mounted() {
    this.current = this.getCurrentPage()
    this.countItems().then((items) => {
      this.total = items?.length ?? 0
    })
  },
  methods: {
    getCurrentPage() {
      return Number(this.$route.query?.page ?? 1)
    },
    countPage() {
      return Math.ceil(this.total / this.perPage)
    },
    getLink(page: any) {
      const currentRoute = this.$route.fullPath
      if (currentRoute.includes('?')) {
        if (currentRoute.includes('page='))
          return currentRoute.replace(/page=[0-9]+/, 'page=' + String(page))
        return currentRoute + ('&page=' + String(page))
      }
      return currentRoute + ('?page=' + String(page))
    },
    async countItems() {
      if (this.searchField !== null && this.searchValue !== null)
        return await this.$content(this.contentPath)
          .search(this.searchField, this.searchValue)
          .fetch()
      return await this.$content(this.contentPath).only([]).fetch()
    },
  },
})
</script>

<style scoped>
.pagination-link.is-current {
  background-color: #363636;
  border-color: #363636;
  color: #fff;
}
</style>
