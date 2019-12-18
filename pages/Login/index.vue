<template lang="pug">
  .d-flex.flex-column.align-items-center.h-100
        h3.py-3 Login
        b-form(
          @submit.prevent="onSubmit"
        )
          b-input-group(
            class="mb-3"
            prepend="Email"
          )
            b-form-input(
              v-model="form.email"
              type="email"
              placeholder="john@smith.com"
            )
          b-input-group(
            class="mb-3"
            prepend="Password"
          )
            b-form-input(
              v-model="form.password"
              type="password"
              placeholder="*****"
            )
          b-button.w-100(
            type="submit"
            variant="primary"
          ) Submit
</template>
<script>
export default {
  name: 'LoginPage',
  middleware: 'redirectIfAuthenticated',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters['users/currentUser']
    }
  },
  watch: {
    user(val) {
      if (val) {
        this.$router.replace('/games')
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$router.replace('/games')
        this.toastSuccess('Logged in!')
      } catch (error) {
        this.toastError('Error while logging you in')
      }
    }
  }
}
</script>