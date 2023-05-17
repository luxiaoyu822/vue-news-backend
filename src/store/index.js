import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapse: false,
    userInfo: {},
  },
  getters: {},
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    windowChangeCollapse(state, value) {
      state.isCollapse = value
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value,
      }
    },
    clearUserInfo(state) {
      state.userInfo = {}
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      paths: ['isCollapse', 'userInfo'],
    }),
  ],
})
