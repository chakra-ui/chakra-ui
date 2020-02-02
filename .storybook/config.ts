import { configure } from "@storybook/react";

const req = require.context(
  `../packages/layout/src/`,
  true,
  /.stories\.(ts|tsx)$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
