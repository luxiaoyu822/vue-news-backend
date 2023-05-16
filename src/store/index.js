import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapse: false,
  },
  getters: {},
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      paths: ['isCollapse'],
    }),
  ],
})
