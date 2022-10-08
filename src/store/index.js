import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    originalRoute: '',
    user: {
      playerCurrency: 0,
      playerInventory: [],
      saveData: {},
    },
    userID: null,
    inventory: [],
    currentStory: {},
    items: [],
    loadingMessage: null,
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    removeUser(state) {
      state.userID = null;

      state.user = {
        playerCurrency: 0,
        playerInventory: [],
      };

      state.inventory = [];
    },

    setUserID(state, userID) {
      state.userID = userID;
    },

    setInventory(state, inventory) {
      state.inventory = inventory;
    },

    setItems(state, items) {
      state.items = items;
    },

    updateInventory(state, inventory) {
      state.inventory = inventory;
    },

    addToInventory(state, item) {
      state.inventory.push(item);
      state.user.playerInventory.push(item.itemID);
    },

    subtractCurrency(state, amount) {
      state.user.playerCurrency -= amount;
    },

    addCurrency(state, amount) {
      state.user.playerCurrency += amount;
    },

    setLoadingMessage(state, message) {
      state.loadingMessage = message;
    },

    setOriginalRoute(state, route) {
      state.originalRoute = route;
    },
  },
  actions: {
  },
  modules: {
  }
})
