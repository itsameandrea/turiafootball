<template lang="pug">
  .shadow.p-5
    h1 Login to your account
    b-form(
      @submit.prevent="onSubmit"
    )
      b-form-group(
        label="Email"
      )
        b-form-input(
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        )
      b-form-group(
        label="Password"
      )
        b-form-input(
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        )
      b-button(
        type="submit"
        variant="success"
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

  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$router.replace('/games')
        this.toastSuccess('Logged in!')
      } catch (error) {
        this.toastError('Error while creating logging you in')
      }
    }
  }
}
</script>