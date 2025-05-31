import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      name: "chromium",
      provider: "playwright",
      // Playwright will be installed automatically
      headless: true,
      screenshotFailures: false,
    },
    // Test files
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // Global setup
    globals: true,
    // Environment setup for React
    setupFiles: ["./src/test-setup.ts"],
  },
  esbuild: {
    target: "es2022",
  },
});
