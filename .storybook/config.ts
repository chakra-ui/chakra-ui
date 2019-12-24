import { configure } from "@storybook/react";

// ../packages/chakra-ui-hooks/src/useMenu-v2
// ../packages/chakra-ui-system

const req = require.context(
  "../packages/hooks/src/useAccordion",
  true,
  /examples\.(ts|tsx)$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
