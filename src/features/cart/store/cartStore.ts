import { defineStore } from "pinia";
import type { Product } from "../../products/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalItems: (state): number =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state): number =>
      state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    isEmpty: (state): boolean => state.items.length === 0,
  },
  actions: {
    addItem(product: Product) {
      const existing = this.items.find((item) => item.product.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.product.id !== productId);
    },
    updateQuantity(productId: number, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(productId);
        return;
      }
      const item = this.items.find((item) => item.product.id === productId);
      if (item) item.quantity = quantity;
    },
    clearCart() {
      this.items = [];
    },
  },
});
