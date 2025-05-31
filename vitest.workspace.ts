import { defineWorkspace } from "vitest/config";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineWorkspace([
  "vite.config.ts",
  {
    extends: "vite.config.ts",
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
        screenshotFailures: false,
      },
      setupFiles: ["demo/.storybook/vitest.setup.ts"],
    },
  },
]);
