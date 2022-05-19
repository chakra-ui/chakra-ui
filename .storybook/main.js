module.exports = {
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-toolbars",
    "@storybook/addon-controls",
    "@storybook/addon-storysource",
    "storybook-addon-performance/register",
    "@chakra-ui/storybook-addon",
  ],
  features: {
    emotionAlias: false,
  },
  typescript: {
    reactDocgen: false,
  },
}
