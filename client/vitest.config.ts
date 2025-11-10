import { defineConfig } from "vitest/config";
import { mergeConfig } from "vite";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      include: ["src/**/*.test.{ts,tsx}"],
      setupFiles: ["./src/__tests__/setup.ts"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
      },
    },
  })
);
