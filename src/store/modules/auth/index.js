export default {
  state: () => ({
    authToken: null
  }),
  getters: {
    authToken(state) {
      return state.authToken
    },
    isAuthenticated(state) {
      return !!state.authToken
    }
  },
  mutations: {
    setAuthToken(state, payload) {
      state.authToken = payload
    }
  },
  actions: {
    auth({ commit }, token) {
      sessionStorage.setItem('token', token)
      commit('setAuthToken', token)
    },
    tryLogin({ commit }) {
      const token = sessionStorage.getItem('token')

      if (token) {
        commit('setAuthToken', token)
      }
    },
  }
}

