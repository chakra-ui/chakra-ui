import { configure } from "@storybook/react";

const req = require.context(
  `../packages/Checkbox/src/`,
  true,
  /.stories\.(ts|tsx)$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
