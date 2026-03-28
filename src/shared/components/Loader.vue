<template>
  <div class="flex flex-col items-center justify-center py-8">
    <!-- Spinner -->
    <div
      class="border-4 border-blue-400 border-t-transparent rounded-full w-12 h-12 animate-spin mb-4"
    ></div>

    <!-- Bouncing dots -->
    <div class="flex space-x-2 mb-4">
      <span class="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></span>
      <span
        class="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
        style="animation-delay: 0.15s"
      ></span>
      <span
        class="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
        style="animation-delay: 0.3s"
      ></span>
    </div>

    <!-- Optional loading text -->
    <p class="text-gray-500 text-sm md:text-base">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ text?: string }>();
const text = props.text || "Loading...";
</script>
