const INITIAL_STATE = {
  client: {
    connected: true,
  },
  search: {
    history: [],
  },
};

const ApplicationModule = {
  state: () => ({ ...INITIAL_STATE }),
  getters: {
    lastSearchedValue(state) {
      return [...state.search.history].pop();
    },
  },
  mutations: {
    setClientConnected(state, value) {
      state.client.connected = value;
    },

    setSearchHistory(state, value) {
      state.search.history = [...state.search.history, value];
    },
  },
  actions: {
    setClientConnected({ commit }, value) {
      commit("setClientConnected", value);
    },

    storeSearchedValue({ commit }, value) {
      commit("setSearchHistory", value);
    },
  },
};

export default ApplicationModule;
