import { mount } from "@vue/test-utils";
import HomeView from "../views/HomeView.vue";
import { describe, beforeEach, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useProductStore } from "../stores/productStore";
import ProductCard from "../components/ProductCard.vue";
import Loader from "../components/Loader.vue";

describe("HomeView.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("shows loading component when loading products", async () => {
    const productStore = useProductStore();
    productStore.loading = true;
    const wrapper = mount(HomeView, {
      props: { search: "" },
      global: { components: { Loader, ProductCard } },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: "Loader" }).exists()).toBe(true);
  });
  it("renders ProductCards after products are loaded", async () => {
    const store = useProductStore();
    store.products = [
      {
        id: 1,
        title: "Apple",
        price: 1,
        image: "",
        rating: { rate: 5, count: 1 },
      },
      {
        id: 2,
        title: "Banana",
        price: 2,
        image: "",
        rating: { rate: 4, count: 2 },
      },
    ];
    store.loading = false;

    const wrapper = mount(HomeView, {
      props: { search: "" },
      global: { components: { Loader, ProductCard } },
    });

    const cards = wrapper.findAllComponents(ProductCard);
    expect(cards.length).toBe(2);
    expect(wrapper.text()).toContain("Apple");
    expect(wrapper.text()).toContain("Banana");
  });
  it("filters products based on search", async () => {
    const store = useProductStore();
    store.products = [
      {
        id: 1,
        title: "Apple",
        price: 1,
        image: "",
        rating: { rate: 5, count: 1 },
      },
      {
        id: 2,
        title: "Banana",
        price: 2,
        image: "",
        rating: { rate: 4, count: 2 },
      },
    ];
    store.loading = false;

    const wrapper = mount(HomeView, {
      props: { search: "Apple" },
      global: { components: { Loader, ProductCard } },
    });

    const cards = wrapper.findAllComponents(ProductCard);
    expect(cards.length).toBe(1);
    expect(wrapper.text()).toContain("Apple");
    expect(wrapper.text()).not.toContain("Banana");
  });
});
