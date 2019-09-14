/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import NumberInput from ".";
import Box from "../Box";

const stories = storiesOf("NumberInput", module);

stories.add("Default", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <NumberInput size="sm" defaultValue={30} min={0} step={0.1} max={35} />
    <NumberInput size="md" defaultValue={30} min={0} max={35} />
    <NumberInput size="lg" defaultValue={30} min={0} max={35} />
  </Box>
));

stories.add("bug", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <NumberInput min={0} max={35} />
  </Box>
));
