import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://219u122.mars1.mars-hosting.com/api/",
    loader: false,
    curLanguage: "EN",
    emailReg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    confirm_modal: false,
    confirm_mssg: ""
    // isLogged: localStorage.getItem("sid")
  },
  mutations: {
    CHANGE_CURLANGUAGE(state, payload) {
      state.curLanguage = payload;
    },
    CHANGE_LOADER(state, payload) {
      state.loader = payload;
    },
   CHANGE_CONFIRM(state, payload) {
     state.confirm_modal = payload;
   },
   CHANGE_CONFIRM_MSSG(state, payload) {
     state.confirm_mssg = payload;
   }
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
   changeConfirm(store, payload) {
     store.commit('CHANGE_CONFIRM', payload);
   },
   changeConfirmMssg(store,payload) {
     store.commit('CHANGE_CONFIRM_MSSG', payload);
   }
    // changeIsLogged(store, payload) {
    //   store.commit('CHANGE_ISLOGGED', payload);
    // }
  },
  modules: {
  }
})
