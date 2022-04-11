module.exports = {
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-toolbars",
    "@storybook/addon-storysource",
    "storybook-addon-performance/register",
  ],
  features: {
    emotionAlias: false,
  },
  typescript: {
    reactDocgen: false,
  },
}
