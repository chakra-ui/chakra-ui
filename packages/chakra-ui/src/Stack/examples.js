import React from "react";
import { storiesOf } from "@storybook/react";
import Stack from ".";
import Box from "../Box";

const stories = storiesOf("Stack", module);

stories.add("vertical stack", () => (
  <Stack spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
));

stories.add("Inline Stack", () => (
  <Stack bg="blue.500" w="100%" h="60px" direction="row">
    <Box size="40px" background={"#fff"} rounded="full" />
    <Box size="40px" background={"#fff"} rounded="full" />
    <Box size="40px" background={"#fff"} rounded="full" />
  </Stack>
));
