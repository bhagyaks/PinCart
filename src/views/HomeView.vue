<template>
  <main class="min-h-screen bg-gray-100 p-4 md:p-8">
    <!-- Loading -->
    <Loader v-if="productStore.loading" text="Loading products..." />

    <!-- Product Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @open-details="openProduct"
      />
    </div>
    <ProductDetailsModal
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      :product="selectedProduct"
      @close="isModalOpen = false"
    />
    <!-- Error -->
    <div v-if="productStore.error" class="text-center mt-6 text-red-500">
      {{ productStore.error }}
    </div>
  </main>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useProductStore } from "../stores/productStore";
import ProductCard from "../components/ProductCard.vue";
import Loader from "../components/Loader.vue";
import { Product } from "../types/product";
import ProductDetailsModal from "../components/ProductDetailsModal.vue";

const productStore = useProductStore();
const props = defineProps<{ search: string }>();
onMounted(() => {
  productStore.loadProducts();
});
const filteredProducts = computed(() => {
  return productStore.products.filter((product) =>
    product.title.toLowerCase().includes(props.search.toLowerCase()),
  );
});

const selectedProduct = ref<Product | null>(null);
const isModalOpen = ref(false);
const openProduct = (product: Product) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};
</script>
