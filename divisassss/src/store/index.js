import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader :{
      title   :  '',
      estatte  : false
    }
  },
  mutations: {
    showLoader(state,playload){
      state.loader.title    = playload.title
      state.loader.estatte  = true
    },
    hideLoader(state){
      state.loader.estatte= false
    }
  },
  actions: {
  },
  modules: {
  }
})
