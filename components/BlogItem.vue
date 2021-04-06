<template>
  <div v-if="isNotNull(article)" class="item">
    <div class="columns">
      <div v-if="hasImage(article)" class="column is-one-quarter">
        <nuxt-link :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <img
            class="image"
            :src="getImage(article.image.src)"
            :alt="article.image.alt"
          />
        </nuxt-link>
      </div>
      <div class="column">
        <nuxt-link :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <h2 class="h2">{{ formatTitle(article.title) }}</h2>
        </nuxt-link>
        <p v-if="hasAuthor(article)" class="author">
          By :
          <a :href="getAuthor(article.author).link">
            {{ getAuthor(article.author).name }}</a
          >,
          {{ formatDateTime(article.createdAt) }}
        </p>
        <div class="line" />
        <p class="description">{{ formatDescription(article.description) }}</p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isNotNull(article: any) {
      return (
        (article?.title ?? null) !== null &&
        (article?.description ?? null) !== null &&
        (article?.author ?? null) !== null
      )
    },
    hasImage(article: any) {
      return (article?.image?.src ?? null) !== null
    },
    getImage(src: any) {
      if (src !== null && (typeof src === 'string' || src instanceof String))
        return `/images/${src}`
      return null
    },
    formatTitle(title: string) {
      const maxSize = 26
      if (title?.length > maxSize) return title.substr(0, maxSize - 3) + '...'
      return title
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
    hasAuthor(article: any) {
      return (article?.author?.name ?? null) !== null
    },
    getAuthor(author: any) {
      return {
        link: author?.link ?? '#',
        name: author?.name,
      }
    },
    formatDescription(description: string) {
      const maxSize = 300
      if (description?.length > maxSize)
        return description.substr(0, maxSize - 3) + '...'
      return description
    },
  },
})
</script>

<style scoped>
.h2 {
  font-size: 1.7rem;
  font-weight: 500;
}
.author {
  font-size: 0.75rem;
  font-weight: 400;
}
.line {
  border-bottom: 1px solid #dedede;
}
.description {
  margin-top: 7px;
  font-size: 1rem;
}

@media only screen and (min-width: 320px) and (max-width: 767px) {
  .column {
    padding: 0 0.75rem;
  }
  .item {
    margin-bottom: 2.5rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .column {
    padding: 0 0.75rem;
  }
  .item {
    margin-bottom: 2.5rem;
  }
}
</style>
