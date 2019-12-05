<template lang="pug">
  .shadow.p-5
    h1 Create Game
    b-form(
      @submit.prevent="onSubmit"
    )
      b-form-group(
        label="Name"
      )
        b-form-input(
          v-model="form.name"
          required
          type="text"
          placeholder="Enter name"
        )
      b-form-group(
        label="Price"
      )
        b-form-input(
          v-model="form.price"
          required
          type="number"
          placeholder="Enter price"
        )
      b-form-group(
        label="Location"
      )
        b-form-input(
          v-model="form.location"
          type="text"
          required
          placeholder="Enter location"
        )
      b-button(
        type="submit"
        variant="success"
      ) Submit
</template>
<script>
export default {
  name: 'NewGame',
  data() {
    return {
      form: {
        name: '',
        price: '',
        location: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        const gameId = await this.$store.dispatch('games/createGame', this.form)
        this.toastSuccess('Game Created!')

        this.$router.push(`/games/${gameId}`)
      } catch (error) {
        this.toastError('Error while creating the game...')
      }
    }
  }
}
</script>