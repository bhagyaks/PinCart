import { defineStore } from "pinia";
import { login, register } from "../api/authApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null as string | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await login(username, password);
        this.token = response.data.token;
        localStorage.setItem("token", this.token || "");
      } catch (error) {
        this.error = "Invalid credentials";
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
      } catch (error) {
        this.error = "Registration failed";
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
