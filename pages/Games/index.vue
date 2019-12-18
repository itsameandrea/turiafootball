<template lang="pug">
 .m-5.d-flex.flex-column
    game-card(
      v-for="(game, index) in games"
      :key="index"
      :game="game"
      @click.native="$router.push(`/games/${index}`)"
    )
    b-button.shadow.w-100.bg(
      variant="primary"
      @click="$router.push(`/games/new`)"
    ) Create game
</template>
<script>
import GameCard from '@/components/GameCard'

export default {
  name: 'GamesPage',
  middleware: 'redirectIfNotAuthenticated',
  components: {
    GameCard
  },
  computed: {
    games() {
      return this.$store.getters['games/games']
    }
  },
  async created() {
    await this.$store.dispatch('games/getGames')
  }
}
</script>