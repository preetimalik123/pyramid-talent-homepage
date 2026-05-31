import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],

  build: {
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (id.includes("react-dom") || id.includes("react/")) {
            return "react";
          }

          if (id.includes("framer-motion")) {
            return "motion";
          }

          if (
            id.includes("three") ||
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/postprocessing")
          ) {
            return "three";
          }

          if (id.includes("styled-components")) {
            return "styled";
          }

          if (id.includes("lucide-react")) {
            return "icons";
          }

          return "vendor";
        },
      },
    },
  },
});
