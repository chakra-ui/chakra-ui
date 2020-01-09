import { configure } from "@storybook/react";

// ../packages/hooks/src/useMenu-v2
// ../packages/system
// ../packages/hooks/src/useCheckbox

const req = require.context(
  "../packages/core/src/",
  true,
  /.stories\.(ts|tsx)$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
