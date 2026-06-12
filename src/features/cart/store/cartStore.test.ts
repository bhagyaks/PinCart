import { describe, beforeEach, it, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "./cartStore";
import type { Product } from "../../products/product";

const makeProduct = (id: number, price = 10): Product => ({
  id,
  title: `Product ${id}`,
  price,
  image: "",
  description: "",
  rating: { rate: 4, count: 10 },
});

describe("useCartStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts empty", () => {
    const cart = useCartStore();
    expect(cart.items).toHaveLength(0);
    expect(cart.totalItems).toBe(0);
    expect(cart.totalPrice).toBe(0);
    expect(cart.isEmpty).toBe(true);
  });

  it("adds a new item with quantity 1", () => {
    const cart = useCartStore();
    cart.addItem(makeProduct(1));
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(1);
    expect(cart.totalItems).toBe(1);
  });

  it("increments quantity when the same product is added again", () => {
    const cart = useCartStore();
    cart.addItem(makeProduct(1));
    cart.addItem(makeProduct(1));
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(2);
    expect(cart.totalItems).toBe(2);
  });

  it("calculates totalPrice correctly for multiple products", () => {
    const cart = useCartStore();
    cart.addItem(makeProduct(1, 10));
    cart.addItem(makeProduct(2, 20));
    expect(cart.totalPrice).toBe(30);
  });

  it("removes an item by product id", () => {
    const cart = useCartStore();
    cart.addItem(makeProduct(1));
    cart.addItem(makeProduct(2));
    cart.removeItem(1);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].product.id).toBe(2);
  });

  it("updateQuantity removes the item when quantity reaches 0", () => {
    const cart = useCartStore();
    cart.addItem(makeProduct(1));
    cart.updateQuantity(1, 0);
    expect(cart.items).toHaveLength(0);
    expect(cart.isEmpty).toBe(true);
  });

  it("updateQuantity changes the quantity correctly", () => {
    const cart = useCartStore();
    cart.addItem(makeProduct(1));
    cart.updateQuantity(1, 5);
    expect(cart.items[0].quantity).toBe(5);
    expect(cart.totalItems).toBe(5);
  });

  it("clearCart empties all items", () => {
    const cart = useCartStore();
    cart.addItem(makeProduct(1));
    cart.addItem(makeProduct(2));
    cart.clearCart();
    expect(cart.items).toHaveLength(0);
    expect(cart.isEmpty).toBe(true);
  });
});
