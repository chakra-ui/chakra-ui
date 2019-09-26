import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import React from "react";
import Box from "../Box";
import Input from "../Input";

const colors = [
  "blue.500",
  "red.200",
  "orange.300",
  "teal.600",
  "tomato",
  "#fd5",
];

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
    focusBorderColor="cyan.500"
    isReadOnly
  />
));

const variantStories = storiesOf("Input/Variants");
variantStories.addDecorator(withKnobs);

variantStories.add("Filled", () => (
  <Input variant="filled" placeholder="Text goes here"></Input>
));

variantStories.add("Filled, custom border colors", () => {
  const errorColorKnob = select("errorBorderColor", colors, "red.200");
  const focusColorKnob = select("focusBorderColor", colors, "blue.500");

  const invalidKnob = boolean("isInvalid", false);

  return (
    <Input
      variant="filled"
      isInvalid={invalidKnob}
      errorBorderColor={errorColorKnob}
      focusBorderColor={focusColorKnob}
      placeholder="Text goes here"
    ></Input>
  );
});

variantStories.add("Flushed", () => (
  <Input variant="flushed" placeholder="Text goes here"></Input>
));

variantStories.add("Flushed, custom border colors", () => {
  const errorColorKnob = select("errorBorderColor", colors, "red.200");
  const focusColorKnob = select("focusBorderColor", colors, "blue.500");

  const invalidKnob = boolean("isInvalid", false);
  return (
    <Input
      variant="flushed"
      isInvalid={invalidKnob}
      errorBorderColor={errorColorKnob}
      focusBorderColor={focusColorKnob}
      placeholder="Text goes here"
    ></Input>
  );
});

variantStories.add("Outline", () => (
  <Input variant="outline" placeholder="Text goes here"></Input>
));

variantStories.add("Outline, custom border colors", () => {
  const errorColorKnob = select("errorBorderColor", colors, "red.200");
  const focusColorKnob = select("focusBorderColor", colors, "blue.500");

  const invalidKnob = boolean("isInvalid", false);
  return (
    <Input
      variant="outline"
      isInvalid={invalidKnob}
      errorBorderColor={errorColorKnob}
      focusBorderColor={focusColorKnob}
      placeholder="Text goes here"
    ></Input>
  );
});

variantStories.add("Unstyled", () => (
  <Input variant="unstyled" placeholder="Text goes here"></Input>
));
