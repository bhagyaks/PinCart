import { defineStore } from "pinia";
import { login, register } from "../api/authApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | { username: string },
    token: localStorage.getItem("token") as string | null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await login(username, password);
        this.token = response.data.token;
        localStorage.setItem("token", this.token ?? "");
      } catch {
        this.error = "Invalid credentials. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    async register(userData: {
      username: string;
      email: string;
      password: string;
    }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await register(userData);
        this.user = response.data;
      } catch {
        this.error = "Registration failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
