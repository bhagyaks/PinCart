<template>
  <article
    class="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
    aria-hidden="true"
  >
    <div class="h-56 bg-gray-200"></div>
    <div class="p-4 space-y-2">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="flex space-x-1 mt-2">
        <div v-for="n in 5" :key="n" class="h-3 w-3 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </article>
</template>
