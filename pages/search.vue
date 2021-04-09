<template>
  <div>
    <h1 class="h1">Search results for : {{ searchQuery }}</h1>
    <ul v-if="isArray(articles)">
      <li v-for="article of articles" :key="article.slug">
        <blog-item :article="article" />
      </li>
    </ul>
    <div v-else>{{ pageQuery === 1 ? 'No result.' : 'Empty page.' }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SiteMeta from '~/utils/SiteMeta'
import BlogItem from '~/components/BlogItem.vue'

export default Vue.extend({
  components: { BlogItem },
  data() {
    return {
      searchQuery: '',
      pageQuery: 1,
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
        .limit(20)
        .skip(20 * pageQuery)
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
