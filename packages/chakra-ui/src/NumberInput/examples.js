/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import NumberInput from ".";
import Box from "../Box";

const stories = storiesOf("NumberInput", module);

stories.add("Default", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <NumberInput size="md" defaultValue={30} min={0} step={4} max={35} />
  </Box>
));
