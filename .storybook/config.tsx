import { configure, addDecorator } from "@storybook/react";
import setup from "./story.setup";

const req = require.context(
  `../packages/Switch/src/`,
  true,
  /.stories\.(ts|tsx)$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(setup);

configure(loadStories, module);
