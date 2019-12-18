<template lang="pug">
  .shadow.p-5.mt-5
    h1.h3 Create Game
    b-form(
      @submit.prevent="onSubmit"
    )
      b-form-group(
        label="Date"
      )
        flat-pickr(
          v-model="form.date"
          :config="pickrConfig"
          class="form-control"
          placeholder="Select date"
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
      ) Create
</template>
<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'NewGame',
  data() {
    return {
      form: {
        date: '',
        price: '',
        location: ''
      },
      pickrConfig: {
        wrap: true,
        dateFormat: 'd/m/Y at H:i',
        enableTime: true,
        time_24hr: true
      }
    }
  },
  components: {
    flatPickr
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