import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import Input from "./Input";
import { chakra } from "@chakra-ui/system";
import { InputLeftAddon, InputRightAddon } from "./Input.addon";
import InputGroup from "./Input.group";
import { InputLeftElement } from "./Input.element";

const stories = storiesOf("Input", module);

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

stories.add("disabled", () => (
  <Input isDisabled placeholder="This input is disabled" />
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

stories.add("Input addon - left", () => (
  <chakra.div display="flex" position="relative">
    <InputLeftAddon children="https://" />
    <Input roundedLeft="0" placeholder="Text goes here" />
  </chakra.div>
));

stories.add("Input addon - right", () => (
  <InputGroup variantSize="lg">
    <InputLeftAddon children="https://" />
    <Input rounded="0" placeholder="Text goes here" />
    <InputRightAddon children=".com" />
  </InputGroup>
));

stories.add("Input element - left", () => (
  <InputGroup variantSize="sm">
    <InputLeftElement children="P:" />
    <Input placeholder="Text goes here" />
  </InputGroup>
));
