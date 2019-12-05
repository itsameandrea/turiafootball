import firebase from 'firebase'

export const state = () => ({
  games: {}
})

export const getters = {
  games: (state) => state.games,
  game: (state) => (id) => state.games[id]
}

export const mutations = {
  setGames(state, payload) {
    state.games = payload
  },
  updateGame(state, { id, game }) {
    state.games[id] = {
      ...state.games[id],
      ...game
    }
  }
}

export const actions = {
  createGame({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const ref = await this.$fireStore
          .collection('games')
          .add({ ...payload, players: [] })

        let game = await ref.get()
        game = game.data()
        
        const { id } = ref

        commit('setGames', {
          [id]: game
        })

        resolve(id)
      } catch (error) {
        reject(error)
      }
    })
  },
  getGames({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const snapshot = await this.$fireStore
          .collection('games')
          .get()

        const games = {}
        snapshot.docs.forEach((doc) => games[doc.id] = doc.data())
                
        commit('setGames', games)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  addPlayerToGame({ dispatch, state, rootGetters }, { gameId, token }) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = rootGetters['users/currentUser']
        const game = state.games[gameId]

        console.log('Calling the function...')

        const processPayment = await firebase.functions().httpsCallable('processPayment')
        
        const charge = await processPayment({
          user,
          game,
          token
        })

        console.log('This is the charge: ', charge)

        const gameRef = await this.$fireStore
          .collection('games')
          .doc(gameId)

        await gameRef.update({
          players: firebase.firestore.FieldValue.arrayUnion(user)
        })
        await dispatch('getGames')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
