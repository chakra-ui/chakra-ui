import { configure } from "@storybook/react";

const req = require.context("../packages", true, /examples\.(ts|tsx)$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
