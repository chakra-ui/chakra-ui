module.exports = {
  "stories": [
    "../../../packages/**/stories/**/*.stories.mdx",
    "../../../packages/**/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "../../../tooling/storybook-addon/"
  ]
}