export const state = () => ({
  currentUser: null
})

export const getters = {
  currentUser: (state) => state.currentUser
}

export const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = payload
  },
  logout(state) {
    state.currentUser = null
  }
}

export const actions = {
  async getCurrentUser({ commit }, { user }) {
    let currentUser = await this.$fireStore
      .collection('users')
      .doc(user.uid)
      .get()
    
    console.log(currentUser)
    
    currentUser = currentUser.data()

    commit('setCurrentUser', currentUser)
  }
}
