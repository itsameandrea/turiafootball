<template lang="pug">
  .d-flex.flex-column.align-items-center.h-100
        h3.py-3 Create Account
        b-form(
          @submit.prevent="onSubmit"
        )
          b-input-group(
            class="mb-3"
            prepend="Name"
          )
            b-form-input(
              v-model="form.name"
              type="text"
              placeholder="John Smith"
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