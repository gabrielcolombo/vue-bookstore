import { createRouter, createWebHistory } from "vue-router";
import { Home, Cart, NotFound } from "@/pages";

export const routes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
