<template>
  <transition name="fade">
    <div
      v-if="isOpen && product"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
      role="dialog"
      aria-modal="true"
      :aria-label="product.title"
      @keydown.esc="$emit('close')"
    >
      <!-- Modal container -->
      <div
        class="relative bg-white rounded-xl shadow-xl max-w-4xl w-[90%] md:w-[80%] lg:w-[70%] p-6"
      >
        <!-- Close button -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-500 hover:text-black focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Close product details"
          autofocus
        >
          ✕
        </button>

        <!-- Content -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Product Image -->
          <div class="flex items-center justify-center">
            <img
              :src="product.image"
              :alt="product.title"
              class="max-h-87.5 object-contain"
            />
          </div>

          <!-- Product Info -->
          <div class="flex flex-col">
            <h2 class="text-2xl font-bold mb-3">
              {{ product.title }}
            </h2>

            <p class="text-blue-600 font-semibold text-xl mb-3">
              ${{ product.price.toFixed(2) }}
            </p>

            <!-- Rating -->
            <div class="flex items-center mb-4" aria-label="Product rating">
              <span
                v-for="n in 5"
                :key="n"
                :class="
                  n <= Math.round(product.rating?.rate ?? 0)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                "
              >★</span>
              <span class="ml-2 text-gray-500 text-sm">
                {{ product.rating?.rate ?? 0 }} ({{ product.rating?.count ?? 0 }} reviews)
              </span>
            </div>

            <!-- Description -->
            <p class="text-gray-600 text-sm mb-6">
              {{ product.description }}
            </p>

            <!-- Buttons -->
            <div class="flex gap-3 mt-auto">
              <button
                @click="handleAddToCart"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
              >
                Add to Cart
              </button>

              <button
                class="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition-colors"
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Product } from "../product";
import { useCartStore } from "../../cart/store/cartStore";
import { useToast } from "../../../shared/composables/useToast";

const props = defineProps<{
  product: Product | null;
  isOpen: boolean;
}>();
const emit = defineEmits<{ close: [] }>();

const cartStore = useCartStore();
const { show } = useToast();

const handleAddToCart = () => {
  if (!props.product) return;
  cartStore.addItem(props.product);
  show(`"${props.product.title.slice(0, 30)}…" added to cart`, "success");
  emit("close");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
