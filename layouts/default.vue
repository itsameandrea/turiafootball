<template lang="pug">
  .page-wrapper
    page-navbar
    b-container.page-container
      nuxt
</template>
<script>
import PageNavbar from '@/components/PageNavbar'

export default {
  name: 'DefaultLayout',
  components: {
    PageNavbar
  },
  data() {
    return {
      deferredEvent: null
    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', async (e) => {
      console.log('Ciaociao')
      e.preventDefault()
      this.deferredEvent = e
    })
  },
  methods: {
    async showPrompt() {
      this.deferredEvent.prompt()

      const { outcome } = await this.deferredEvent.userChoice

      if (outcome === 'accepted') {
        alert('Yeeey')
      }
    }
  }
}
</script>
<style>

html, body, #__nuxt, #__layout, .page-wrapper, .page-container {
  height: 100%;
}
</style>
