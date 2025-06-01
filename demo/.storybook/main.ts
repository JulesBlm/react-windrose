import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  managerHead: (head, { configType }) => {
    if (configType === 'PRODUCTION') {
      return (`
        <base href="/react-windrose/">
        ${head}
      `);
    }
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      base: "/react-windrose/",
    });
  },
};
export default config;
