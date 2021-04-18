import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://219u122.mars1.mars-hosting.com/api/",
    loader: false,
    loaded_img: false,
    // isLogged: localStorage.getItem("sid")
  },
  mutations: {
    CHANGE_LOADER(state, payload) {
      state.loader = payload;
    },
    CHANGE_LOADED_IMG(state, payload) {
      state.loaded_img = payload;
    },
    // CHANGE_ISLOGGED(state, payload) {
    //   state.isLogged = payload;
    // }
  },
  actions: {
    changeLoader(store, payload) {
      store.commit('CHANGE_LOADER', payload);
    },
    changeLoadedImg(store, payload) {
      store.commit('CHANGE_LOADED_IMG', payload);
    },
    // changeIsLogged(store, payload) {
    //   store.commit('CHANGE_ISLOGGED', payload);
    // }
  },
  modules: {
  }
})
