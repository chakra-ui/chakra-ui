import { storiesOf } from "@storybook/react";
import Keyboard from ".";
import React from "react";
import Box from "../Box";

const stories = storiesOf("Keyboard", module);

stories.add("Default", () => (
  <Box maxWidth="sm" mx="auto" mt={3}>
    <kbd>
      <Keyboard>ctrl</Keyboard>+<Keyboard>D</Keyboard>
    </kbd>
  </Box>
));
