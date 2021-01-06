import Vue from "vue";
import Vuex from "vuex";
import services from "@/services/services.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: 'Felipe',
    user: {id: 'abc123', name:'Felipe Hanckes'},
    info: null,
    filteredInfo: null
  },
  mutations: {
    GET_LIST(state, data){
      state.info = data;
    },
    SET_FILTERED(state, data){
      state.filteredInfo = data
    }
  },
  actions: {
    getList ( {commit} ){
      console.log('corriendo la accion')
      services.getData()
      .then(response => {
//        let index = 0
//        let withId = {}
//        response.data.forEach(element => {
//          withId[index] = element
//          index += 1     --->
        let withId = []
        response.data.forEach(element => {
          withId.push(element)
        })
        commit('GET_LIST', withId)
      })
      .catch('hubo un error en el request')
    },
    getFiltered( {commit}, data){
      commit('SET_FILTERED', data)
    }
  },
  modules: {},
  getters: {}
})