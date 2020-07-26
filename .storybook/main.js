module.exports = {
  stories: ["../packages/menu/stories/*.stories.tsx"],
  addons: [
    "storybook-addon-performance/register",
    "@storybook/addon-a11y/register",
  ],
  typescript: {
    reactDocgen: false,
  },
}
