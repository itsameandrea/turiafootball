import Cookies from 'js-cookie'

export const state = () => ({

})

export const getters =  {

}

export const mutations = {

}

export const actions = {
  async login({ dispatch }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await this.$fireAuth.signInWithEmailAndPassword(email, password)
        const token = await this.$fireAuth.currentUser.getIdToken(true)
        Cookies.set('access_token', token)
        dispatch('users/getCurrentUser', { user }, { root: true })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  async register({ dispatch }, { name, email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await this.$fireAuth.createUserWithEmailAndPassword(email, password)
        await this.$fireStore
          .collection('users')
          .doc(user.uid)
          .set({ email, name, uid: user.uid })
        
        const token = await this.$fireAuth.currentUser.getIdToken(true)
        Cookies.set('access_token', token)
        
        dispatch('users/getCurrentUser', { user }, { root: true })

        resolve(user.uid)
      } catch (error) {
        reject(error)
      }
    })
  }
}