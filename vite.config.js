import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@domains": path.resolve(__dirname, "./src/domains"),
    },
  },
  assetsInclude: ["**/*.svg"],
  plugins: [vue()],
});
