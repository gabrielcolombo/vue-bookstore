const INITIAL_STATE = {
  client: {
    connected: true,
    theme: "light",
  },
};

const ApplicationModule = {
  state: () => ({ ...INITIAL_STATE }),
  mutations: {
    setClientConnected(state, value) {
      state.client.connected = value;
    },

    setClientTheme(state, value) {
      state.client.theme = value;
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
  },
};

export default ApplicationModule;
