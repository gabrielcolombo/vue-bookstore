const INITIAL_STATE = {
  search: {
    history: [],
    lastResults: [],
    hasInteractedPreviously: false,
  },
};

const BookshelfModule = {
  state: () => ({ ...INITIAL_STATE }),
  getters: {
    lastSearchedValue(state) {
      return [...state.search.history].pop();
    },

    lastSearchResults(state) {
      return state.search.lastResults;
    },
  },
  mutations: {
    setSearchHistory(state, value) {
      state.search.history = Array.from(
        new Set([...state.search.history, value])
      );
    },

    setLastSearchResults(state, value) {
      state.search.lastResults = value;
    },

    setPreviousInteraction(state, value) {
      state.search.hasInteractedPreviously = value;
    },
  },
  actions: {
    storeSearchedValue({ commit }, value) {
      commit("setSearchHistory", value);
    },

    storeLastSearchResults({ commit }, value) {
      commit("setLastSearchResults", value);
    },

    setPreviousInteraction({ commit }, value) {
      commit("setPreviousInteraction", value);
    },
  },
};

export default BookshelfModule;
