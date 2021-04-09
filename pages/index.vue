<template>
  <div>
    <h1 class="h1">Baris Kode</h1>
    <ul v-if="isArray(articles)">
      <li v-for="article of articles" :key="article.slug">
        <blog-item :article="article" />
      </li>
    </ul>
    <div v-else>Empty</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BlogItem from '~/components/BlogItem.vue'

export default Vue.extend({
  components: { BlogItem },
  async asyncData({ $content, route }) {
    const pageQuery = Number(route.query?.page ?? 1)
    const articles = await $content('articles')
      .sortBy('createdAt', 'desc')
      .limit(20)
      .skip((pageQuery - 1) * 20)
      .fetch()
    return { articles }
  },
  data() {
    return {
      pageQuery: 1,
      articles: {},
    }
  },
  watch: {
    $route() {
      const pageQuery = Number(this.$route.query?.page ?? 1)
      if (this.pageQuery !== pageQuery) this.fetchContent()
    },
  },
  methods: {
    fetchContent() {
      this.pageQuery = Number(this.$route.query?.page ?? 1)
      this.loadArticles(this.pageQuery - 1)
        .then((articles) => {
          this.articles = articles
        })
        .catch(() => {
          this.articles = {}
        })
    },
    isArray(input: any): boolean {
      if (Array.isArray(input ?? null) && input?.length > 0) return true
      return false
    },
    async loadArticles(pageQuery: number) {
      return await this.$content('articles')
        .sortBy('createdAt', 'desc')
        .limit(20)
        .skip(pageQuery * 20)
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
