<template lang="pug">
  div
    b-row.shadow.py-4.my-3.rounded-sm.cursor-pointer(
      v-for="(game, index) in games"
      :key="index"
      @click="$router.replace(`/games/${index}`)"
    )
      b-col {{ game.name }}
      b-col {{ game.location }}
      b-col {{ game.playersCount }}
    b-row.shadow.py-4.my-3.rounded-sm.cursor-pointer.d-flex.justify-content-center(
      @click="$router.replace(`/games/new`)"
    ) Create game
</template>
<script>
export default {
  name: 'GamesPage',
  middleware: 'redirectIfNotAuthenticated',
  computed: {
    games() {
      return this.$store.getters['games/games']
    }
  }
}
</script>