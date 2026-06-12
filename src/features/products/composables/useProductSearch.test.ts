import { describe, it, expect } from "vitest";
import { ref } from "vue";
import { useProductSearch } from "./useProductSearch";
import type { Product } from "../product";

const makeProduct = (id: number, title: string): Product => ({
  id,
  title,
  price: 10,
  image: "",
});

describe("useProductSearch", () => {
  const products = ref<Product[]>([
    makeProduct(1, "Wireless Keyboard"),
    makeProduct(2, "Gaming Mouse"),
    makeProduct(3, "USB Keyboard Hub"),
  ]);

  it("returns all products when query is empty", () => {
    const { filteredProducts } = useProductSearch(products, ref(""));
    expect(filteredProducts.value).toHaveLength(3);
  });

  it("filters by title case-insensitively", () => {
    const { filteredProducts } = useProductSearch(products, ref("keyboard"));
    expect(filteredProducts.value).toHaveLength(2);
    expect(filteredProducts.value.map((p) => p.id)).toEqual([1, 3]);
  });

  it("returns empty array when nothing matches", () => {
    const { filteredProducts } = useProductSearch(products, ref("zzznotfound"));
    expect(filteredProducts.value).toHaveLength(0);
  });

  it("trims the query before filtering", () => {
    const { filteredProducts } = useProductSearch(products, ref("  mouse  "));
    expect(filteredProducts.value).toHaveLength(1);
    expect(filteredProducts.value[0].id).toBe(2);
  });

  it("reacts to query changes", () => {
    const query = ref("mouse");
    const { filteredProducts } = useProductSearch(products, query);
    expect(filteredProducts.value).toHaveLength(1);

    query.value = "";
    expect(filteredProducts.value).toHaveLength(3);
  });
});
