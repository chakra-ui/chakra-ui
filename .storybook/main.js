module.exports = {
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: ["storybook-addon-performance/register", "@storybook/addon-a11y"],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: withoutEmotion(config.resolve.alias),
      },
    }
  },
}

function withoutEmotion(packages) {
  let result = {}
  for (key in packages) {
    if (!/emotion/.test(key)) {
      result[key] = packages[key]
    }
  }
  return result
}
