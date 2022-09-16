import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    inventory: [],
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setInventory(state, inventory) {
      state.inventory = inventory;
    },

    updateInventory(state, inventory) {
      state.inventory = inventory;
    },

    addToInventory(state, item) {
      state.inventory.push(item);
    }
  },
  actions: {
  },
  modules: {
  }
})
