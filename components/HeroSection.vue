<template lang="pug">
  div
    b-row
      b-col
        logo
    b-row
      b-col
        h1.title {{ title }}
    b-row
      b-col
        h2 {{ subtitle }}
    b-row
      b-col.d-flex.flex-column(v-if="user")
        b-button.mt-3(
          variant="primary"
          size="lg"
          to="/games"
        ) All Games
      b-col.d-flex.flex-column(v-else)
        b-button.mt-3(
          variant="primary"
          size="lg"
          to="/register"
        ) Register
        b-button.mt-3(
          variant="primary"
          size="lg"
          to="/login"
        ) Login
</template>
<script>
import Logo from '@/components/Logo'

export default {
  name: 'HeroSection',
  components: { Logo },
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters['users/currentUser']
    }
  }
}
</script>