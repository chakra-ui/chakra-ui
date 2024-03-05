import { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: [
    "../packages/react/__stories__/{alert,avatar,badge,spinner,button,blockquote}.stories.tsx",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    buildStoriesJson: true,
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: false,
  },
}

export default config
