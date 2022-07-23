const path = require("path")

module.exports = {
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@chakra-ui/storybook-addon",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@chakra-ui/react": path.resolve(__dirname, "../packages/react"),
    }
    config.resolve.extensions.push(".ts", ".tsx")
    return config
  },
  typescript: {
    reactDocgen: false,
  },
}
