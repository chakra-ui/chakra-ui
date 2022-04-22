module.exports = {
  core: { builder: "webpack5" },
  features: { emotionAlias: false },
  typescript: { reactDocgen: false },
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-toolbars",
    "@storybook/addon-storysource",
    "storybook-addon-performance/register",
    "@chakra-ui/storybook-addon",
  ],
}
