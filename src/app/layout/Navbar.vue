<template>
  <nav
    class="bg-black text-white shadow px-4 py-3 flex items-center justify-between"
  >
    <!-- Left: Logo -->
    <div
      class="flex items-center space-x-2 cursor-pointer"
      @click="$router.push('/')"
    >
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
        <template v-if="!isLoggedIn">
          <router-link
            to="/auth"
            class="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
            aria-label="sign in"
          >
            Sign In
          </router-link>
        </template>
        <template v-else>
          <button
            disabled
            class="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
            aria-label="Profile"
          >
            Profile
          </button>
          <button
            @click="handleLogout"
            class="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
            aria-label="Logout"
          >
            Logout
          </button>
          <LogoutModal
            :show="showLogoutModal"
            @confirm="confirmLogout"
            @cancel="showLogoutModal = false"
            title="Confirm Logout"
            message="Are you sure you want to logout?"
          />
        </template>
        <button
          disabled
          class="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
          aria-label="Cart (coming soon)"
        >
          Cart
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
    <template v-if="!isLoggedIn">
      <router-link
        to="/auth"
        class="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        aria-label="Sign In"
      >
        Sign In
      </router-link>
    </template>
    <template v-else>
      <button
        disabled
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Profile"
      >
        Profile
      </button>
      <button
        @click="handleLogout"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Logout"
      >
        Logout
      </button>
      <LogoutModal
        :show="showLogoutModal"
        @confirm="confirmLogout"
        @cancel="showLogoutModal = false"
        title="Confirm Logout"
        message="Are you sure you want to logout?"
      />
    </template>
    <button
      disabled
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Cart (coming soon)"
    >
      Cart
    </button>
  </div>
  <transition name="fade">
    <div
      v-if="showToast"
      class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md"
      role="status"
      aria-live="polite"
    >
      Logged out successfully
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Logo from "../../assets/logo1.png";
import LogoutModal from "../../features/auth/components/LogoutModal.vue";
import { useAuthStore } from "../../features/auth/store/authStore";

const props = defineProps<{
  search?: string;
}>();
const router = useRouter();
const auth = useAuthStore();
const isLoggedIn = computed(() => !!auth.token);
const showLogoutModal = ref(false);
const showToast = ref(false);
const localsearch = ref(props.search || "");
const mobileMenuOpen = ref(false);
const emit = defineEmits<{ (e: "update:search", value: string): void }>();

// Emit search input to parent
watch(localsearch, (val) => {
  emit("update:search", val);
});

const handleLogout = () => {
  showLogoutModal.value = true;
};

const confirmLogout = () => {
  auth.logout();
  showLogoutModal.value = false;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
  router.push("/auth");
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
