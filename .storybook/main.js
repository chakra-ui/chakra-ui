const path = require("path")
const fs = require("fs")

// [Workaround] This logic means `"../packages/*/stories/*.stories.tsx"` but it's much faster.
const stories = fs
  .readdirSync("packages")
  .map((package) => `packages/${package}/stories`)
  .filter((storyDir) => fs.existsSync(storyDir))
  .map((storyDir) => `../${storyDir}/*.stories.tsx`)

module.exports = {
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  stories,
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@chakra-ui/storybook-addon",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@chakra-ui/react": path.resolve(__dirname, "../packages/react/src"),
      "@chakra-ui/theme": path.resolve(__dirname, "../packages/theme/src"),
    }
    config.resolve.extensions.push(".ts", ".tsx")
    return config
  },
  typescript: {
    reactDocgen: false,
  },
}
