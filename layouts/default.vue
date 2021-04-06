<template>
  <div>
    <top-navbar />
    <div class="container">
      <div style="padding: 1rem">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from '~/components/TopNavbar.vue'
export default {
  components: { TopNavbar },
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' },
        },
      ],
    }
  },
}
</script>
