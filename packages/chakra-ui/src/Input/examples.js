import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Input from "../Input";

const stories = storiesOf("Input", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <Input isInvalid placeholder="Here is a sample placeholder" size="sm" />
));

stories.add("Readonly", () => (
  <Input
    placeholder="Here is a sample placeholder"
    variant="outline"
    size="md"
    _focusBorderColor="cyan"
    // variant="filled"
    // isReadOnly
    // value="Testing Readonly"
    // size="md"
  />
));
