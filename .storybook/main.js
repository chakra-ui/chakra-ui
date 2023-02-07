const path = require("path")
const fs = require("fs")

// [Workaround] This logic means `"../packages/components/*/stories/*.stories.tsx"` but it's much faster.
function getStories({ pkg, dir = "components" }) {
  const dirName = `packages/${dir}`
  const scope = pkg ? [pkg] : fs.readdirSync(dirName)
  return scope
    .map((package) => `${dirName}/${package}/stories`)
    .filter((storyDir) => fs.existsSync(storyDir))
    .map((storyDir) => `../${storyDir}/*.stories.tsx`)
}

module.exports = {
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  stories: [
    ...getStories({ dir: "core" }),
    ...getStories({ dir: "components" }),
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@chakra-ui/storybook-addon",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@chakra-ui/react": path.resolve(
        __dirname,
        "../packages/components/react/src",
      ),
      "@chakra-ui/theme": path.resolve(
        __dirname,
        "../packages/components/theme/src",
      ),
    }
    config.resolve.extensions.push(".ts", ".tsx")
    return config
  },
  typescript: {
    reactDocgen: false,
  },
}
