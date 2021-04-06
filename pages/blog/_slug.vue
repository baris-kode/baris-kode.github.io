<template>
  <div>
    <div v-if="hasImage(article)">
      <img
        class="image"
        :src="getImage(article.image.src)"
        :alt="article.image.alt"
      />
    </div>
    <div v-if="hasAuthor(article)">
      <p class="author">
        <i>
          By :
          <a :href="article.author.link">{{ article.author.name }}</a
          >,
          {{ formatDateTime(article.createdAt) }}
        </i>
      </p>
    </div>
    <div v-else>
      <p class="author">
        {{ formatDateTime(article.createdAt) }}
      </p>
    </div>
    <article>
      <nuxt-content :document="article" />
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SiteMeta from '~/utils/SiteMeta'

export default Vue.extend({
  async asyncData({ $content, params }) {
    const article = await $content('articles', params?.slug ?? '').fetch()
    return { article }
  },
  head() {
    const article = (this as any)?.article
    const meta = (this as any)?.meta
    return {
      title: article?.title,
      meta: [
        ...meta,
        {
          property: 'article:published_time',
          content: article?.createdAt,
        },
        {
          property: 'article:modified_time',
          content: article?.updatedAt,
        },
        {
          property: 'article:tag',
          content: article?.tags?.toString() ?? '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        {
          name: 'twitter:data1',
          content: article?.author?.name ?? '',
        },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: article?.tags?.toString() ?? '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog/${this.$route?.params?.slug}`,
        },
      ],
    }
  },
  computed: {
    meta() {
      const article = (this as any)?.article
      const metaData = {
        type: 'article',
        title: article?.title,
        description: article?.description,
        url: `${this.$config.baseUrl}/blog/${this.$route?.params?.slug}`,
        mainImage: '/images/' + article?.image?.src,
      }
      return SiteMeta(metaData)
    },
  },
  methods: {
    hasImage(article: any) {
      return (article?.image?.src ?? null) !== null
    },
    getImage(src: any) {
      if (src !== null && (typeof src === 'string' || src instanceof String))
        return `/images/${src}`
      return null
    },
    hasAuthor(article: any) {
      return (article?.author?.name ?? null) !== null
    },
    formatDateTime(dateTime: string) {
      const dateTimeObj = new Date(dateTime)

      return (
        dateTimeObj.getDate() +
        ' ' +
        dateTimeObj.toLocaleString('id-ID', { month: 'long' }) +
        ' ' +
        dateTimeObj.getFullYear()
      )
    },
  },
})
</script>

<style scoped>
.author {
  margin-top: 10px;
  font-size: 1rem;
  text-align: right;
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .author {
    margin-top: 3px;
    font-size: 0.65rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .author {
    margin-top: 5px;
    font-size: 0.8rem;
  }
}
</style>
