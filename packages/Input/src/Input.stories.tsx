import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import setup from "../story.setup";
import Input from "./Input";
import { chakra } from "@chakra-ui/system";

const stories = storiesOf("Input", module);
stories.addDecorator(setup);
stories.addDecorator(withKnobs);

stories.addDecorator(story => (
  <chakra.div maxW="560px" mx="auto" mt="40px">
    {story()}
  </chakra.div>
));

const colors = [
  "blue.500",
  "red.200",
  "orange.300",
  "teal.600",
  "tomato",
  "#fd5",
];

stories.add("basic", () => (
  <Input placeholder="Here is a sample placeholder" />
));

stories.add("invalid", () => (
  <Input isInvalid placeholder="This input is invalid" />
));

stories.add("readonly", () => (
  <Input placeholder="Here is a sample placeholder" isReadOnly />
));

stories.add("variant-filled", () => (
  <Input variant="filled" placeholder="Text goes here" />
));

stories.add("variant w/ custom border colors", () => {
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
    />
  );
});

stories.add("Flushed", () => (
  <Input variant="flushed" placeholder="Text goes here" />
));

stories.add("Flushed, custom border colors", () => {
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
    />
  );
});

stories.add("Outline", () => (
  <Input variant="outline" placeholder="Text goes here" />
));

stories.add("Outline, custom border colors", () => {
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
    />
  );
});

stories.add("Unstyled", () => (
  <Input variant="unstyled" placeholder="Text goes here" />
));
