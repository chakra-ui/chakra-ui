import React from "react";
import { storiesOf } from "@storybook/react";
import Stack from ".";

const stories = storiesOf("Stack", module);

stories.add("vertical stack", () => (
  <Stack spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
));

stories.add("Inline Stack", () => (
  <Stack isInline spacing={5}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
));
