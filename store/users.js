export const state = () => ({
  currentUser: null
})

export const getters = {
  currentUser: (state) => state.currentUser
}

export const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = payload
  }
}

export const actions = {
  async getCurrentUser({ commit }, { user }) {
    let currentUser = await this.$fireStore
      .collection('users')
      .doc(user.uid)
      .get()
    
    currentUser = currentUser.data()

    commit('setCurrentUser', currentUser)
  }
}
