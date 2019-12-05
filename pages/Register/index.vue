<template lang="pug">
  .shadow.p-5
    h1 Create Account
    b-form(
      @submit.prevent="onSubmit"
    )
      b-form-group(
        label="Name"
      )
        b-form-input(
          v-model="form.name"
          type="text"
          placeholder="Enter name"
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
  name: 'RegisterPage',
  middleware: 'redirectIfAuthenticated',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('auth/register', this.form)
        this.$router.replace('/games')
        this.toastSuccess('Account created!')
      } catch (error) {
        this.toastError('Error while creating an account')
      }
    }
  }
}
</script>