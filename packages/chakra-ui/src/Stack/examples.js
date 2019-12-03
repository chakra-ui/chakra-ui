import React from "react";
import { storiesOf } from "@storybook/react";
import Stack from ".";
import Box from "../Box";

const stories = storiesOf("Stack", module);

stories.add("vertical stack", () => (
  <Stack spacing={5}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
));

stories.add("shouldWrapChildren", () => (
  <Stack shouldWrapChildren spacing={5}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
));

stories.add("Inline Stack", () => (
  <Stack bg="blue.500" w="100%" p={5} isInline>
    <Box size="40px" bg="white">
      1
    </Box>
    <Box size="40px" bg="white">
      2
    </Box>
    <Box size="40px" bg="white">
      3
    </Box>
  </Stack>
));

stories.add("reverse", () => (
  <Stack bg="blue.500" w="100%" p={5} direction="row-reverse">
    <Box size="40px" bg="white">
      1
    </Box>
    <Box size="40px" bg="white">
      2
    </Box>
    <Box size="40px" bg="white">
      3
    </Box>
  </Stack>
));
