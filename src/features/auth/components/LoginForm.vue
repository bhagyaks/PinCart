<template>
  <form @submit.prevent="handleLogin" novalidate class="space-y-4">
    <div
      class="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-3 rounded-md text-sm"
      role="alert"
      aria-live="polite"
    >
      <p><strong>Note:</strong> Registration is not available yet.</p>
      <p>
        Use <strong>Username:</strong> <code>johnd</code> |
        <strong>Password:</strong> <code>m38rmF$</code> to login.
      </p>
    </div>
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700"
        >Username</label
      >
      <input
        id="username"
        v-model="username"
        type="text"
        required
        placeholder="Enter your username"
        class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
        ref="usernameRef"
        :aria-invalid="auth.error ? 'true' : 'false'"
        aria-describedby="error-msg"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        id="password"
        v-model="password"
        type="password"
        required
        placeholder="Enter your password"
        class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
        :aria-invalid="auth.error ? 'true' : 'false'"
      />
    </div>

    <p
      v-if="auth.error"
      id="error-msg"
      role="alert"
      class="text-red-500 text-sm"
    >
      {{ auth.error }}
    </p>

    <button
      type="submit"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      :disabled="auth.loading"
      :aria-busy="auth.loading ? 'true' : 'false'"
    >
      {{ auth.loading ? "Logging in..." : "Login" }}
    </button>
  </form>
</template>
<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
const router = useRouter();
const auth = useAuthStore();
const username = ref("johnd");
const password = ref("m38rmF$");
const usernameRef = ref<HTMLInputElement | null>(null);
const errorRef = ref<HTMLElement | null>(null);
onMounted(() => {
  usernameRef.value?.focus();
});
watch(
  () => auth.error,
  async (newError) => {
    if (newError) {
      await nextTick();
      errorRef.value?.focus();
    }
  },
);
const handleLogin = async () => {
  await auth.login(username.value, password.value);
  if (auth.token) router.push("/");
};
</script>
