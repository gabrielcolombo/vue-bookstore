import { createStore } from "vuex";
import { ApplicationModule } from "@domains/Application/store";
import { BookshelfModule } from "@domains/Books/store";
import { CartModule } from "@domains/Cart/store";

const store = createStore({
  modules: {
    application: {
      namespaced: true,
      ...ApplicationModule,
    },
    bookshelf: {
      namespaced: true,
      ...BookshelfModule,
    },
    cart: {
      namespaced: true,
      ...CartModule,
    },
  },
});

export default store;
