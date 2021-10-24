import { Storage } from "@/services";

const history = Storage.get("SEARCHED_TERMS");
const lastResults = Storage.get("LAST_RESULTS");

const INITIAL_STATE = {
  search: {
    history: history ? JSON.parse(history) : [],
    lastResults: lastResults ? JSON.parse(lastResults) : [],
    hasInteractedPreviously: false,
  },
};

const BookshelfModule = {
  state: () => ({ ...INITIAL_STATE }),
  getters: {
    lastSearchedValue(state) {
      return [...state.search.history].pop() || "";
    },

    lastSearchResults(state) {
      return state.search.lastResults;
    },

    lastSearchQueries(state) {
      const { length } = state.search.history;

      return state.search.history.slice(Math.max(length - 5, 0));
    },
  },
  mutations: {
    setSearchHistory(state, value) {
      const history = Array.from(new Set([...state.search.history, value]));

      state.search.history = history;

      Storage.set(
        "SEARCHED_TERMS",
        JSON.stringify(history.slice(Math.max(length - 5, 0)))
      );
    },

    setLastSearchResults(state, value) {
      state.search.lastResults = value;

      Storage.set("LAST_RESULTS", JSON.stringify(value));
    },

    setPreviousInteraction(state, value) {
      state.search.hasInteractedPreviously = value;

      Storage.set("PREVIOUS_INTERACTION", value);
    },
  },
  actions: {
    storeSearchedValue({ commit }, value) {
      if (value) {
        commit("setSearchHistory", value);
      }
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
