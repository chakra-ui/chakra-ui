import { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: [
    "../packages/react/__stories__/{tokens,alert,textarea,progress,slider,popover,checkbox,radio-group,avatar,input,card,dialog,badge,spinner,button,blockquote,tabs}.stories.tsx",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
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