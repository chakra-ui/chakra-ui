import { configure } from "@storybook/react";

const scope = "Accordion";

const req = require.context(
  `../packages/${scope}/src/`,
  true,
  /.stories\.(ts|tsx)$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
