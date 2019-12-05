<template lang="pug">
  div(v-if="game")
    checkout-modal(:visible="showCheckout" @paid="onPaid")
    b-row
      b-col {{ game.name }}
    b-row
      b-col {{ game.location }}
    b-row.d-flex.flex-column.w-100(v-if="game.players")
      div(
        v-for="i in maxSlots"
        :key="i"
      )
        div.text-center.mb-3(v-if="i == 19") Reserves
        .shadow.rounded-sm.my-3.p-0(
          sm="12"
        )
          div.text-center.py-3(v-if="game.players[i - 1]") {{ i }} - {{ game.players[i -1].name }}
          div.text-center.bg-success.text-white.py-3.cursor-pointer(
            v-else
            @click="onAddPlayer"
          ) {{ i }} - Pay and sign up
</template>
<script>
import CheckoutModal from '@/components/CheckoutModal'

export default {
  name: 'GamePage',
  middleware: 'redirectIfNotAuthenticated',
  components: { CheckoutModal },
  data() {
    return {
      maxPlayers: 18,
      maxReserves: 6,
      showCheckout: false
    }
  },
  computed: {
    game() {
      return this.$store.getters['games/game'](this.$route.params.id)
    },
    user() {
      return this.$store.getters['users/currentUser']
    },
    isEligible() {
      if (!this.game.players.length) {
        return true
      }

      if (!this.game.players.find((player) => player.uid === this.user.uid)) {
        return true
      }

      return false
    },
    maxSlots() {
      return this.maxPlayers + this.maxReserves
    }
  },
  methods: {
    onAddPlayer() {
      if (this.isEligible) {
        this.showCheckout = true
      } else {
        this.toastError('You are already signed up for this game')
      }
    },
    async onPaid(token) {
      try {
        await this.$store.dispatch('games/addPlayerToGame', {
          gameId: this.$route.params.id,
          token
        })

        this.showCheckout = false
        this.toastSuccess(`You've been added to this game`)
      } catch (error) {
        this.toastError('Something went wrong when adding you to the game')
      }
    }
  }
}
</script>