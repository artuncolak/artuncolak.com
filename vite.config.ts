// vite.config.ts
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart({
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        concurrency: 14,
        crawlLinks: true,
        retryCount: 2,
        retryDelay: 1000,
        onSuccess: ({ page }) => {
          console.log(`Rendered ${page.path}!`)
        },
      },
    }),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
});
