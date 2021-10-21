import { createRouter, createWebHistory } from "vue-router";
import { Home, NotFound } from "@/pages";

export const routes = [
  { path: "/", component: Home },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
