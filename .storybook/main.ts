import type { StorybookConfig } from "@storybook/react-vite"
import path from "node:path"

const config: StorybookConfig = {
  stories: [
    // "../packages/react/__stories__/*.stories.tsx",
    "../packages/react-next/__stories__/*.stories.tsx",
  ],
  addons: ["@storybook/addon-a11y", "@storybook/addon-themes"],
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
  viteFinal(config) {
    config.resolve ??= {}
    config.resolve.conditions ??= []
    config.resolve.conditions.push("dev")
    config.resolve.alias ??= {}
    Object.assign(config.resolve.alias, {
      "compositions-next": path.resolve(
        __dirname,
        "../apps/compositions-next/src",
      ),
    })
    return config
  },
}

export default config
