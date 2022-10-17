const fs = require("fs")

// [Workaround] This logic means `"../packages/components/*/stories/*.stories.tsx"` but it's much faster.
function getStories(pkg) {
  const scope = pkg ? [pkg] : fs.readdirSync("packages/components")
  return scope
    .map((package) => `packages/components/${package}/stories`)
    .filter((storyDir) => fs.existsSync(storyDir))
    .map((storyDir) => `../${storyDir}/*.stories.tsx`)
}

module.exports = {
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  stories: getStories(),
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@chakra-ui/storybook-addon",
  ],
  typescript: {
    reactDocgen: false,
  },
}
