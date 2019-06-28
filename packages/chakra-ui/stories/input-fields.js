/* eslint-disable no-console */
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../src/Button";
import CharacterCounter from "../src/CharacterCounter";
import { Component } from "../src/Component";
import FormControl, {
  ErrorMessage,
  FormLabel,
  HelperMessage,
  ValidMessage
} from "../src/FormControl";
import Input from "../src/Input";
import InputAddon from "../src/InputAddon";
import InputGroup from "../src/InputGroup";
import { Box } from "../src/Layout";
import NumberInput from "../src/NumberInput";
import Select from "../src/Select";
import Slider from "../src/Slider";
import SliderInput from "../src/SliderInput";
import Textarea, { ExpandingTextarea } from "../src/Textarea";
import { UIModeProvider } from "../src/ThemeProvider";

const stories = storiesOf("Input Fields", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => {
  return (
    <>
      <Box maxWidth="lg" mx="auto" mt={6} p={6}>
        {story()}
      </Box>

      <br />
      <UIModeProvider value="dark">
        <Box bg="gray.800" maxWidth="lg" mx="auto" mt={6} p={6}>
          {story()}
        </Box>
      </UIModeProvider>
    </>
  );
});

stories.add("Input", () => (
  <Input
    placeholder={text("placeholder", "Here is a sample placeholder")}
    variant={select("variant", ["", "flushed", "unstyled"], "")}
    size={select("size", ["sm", "md", "lg"], "md")}
    isReadOnly={boolean("isReadOnly", false)}
    isDisabled={boolean("isDisabled", false)}
  />
));

stories.add("Error Message", () => (
  <FormControl isRequired isInvalid>
    <FormLabel>Enter First Name</FormLabel>
    <Input placeholder="Enter first name" />
    <Select placeholder="Enter first name" mt={2} />
    <ErrorMessage>The email you entered is invalid</ErrorMessage>
    <ValidMessage>Nice! The email you entered is valid</ValidMessage>
    <HelperMessage>Ensure your email contains @ sign</HelperMessage>
  </FormControl>
));

stories.add("Label + Input", () => (
  <FormControl
    id="boo"
    isRequired={boolean("isRequired", false)}
    isInvalid={boolean("isInvalid", false)}
    // validationText={text("validationText", "You gotta enter something!")}
  >
    <FormLabel>{text("Label", "How much you wan buy am?")}</FormLabel>
    <InputAddon text="$" position="left">
      <Input placeholder={text("Placeholder", "Enter completion")} />
    </InputAddon>
    <HelperMessage>{text("Help", "Ensure its in USD")}</HelperMessage>
  </FormControl>
));

stories.add("Input Group", () => (
  <InputGroup size="md">
    <Select minWidth="90px">
      <option value="dollars">Dollars</option>
      <option value="naira">Naira</option>
    </Select>
    <Input flex="1" />
    <Button color="cyan">Submit</Button>
  </InputGroup>
));

stories.add("Textarea", () => (
  <Textarea
    placeholder={text("Placeholder", "Here is a sample placeholder")}
    variant={select("Variant", ["", "flushed", "unstyled"], "")}
    size={select("Size", ["sm", "md", "lg"], "md")}
    isReadOnly={boolean("isReadOnly", false)}
    isInvalid={boolean("isInvalid", false)}
    isDisabled={boolean("isDisabled", false)}
  />
));

stories.add("Character Counter", () => (
  <FormControl label="What's your first name">
    <CharacterCounter maxLength={20} defaultValue="Hello World" />
  </FormControl>
));

stories.add("Expanding Textarea", () => (
  <ExpandingTextarea placeholder="It will measure the placeholder as well" />
));

stories.add("Select", () => (
  <Select
    placeholder={text("Placeholder", "Select")}
    variant={select("Variant", ["", "flushed", "unstyled"], "")}
    size={select("Size", ["sm", "md", "lg"], "md")}
    isReadOnly={boolean("isReadOnly", false)}
    isInvalid={boolean("isInvalid", false)}
    isDisabled={boolean("isDisabled", false)}
  >
    <option value="opt1">Option 1</option>
    <option value="opt2">Option 2</option>
    <option value="opt3">Option 3</option>
  </Select>
));

stories.add("Number Input", () => (
  <NumberInput
    size={select("Size", ["sm", "md", "lg"], "md")}
    isDisabled={boolean("isDisabled", false)}
    defaultValue={30}
    // value={30}
    // min={20}
    max={35}
    // onChange={value => console.log(value)}
  />
));

const ControlledSlider = props => {
  return (
    <Component initialState={{ value: 40 }}>
      {({ state, setState }) => (
        <Slider
          value={state.value}
          onChange={value => setState({ value })}
          {...props}
        />
      )}
    </Component>
  );
};

stories.add("Slider", () => (
  <ControlledSlider
    size={select("Size", ["sm", "md", "lg"], "md")}
    isDisabled={boolean("isDisabled", false)}
  />
));

stories.add("Slider Input", () => (
  <SliderInput
    max={50}
    defaultValue={25}
    min={0}
    size={select("Size", ["sm", "md", "lg"], "md")}
    isDisabled={boolean("isDisabled", false)}
  />
));
