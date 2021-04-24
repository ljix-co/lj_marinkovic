import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://219u122.mars1.mars-hosting.com/api/",
    loader: false,
    curLanguage: "EN",
    // isLogged: localStorage.getItem("sid")
  },
  mutations: {
    CHANGE_CURLANGUAGE(state, payload) {
      state.curLanguage = payload;
    },
    CHANGE_LOADER(state, payload) {
      state.loader = payload;
    },
   
    // CHANGE_ISLOGGED(state, payload) {
    //   state.isLogged = payload;
    // }
  },
  actions: {
    changeCurLanguage(store, payload) {
      store.commit('CHANGE_CURLANGUAGE', payload);
    },
    changeLoader(store, payload) {
      store.commit('CHANGE_LOADER', payload);
    },
   
    // changeIsLogged(store, payload) {
    //   store.commit('CHANGE_ISLOGGED', payload);
    // }
  },
  modules: {
  }
})
