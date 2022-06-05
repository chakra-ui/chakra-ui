module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@chakra-ui/storybook-addon",
  ],
  features: {
    emotionAlias: false,
  },
  typescript: {
    reactDocgen: false,
  },
}
