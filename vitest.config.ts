/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // allows using `describe`, `it`, `expect` without imports
    environment: "jsdom", // <--- makes `document` and `window` available
    setupFiles: "./vitest.setup.ts", // optional: for global setups like Pinia
  },
});
