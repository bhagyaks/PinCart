import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ProductCard from "./ProductCard.vue";

const product = {
  id: 1,
  title: "Test Product",
  price: 19.99,
  image: "https://via.placeholder.com/150",
  rating: { rate: 4.5, count: 10 },
};

describe("ProductCard.vue", () => {
  it("renders product information", () => {
    const wrapper = mount(ProductCard, {
      props: { product },
    });

    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.text()).toContain("19.99");
    expect(wrapper.find("img").attributes("src")).toBe(product.image);
  });

  it("has add to cart button", () => {
    const wrapper = mount(ProductCard, { props: { product } });
    const button = wrapper.find('button[aria-label="Add to cart"]');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("🛒"); // emoji matches template
  });

  it("emits 'open-details' on Quick View button click", async () => {
    const wrapper = mount(ProductCard, { props: { product } });
    const quickViewBtn = wrapper.find('button[aria-label="Quick view"]');
    await quickViewBtn.trigger("click");
    expect(wrapper.emitted("open-details")).toBeTruthy();
    expect(wrapper.emitted("open-details")?.[0]).toEqual([product]);
  });
});
