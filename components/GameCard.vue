<template lang="pug">
  b-card.cursor-pointer(
    img-src="https://source.unsplash.com/random/150x150?football"
    img-alt="Card image"
    :img-left="!isMobile"
    :img-top="isMobile"
    class="mb-3"
  )
    b-col
      span.font-weight-bold When: 
      |{{ game.date }}
    b-col
      span.font-weight-bold Where: 
      |{{ game.location }}
    b-col
      span.font-weight-bold # Players: 
      |{{ game.players.length }} 
      span(v-if="game.players.length < 18") (Missing {{ 18 - game.players.length }})
</template>
<script>
export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      required: true
    }
  }
}
</script>