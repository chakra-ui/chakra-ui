import path from "node:path"
import { mergeConfig } from "vite"

export default {
  framework: "@storybook/react-vite",
  features: {
    buildStoriesJson: true,
  },
  core: {
    disableTelemetry: true,
  },
  stories: ["../packages/components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@chakra-ui/storybook-addon",
  ],
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: /\@chakra-ui\/react$/,
            replacement: path.resolve(__dirname, "../packages/components/src"),
          },
          {
            find: /\@chakra-ui\/theme$/,
            replacement: path.resolve(__dirname, "../packages/theme/src"),
          },
        ],
      },
    })
  },
  typescript: {
    reactDocgen: false,
  },
}
