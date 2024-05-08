import { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../packages/react/__stories__/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: { builder: {} },
  },
  core: {
    disableTelemetry: true,
    disableProjectJson: true,
  },
  typescript: {
    reactDocgen: false,
  },
}

export default config
