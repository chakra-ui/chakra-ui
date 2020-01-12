import { configure } from "@storybook/react";

const req = require.context(
  `../packages/Tooltip/src/`,
  true,
  /.stories\.(ts|tsx)$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
