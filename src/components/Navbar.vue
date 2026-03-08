<template>
  <nav
    class="bg-black text-white shadow px-4 py-3 flex items-center justify-between"
  >
    <!-- Left: Logo -->
    <div class="flex items-center space-x-2">
      <img
        :src="Logo"
        alt="PinCart Logo"
        class="h-12 w-12 md:h-16 md:w-16 object-contain m-0"
      />
      <span
        class="font-bold text-xl md:text-2xl self-end"
        aria-label="PinCart Home"
        >inCart</span
      >
    </div>

    <!-- Center: Search bar (hidden on mobile) -->
    <div class="flex-1 hidden md:flex justify-center">
      <div class="relative w-64 md:w-80 lg:w-96">
        <span class="absolute inset-y-0 left-3 flex items-center text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 md:h-7 md:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112.5 3a7.5 7.5 0 014.15 13.65z"
            />
          </svg>
        </span>
        <input
          v-model="localsearch"
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          class="w-full border border-gray-700 bg-black text-white rounded-full py-1.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm md:text-base"
        />
      </div>
    </div>

    <!-- Right: Menu / Hamburger -->
    <div class="flex items-center space-x-3 md:space-x-4">
      <!-- Hamburger for mobile -->
      <button
        class="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Desktop menu -->
      <div class="hidden md:flex items-center space-x-3 md:space-x-4">
        <button
          class="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
          aria-label="Login"
        >
          Login
        </button>
        <button
          class="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
          aria-label="Cart"
        >
          Cart
        </button>
        <button
          class="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
          aria-label="Profile"
        >
          Profile
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile menu -->
  <div v-if="mobileMenuOpen" class="md:hidden bg-black shadow p-4 space-y-2">
    <input
      v-model="localsearch"
      type="text"
      placeholder="Search products..."
      aria-label="Search products"
      class="w-full border border-gray-700 bg-black text-white rounded-full py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
    />
    <button
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Login
    </button>
    <button
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Cart
    </button>
    <button
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Profile
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Logo from "../assets/logo1.png";
const props = defineProps<{
  search?: string;
}>();
const localsearch = ref(props.search || "");
const mobileMenuOpen = ref(false);
const emit = defineEmits<{ (e: "update:search", value: string): void }>();

// Emit search input to parent
watch(localsearch, (val) => {
  emit("update:search", val);
});
</script>
<style></style>
