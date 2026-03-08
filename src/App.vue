<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";

const search = ref("");
</script>
<template>
  <Navbar v-model:search="search" />
  <router-view :search="search" />
</template>
