<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gray-100 p-4"
  >
    <div class="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
      <h1 class="text-3xl font-bold text-center mb-6">Welcome to PinCart</h1>

      <!-- Tabs -->
      <div class="flex mb-6 border-b border-gray-300">
        <button
          :class="
            activeTab === 'login'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          "
          class="flex-1 py-2 text-center font-medium focus:outline-none"
          @click="activeTab = 'login'"
          aria-current="page"
        >
          Login
        </button>
        <button
          :class="
            activeTab === 'register'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          "
          class="flex-1 py-2 text-center font-medium focus:outline-none"
          @click="activeTab = 'register'"
        >
          Register
        </button>
      </div>

      <!-- Forms -->
      <div>
        <LoginForm v-if="activeTab === 'login'" />
        <RegisterForm v-else />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";

const activeTab = ref<"login" | "register">("login");
</script>
