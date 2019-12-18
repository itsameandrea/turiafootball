<template lang="pug">
  b-container.mt-5(v-if="game")
    checkout-modal(
      :visible="showCheckout"
      :game-id="$route.params.id"
      @close="showCheckout = false"
      @paid="onPaid"
    )
    b-row
      b-col(xs="12" md="6")
        game-card(
          :game="game"
        )
      b-col.d-flex.flex-column(
        xs="12"
        md="6"
        v-if="game.players"
      )
        div.d-flex.flex-column.justify-content-start.mb-2(
          v-for="i in maxSlots"
          :key="i"
        )
          div.text-center.mb-3(v-if="i == 19") Reserves
          .shadow.rounded-sm.p-0(
            sm="12"
          )
            div.text-center.py-3.bg-primary(v-if="game.players[i - 1]") {{ i }} - {{ game.players[i -1].name }}
            div.text-center.bg-light.py-3.cursor-pointer(
              v-else
              @click="onAddPlayer"
            ) {{ i }} - Pay and sign up
</template>
<script>
import CheckoutModal from '@/components/CheckoutModal'
import GameCard from '@/components/GameCard'

export default {
  name: 'GamePage',
  middleware: 'redirectIfNotAuthenticated',
  components: {
    CheckoutModal,
    GameCard
  },
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
    async onPaid() {
      try {
        await this.$store.dispatch('games/addPlayerToGame', {
          gameId: this.$route.params.id
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