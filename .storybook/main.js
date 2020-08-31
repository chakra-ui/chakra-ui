module.exports = {
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: ["storybook-addon-performance/register", "@storybook/addon-a11y"],
  typescript: {
    reactDocgen: false,
  },
}
