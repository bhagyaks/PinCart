import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../../features/products/views/HomeView.vue";
import AuthView from "../../features/auth/views/AuthView.vue";

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth",
      component: AuthView,
    },
  ],
});
export default routes;
