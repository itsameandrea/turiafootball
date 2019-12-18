<template lang="pug">
  b-navbar(toggleable="md" variant="light")
    b-navbar-brand(href="#") Turia Football
    b-navbar-toggle(target="nav_collapse")

    b-collapse(is-nav id="nav_collapse")
      b-navbar-nav.ml-auto
        b-nav-item(
          v-for="link in links"
          :key="link.urk"
          :href="link.url"
        ) {{ link.label }}
      b-nav-item-dropdown(
        v-if="user"
        right
        :style="{ listStyle: 'none' }"
      )
        template(v-slot:button-content)
          em {{user.email }}
        b-dropdown-item(@click="onLogout") Signout
</template>
<script>
export default {
  name: 'AppNavbar',
  computed: {
    user() {
      return this.$store.getters['users/currentUser']
    },
    links() {
      const loggedIn = !!this.user

      let links = []

      if (loggedIn) {
        links = [
          ...links,
          { label: 'Games', url: '/games' }
        ]
      } else {
        links = [
          ...links,
          { label: 'Login', url: '/login' },
          { label: 'Register', url: '/register' }
        ]
      }

      return links
    }
  },
  watch: {
    user(val) {
      if (val) {
        return
      }

      this.$router.replace('/')
    }
  },
  methods: {
    async onLogout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.toastSuccess('Logged out!')
      } catch (e){
        console.log(e)
        this.toastError('Something went wrong. Please try again')
      } 
    }
  }
}
</script>