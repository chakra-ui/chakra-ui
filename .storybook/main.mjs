import path from "node:path"
import fs from "node:fs"
import { mergeConfig } from "vite"

// [Workaround] This logic means `"../packages/components/*/stories/*.stories.tsx"` but it's much faster.
function getStories({ pkg, dir = "components" }) {
  const dirName = `packages/${dir}`
  const scope = pkg ? [pkg] : fs.readdirSync(dirName)
  return scope
    .map((pkg) => `${dirName}/${pkg}/stories`)
    .filter((storyDir) => fs.existsSync(storyDir))
    .map((storyDir) => `../${storyDir}/*.stories.tsx`)
}

export default {
  framework: "@storybook/react-vite",
  features: {
    buildStoriesJson: true,
  },
  core: {
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
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: /\@chakra-ui\/react$/,
            replacement: path.resolve(
              __dirname,
              "../packages/components/react/src",
            ),
          },
          {
            find: /\@chakra-ui\/theme$/,
            replacement: path.resolve(
              __dirname,
              "../packages/components/theme/src",
            ),
          },
        ],
      },
    })
  },
  typescript: {
    reactDocgen: false,
  },
}
