<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg text-center"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {{ message }}
        </p>
        <div class="mt-4 flex justify-between space-x-2">
          <button
            @click="$emit('cancel')"
            class="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{ show: boolean; title: string; message: string }>();
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
