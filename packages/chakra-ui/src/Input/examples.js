import { storiesOf } from "@storybook/react";
import { withKnobs, select } from "@storybook/addon-knobs";
import React from "react";
import Box from "../Box";
import Input from "../Input";

const colors = ["blue.500", "red.200", "orange.300", "teal.600"];

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
    focusBorderColor="cyan"
    isReadOnly
  />
));

const variantStories = storiesOf("Input/Variants");
variantStories.addDecorator(withKnobs);

variantStories.add("Filled", () => (
  <Input variant="filled" placeholder="Text goes here"></Input>
));

variantStories.add("Filled, custom focusBorderColor", () => {
  const colorKnob = select("focusBorderColor", colors, "blue.500");
  return (
    <Input
      variant="filled"
      focusBorderColor={colorKnob}
      placeholder="Text goes here"
    ></Input>
  );
});

variantStories.add("Flushed", () => (
  <Input variant="flushed" placeholder="Text goes here"></Input>
));

variantStories.add("Flushed, custom focusBorderColor", () => {
  const colorKnob = select("focusBorderColor", colors, "blue.500");
  return (
    <Input
      variant="flushed"
      focusBorderColor={colorKnob}
      placeholder="Text goes here"
    ></Input>
  );
});

variantStories.add("Outline", () => (
  <Input variant="outline" placeholder="Text goes here"></Input>
));

variantStories.add("Outline, custom focusBorderColor", () => {
  const colorKnob = select("focusBorderColor", colors, "blue.500");
  return (
    <Input
      variant="outline"
      focusBorderColor={colorKnob}
      placeholder="Text goes here"
    ></Input>
  );
});

variantStories.add("Unstyled", () => (
  <Input variant="unstyled" placeholder="Text goes here"></Input>
));
