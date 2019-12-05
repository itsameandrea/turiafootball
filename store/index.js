import { getUserFromCookie } from '@/utils'

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    const { user_id: uid } = getUserFromCookie(req)

    if (uid) {
      let user = await this.$fireStore
        .collection('users')
        .doc(uid)
        .get()   
      
      if (user) {
        user = user.data()
        commit('users/setCurrentUser', user)
        await dispatch('games/getGames')
      }
    }
  }
}