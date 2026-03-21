<template>
  <form @submit.prevent="handleRegister" novalidate class="space-y-4">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700"
        >Username</label
      >
      <input
        id="username"
        v-model="form.username"
        type="text"
        required
        placeholder="Choose a username"
        class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter your email"
        class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        placeholder="Choose a password"
        class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
      />
    </div>

    <p v-if="auth.error" role="alert" class="text-red-500 text-sm">
      {{ auth.error }}
    </p>

    <button
      type="submit"
      class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Register
    </button>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="showToast"
        class="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 bg-yellow-400 text-black px-4 py-2 rounded shadow-md z-50"
        role="status"
        aria-live="polite"
      >
        Backend development ongoing. Registration not functional yet.
      </div>
    </transition>
  </form>
</template>
<script setup lang="ts">
import { reactive, ref, watch, nextTick } from "vue";
import { useAuthStore } from "../../stores/authStore";
const showToast = ref(false);
const auth = useAuthStore();
const errorRef = ref<HTMLElement | null>(null);
const form = reactive({
  username: "",
  email: "",
  password: "",
  name: {
    firstname: "",
    lastname: "",
  },
  phone: "",
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
const handleRegister = () => {
  showToast.value = true;

  // Auto hide after 3 seconds
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
  // await auth.register(form);
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
