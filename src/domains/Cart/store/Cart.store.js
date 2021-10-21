const INITIAL_STATE = {
  items: [],
};

const CartModule = {
  state: () => ({ ...INITIAL_STATE }),
  getters: {
    count(state) {
      return state.items.length;
    },

    total(state) {
      return state.items
        .map((item) => ({ ...item, total: item.quantity * item.price }))
        .reduce((sum, item) => sum + item.total, 0);
    },
  },
  mutations: {
    setCartItems(state, items) {
      state.items = items;
    },
  },
  actions: {
    addItem({ commit, state }, value) {
      commit("setCartItems", [...state.items, value]);
    },

    updateItem({ commit, state }, value) {
      const items = state.items.map((item) => {
        if (item.id === value.id) {
          return { ...item, ...value };
        }

        return item;
      });

      commit("setCartItems", items);
    },

    removeItem({ commit, state }, value) {
      const items = state.items.filter((item) => item.id !== value.id);

      commit("setCartItems", items);
    },
  },
};

export default CartModule;
