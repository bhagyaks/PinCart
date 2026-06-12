<template>
  <main class="min-h-screen bg-gray-100 p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-6">Your Cart</h1>

    <!-- Empty state -->
    <div
      v-if="cartStore.isEmpty"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <span class="text-6xl mb-4" aria-hidden="true">🛒</span>
      <p class="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</p>
      <p class="text-gray-400 mb-6">Add some products to get started</p>
      <router-link
        to="/"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Continue Shopping
      </router-link>
    </div>

    <!-- Cart content -->
    <div v-else class="max-w-4xl mx-auto">
      <div class="space-y-4 mb-8">
        <article
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
        >
          <img
            :src="item.product.image"
            :alt="item.product.title"
            class="h-20 w-20 object-contain flex-shrink-0"
          />

          <div class="flex-1 min-w-0">
            <h2 class="font-semibold text-sm truncate">{{ item.product.title }}</h2>
            <p class="text-blue-600 font-bold mt-1">${{ item.product.price.toFixed(2) }}</p>
          </div>

          <!-- Quantity controls -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
              class="h-8 w-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-bold leading-none"
              :aria-label="`Decrease quantity of ${item.product.title}`"
            >
              −
            </button>
            <span class="w-6 text-center font-medium" :aria-label="`Quantity: ${item.quantity}`">
              {{ item.quantity }}
            </span>
            <button
              @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
              class="h-8 w-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-bold leading-none"
              :aria-label="`Increase quantity of ${item.product.title}`"
            >
              +
            </button>
          </div>

          <!-- Line total -->
          <p class="w-20 text-right font-semibold flex-shrink-0">
            ${{ (item.product.price * item.quantity).toFixed(2) }}
          </p>

          <!-- Remove -->
          <button
            @click="cartStore.removeItem(item.product.id)"
            class="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
            :aria-label="`Remove ${item.product.title}`"
          >
            ✕
          </button>
        </article>
      </div>

      <!-- Summary -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600">
            {{ cartStore.totalItems }} item{{ cartStore.totalItems !== 1 ? "s" : "" }}
          </span>
          <span class="text-2xl font-bold">
            ${{ cartStore.totalPrice.toFixed(2) }}
          </span>
        </div>

        <div class="flex gap-3">
          <button
            @click="cartStore.clearCart()"
            class="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition-colors"
          >
            Clear Cart
          </button>
          <button
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            aria-label="Proceed to checkout (coming soon)"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from "../store/cartStore";

const cartStore = useCartStore();
</script>
