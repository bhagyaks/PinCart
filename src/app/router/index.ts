import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../../features/auth/store/authStore";

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../../features/products/views/HomeView.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../../features/auth/views/AuthView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../../features/cart/views/CartView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../../features/notFound/views/NotFoundView.vue"),
    },
  ],
});

routes.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.token) {
    return { name: "auth" };
  }

  if (to.meta.requiresGuest && auth.token) {
    return { name: "home" };
  }
});

export default routes;
