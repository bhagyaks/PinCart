<template>
  <main class="min-h-screen bg-gray-100 p-4 md:p-8">
    <!-- Skeleton while loading -->
    <div
      v-if="productStore.loading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      aria-busy="true"
      aria-label="Loading products"
    >
      <ProductCardSkeleton v-for="n in 8" :key="n" />
    </div>

    <!-- Error -->
    <div
      v-else-if="productStore.error"
      class="text-center mt-20 text-red-500"
      role="alert"
    >
      <p class="text-lg font-semibold mb-2">Failed to load products</p>
      <p class="text-sm text-gray-500 mb-4">{{ productStore.error }}</p>
      <button
        @click="productStore.loadProducts()"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Retry
      </button>
    </div>

    <!-- Product Grid -->
    <template v-else>
      <p
        v-if="filteredProducts.length === 0"
        class="text-center mt-20 text-gray-500"
      >
        No products match "{{ search }}"
      </p>
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
    </template>

    <ProductDetailsModal
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      :product="selectedProduct"
      @close="isModalOpen = false"
    />
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import ProductCard from "../components/ProductCard.vue";
import ProductCardSkeleton from "../../../shared/components/ProductCardSkeleton.vue";
import ProductDetailsModal from "../components/ProductDetailsModal.vue";
import { useProductStore } from "../store/product.store";
import { useProductSearch } from "../composables/useProductSearch";
import type { Product } from "../product";

const props = defineProps<{ search: string }>();

const productStore = useProductStore();
const searchQuery = computed(() => props.search);
const { filteredProducts } = useProductSearch(
  computed(() => productStore.products),
  searchQuery,
);

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.loadProducts();
  }
});

const selectedProduct = ref<Product | null>(null);
const isModalOpen = ref(false);

const openProduct = (product: Product) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};
</script>
