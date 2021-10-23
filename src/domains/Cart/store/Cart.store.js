import { Storage } from "@/services";

const items = Storage.get("CART_ITEMS");

const INITIAL_STATE = {
  items: items ? JSON.parse(items) : [],
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
      const items = [...state.items, value];

      commit("setCartItems", items);

      Storage.set("CART_ITEMS", JSON.stringify(items));
    },

    updateItem({ commit, state }, value) {
      const items = state.items.map((item) => {
        if (item.id === value.id) {
          return { ...item, ...value };
        }

        return item;
      });

      commit("setCartItems", items);

      Storage.set("CART_ITEMS", JSON.stringify(items));
    },

    removeItem({ commit, state }, value) {
      const items = state.items.filter((item) => item.id !== value.id);

      commit("setCartItems", items);

      Storage.set("CART_ITEMS", JSON.stringify(items));
    },
  },
};

export default CartModule;
