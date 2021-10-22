const INITIAL_STATE = {
  client: {
    connected: true,
    theme: "light",
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

    setClientTheme(state, value) {
      state.client.theme = value;
    },

    setSearchHistory(state, value) {
      state.search.history = [...state.search.history, value];
    },
  },
  actions: {
    setClientConnected({ commit }, value) {
      commit("setClientConnected", value);
    },

    toggleClientTheme({ commit, state }) {
      commit(
        "setClientTheme",
        state.client.theme === "light" ? "dark" : "light"
      );
    },

    storeSearchedValue({ commit }, value) {
      commit("setSearchHistory", value);
    },
  },
};

export default ApplicationModule;
