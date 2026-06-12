import { computed } from "vue";
import type { Ref } from "vue";
import type { Product } from "../product";

export function useProductSearch(
  products: Ref<Product[]>,
  query: Ref<string>,
) {
  const filteredProducts = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return products.value;
    return products.value.filter((p) => p.title.toLowerCase().includes(q));
  });

  return { filteredProducts };
}
