import { createStore } from "vuex";
import ApplicationModule from "@/store/application.store";

const store = createStore({
  modules: {
    application: {
      namespaced: true,
      ...ApplicationModule,
    },
  },
});

export default store;
