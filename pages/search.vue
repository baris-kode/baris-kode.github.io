<template>
  <div>
    <h1 class="h1">Search results for : {{ searchQuery }}</h1>
    <div v-if="isArray(articles)">
      <ul>
        <li v-for="article of articles" :key="article.slug">
          <blog-item :article="article" />
        </li>
      </ul>
      <pagination-button
        :content-path="'articles'"
        :per-page="show"
        style="margin-top: 1rem"
      />
    </div>
    <div v-else>{{ pageQuery === 1 ? 'No result.' : 'Empty page.' }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SiteMeta from '~/utils/SiteMeta'
import BlogItem from '~/components/BlogItem.vue'
import PaginationButton from '~/components/PaginationButton.vue'

const Show = 10

export default Vue.extend({
  components: { BlogItem, PaginationButton },
  data() {
    return {
      searchQuery: '',
      pageQuery: 1,
      show: Show,
      articles: {},
    }
  },
  head() {
    const meta = SiteMeta({
      title: 'Search Results',
      description: 'List of search results.',
      url: `${this.$config.baseUrl}/search/`,
    })
    return {
      title: 'Search Results',
      meta: [...meta],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/search/`,
        },
      ],
    }
  },
  watch: {
    $route() {
      this.fetchContent()
    },
  },
  beforeMount() {
    this.fetchContent()
  },
  methods: {
    fetchContent() {
      this.searchQuery = String(this.$route.query?.q ?? '')
      this.pageQuery = Number(this.$route.query?.page ?? 1)
      this.loadArticles(this.searchQuery, this.pageQuery - 1)
        .then((articles) => {
          this.articles = articles
        })
        .catch(() => {
          this.articles = {}
        })
    },
    isArray(input: any): boolean {
      if (Array.isArray(input) && input?.length > 0) return true
      return false
    },
    async loadArticles(searchQuery: any, pageQuery: number) {
      return await this.$content('articles')
        .search('title', searchQuery)
        .sortBy('createdAt', 'desc')
        .limit(this.show)
        .skip(pageQuery * this.show)
        .fetch()
    },
  },
})
</script>

<style scoped>
.h1 {
  font-size: 2rem;
  font-weight: 200;
  margin-bottom: 20px;
}
</style>
