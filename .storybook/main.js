module.exports = {
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: ["storybook-addon-performance/register"],
  typescript: {
    reactDocgen: false,
  },
}
