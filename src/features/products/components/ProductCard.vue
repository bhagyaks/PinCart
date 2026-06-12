<template>
  <article
    class="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
  >
    <!-- Product Image -->
    <div class="relative overflow-hidden">
      <img
        :src="product.image"
        :alt="product.title"
        class="h-56 w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
      />

      <!-- Hover Action Buttons -->
      <div
        class="absolute inset-0 flex items-center justify-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
      >
        <button
          @click.stop="$emit('open-details', product)"
          class="bg-white shadow-md rounded-full p-3 hover:bg-gray-100"
          aria-label="Quick view"
        >
          👁️
        </button>

        <button
          @click.stop="handleAddToCart"
          class="bg-blue-600 text-white shadow-md rounded-full p-3 hover:bg-blue-700 transition-colors"
          aria-label="Add to cart"
        >
          🛒
        </button>

        <button
          class="bg-white shadow-md rounded-full p-3 hover:bg-gray-100"
          aria-label="Add to wishlist"
        >
          ♥️
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="text-sm font-semibold mb-1 truncate">
        {{ product.title }}
      </h3>

      <p class="text-blue-600 font-bold">${{ product.price }}</p>

      <!-- Rating -->
      <div class="flex items-center mt-1">
        <span v-for="n in 5" :key="n" class="text-yellow-400 text-sm">★</span>
        <span class="ml-2 text-gray-500 text-xs">
          ({{ product.rating?.count || 0 }})
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Product } from "../product";
import { useCartStore } from "../../cart/store/cartStore";
import { useToast } from "../../../shared/composables/useToast";

const props = defineProps<{ product: Product }>();
defineEmits<{ "open-details": [Product] }>();

const cartStore = useCartStore();
const { show } = useToast();

const handleAddToCart = () => {
  cartStore.addItem(props.product);
  show(`"${props.product.title.slice(0, 30)}…" added to cart`, "success");
};
</script>
