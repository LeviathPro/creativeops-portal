import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  }
});
