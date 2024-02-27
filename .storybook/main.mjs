export default {
  framework: "@storybook/react-vite",
  features: {
    buildStoriesJson: true,
  },
  core: {
    disableTelemetry: true,
  },
  stories: [
    "../packages/*/src/styled-system-new/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    // "@chakra-ui/storybook-addon",
  ],
  typescript: {
    reactDocgen: false,
  },
}
