<template lang="pug">
  b-button.d-flex.justify-content-center.align-items-center(
    :variant="variant"
    v-on="$listeners"
  )
    vue-lottie(
      v-if="isLoading"
      :height="35"
      :width="50"
      loop
      :data="animationData"
    )
    span(v-else)
      slot
</template>
<script>
import vueLottie from 'vue-lottie-ssr'
import animationData from '@/assets/animations/loading.json'

export default {
  name: 'AsyncButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary'
    }
  },
  components: {
    vueLottie
  },
  data() {
    return {
      animationData
    }
  }
}
</script>