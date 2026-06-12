<script setup lang="ts">
import { ref } from "vue";
import Navbar from "./app/layout/Navbar.vue";
import Toast from "./shared/components/Toast.vue";

const search = ref("");
</script>

<template>
  <Navbar v-model:search="search" />
  <router-view :search="search" />
  <Toast />
</template>
