import { defineStore } from "pinia";
import { fetchProducts } from "../api/product.api";
import { Product } from "../product";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loadProducts() {
      this.loading = true;
      try {
        this.products = await fetchProducts();
      } catch (err) {
        this.error = err instanceof Error ? err.message : String(err);
      } finally {
        this.loading = false;
      }
    },
    getProductById(id: number): Product | undefined {
      return this.products.find((product: Product) => product.id === id);
    },
  },
});
