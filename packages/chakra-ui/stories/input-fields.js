import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React, { useRef } from "react";
import CharacterCounter from "../src/CharacterCounter";
import { Component } from "../src/Component";
import FormControl from "../src/FormControl";
// import GoogleAddress from "../src/GoogleAddress";
import Input from "../src/Input";
import { Box } from "../src/Layout";
import NumberInput from "../src/NumberInput";
import Select from "../src/Select";
import Slider from "../src/Slider";
import SliderInput from "../src/SliderInput";
import Textarea, { ExpandingTextarea } from "../src/Textarea";
import InputAddon from "../src/InputAddon";
import InputGroup from "../src/InputGroup";
import Button from "../src/Button";

const stories = storiesOf("Input Fields", module);
stories.addDecorator(withKnobs);

stories.add("Input", () => (
  <Box maxWidth="md" mx="auto" mt={6}>
    <Box p="24px" maxWidth="md" mx="auto" mt={6}>
      <FormControl
        // label="What's your first name"
        id="firstname"
        isInvalid={boolean("isInvalid", true)}
        validationText="Enter a valid message"
      >
        <Input
          placeholder={text("placeholder", "Here is a sample placeholder")}
          variant={select("variant", ["", "flushed", "unstyled"], "")}
          size={select("size", ["sm", "md", "lg"], "md")}
          isReadOnly={boolean("isReadOnly", false)}
          isDisabled={boolean("isDisabled", false)}
        />
      </FormControl>
    </Box>

    <Box p="24px" bg="gray.800" maxWidth="md" mx="auto" mt={6}>
      <FormControl mode="dark" label="What's your first name" id="firstname">
        <Input
          placeholder={text("Placeholder", "Here is a sample placeholder")}
          variant={select("Variant", ["", "flushed", "unstyled"], "")}
          size={select("Size", ["sm", "md", "lg"], "md")}
          isReadOnly={boolean("isReadOnly", false)}
          isInvalid={boolean("isInvalid", false)}
          isDisabled={boolean("isDisabled", false)}
        />
      </FormControl>
    </Box>
  </Box>
));

stories.add("Label + Input", () => (
  <Box p={3} maxWidth="md" mx="auto" mt={6}>
    <FormControl
      label={text("Label", "How much you wan buy am?")}
      helpText={text("Help", "Ensure its in USD")}
      id="boo"
      isRequired={boolean("isRequired", false)}
      isSelected={boolean("isSelected", false)}
      isInvalid={boolean("isInvalid", true)}
      validationText={text("validationText", "You gotta enter something!")}
      // mode="dark"
    >
      <InputAddon text="$" position="right">
        <Input placeholder={text("Placeholder", "Enter completion")} />
      </InputAddon>
    </FormControl>
  </Box>
));

stories.add("Input Group", () => (
  <Box mx="auto" maxWidth="md" mt={3}>
    <InputGroup size="md">
      <Select minWidth="90px">
        <option value="dollars">Dollars</option>
        <option value="naira">Naira</option>
      </Select>
      <Input flex="1" />
      <Button color="cyan">Submit</Button>
    </InputGroup>
  </Box>
));

// stories.add("Address Input", () => (
//   <GoogleAddress value="Araromi Street" onChange={v => console.log(v)}>
//     {({ inputRef, value, onChange }) => (
//       <Input
//         ref={inputRef}
//         defaultValue={value}
//         onChange={onChange}
//         label="Address"
//         id="address"
//         placeholder="Enter Address"
//       />
//     )}
//   </GoogleAddress>
// ));

stories.add("Textarea", () => (
  <Box className="testing" maxWidth="md" mx="auto" mt={6}>
    <Box p="24px" maxWidth="md" mx="auto" mt={6}>
      <Textarea
        placeholder={text("Placeholder", "Here is a sample placeholder")}
        variant={select("Variant", ["", "flushed", "unstyled"], "")}
        size={select("Size", ["sm", "md", "lg"], "md")}
        isReadOnly={boolean("isReadOnly", false)}
        isInvalid={boolean("isInvalid", false)}
        isDisabled={boolean("isDisabled", false)}
      />
    </Box>

    <Box p="24px" bg="gray.800" maxWidth="md" mx="auto" mt={6}>
      <Textarea
        mode="dark"
        placeholder={text("Placeholder", "Here is a sample placeholder")}
        variant={select("Variant", ["flushed", "unstyled"], "")}
        size={select("Size", ["sm", "md", "lg"], "md")}
        isReadOnly={boolean("isReadOnly", false)}
        isInvalid={boolean("isInvalid", false)}
        isDisabled={boolean("isDisabled", false)}
      />
    </Box>
  </Box>
));

stories.add("Character Counter", () => (
  <Box className="testing" maxWidth="md" mx="auto" mt={6}>
    <FormControl label="What's your first name">
      <CharacterCounter maxLength={20} defaultValue="Hello World" />
    </FormControl>
  </Box>
));

stories.add("Expanding Textarea", () => (
  <Box className="testing" maxWidth="md" mx="auto" mt={6}>
    <ExpandingTextarea placeholder="It will measure the placeholder as well" />
  </Box>
));

stories.add("Select", () => (
  <Box>
    <Box className="testing" p="24px" maxWidth="md" mx="auto" mt={6}>
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
    </Box>

    <Box
      p="24px"
      className="testing"
      bg="gray.800"
      maxWidth="md"
      mx="auto"
      mt={6}
    >
      <Select
        mode="dark"
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
    </Box>
  </Box>
));

stories.add("Number Input", () => (
  <Box className="testing" mx="auto" mt={6}>
    <Box p="24px" maxWidth="md" mx="auto" mt={6}>
      <NumberInput
        size={select("Size", ["sm", "md", "lg"], "md")}
        isDisabled={boolean("isDisabled", false)}
        defaultValue={30}
        // value={30}
        // min={20}
        max={35}
        // onChange={value => console.log(value)}
      />
    </Box>

    <Box p="24px" bg="gray.800" maxWidth="md" mx="auto" mt={6}>
      <NumberInput
        mode="dark"
        size={select("Size", ["sm", "md", "lg"], "md")}
        isDisabled={boolean("isDisabled", false)}
        defaultValue={30}
        // value={30}
        // min={20}
        max={35}
        // onChange={value => console.log(value)}
      />
    </Box>
  </Box>
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

const UnControlledSlider = props => {
  const sliderRef = useRef();

  return (
    <Slider
      defaultValue={40}
      ref={sliderRef}
      onChange={() => {
        // eslint-disable-next-line no-console
        console.log(sliderRef.current && sliderRef.current.value);
      }}
      {...props}
    />
  );
};

stories.add("Slider", () => (
  <Box maxWidth="300px" mx="auto" mt={6}>
    <Box p="24px" maxWidth="md" mx="auto" mt={6}>
      <ControlledSlider
        size={select("Size", ["sm", "md", "lg"], "md")}
        isDisabled={boolean("isDisabled", false)}
      />
    </Box>

    <Box p="24px" bg="gray.800" maxWidth="md" mx="auto" mt={6}>
      <UnControlledSlider
        mode="dark"
        size={select("Size", ["sm", "md", "lg"], "md")}
        isDisabled={boolean("isDisabled", false)}
      />
    </Box>
  </Box>
));

stories.add("Slider Input", () => (
  <Box maxWidth="400px" mx="auto" mt={6}>
    <Box p="24px" maxWidth="md" mx="auto" mt={6}>
      <SliderInput
        max={50}
        defaultValue={25}
        min={10}
        size={select("Size", ["sm", "md", "lg"], "md")}
        isDisabled={boolean("isDisabled", false)}
      />
    </Box>

    <Box p="24px" bg="gray.800" maxWidth="md" mx="auto" mt={6}>
      <SliderInput
        mode="dark"
        size={select("Size", ["sm", "md", "lg"], "md")}
        isDisabled={boolean("isDisabled", false)}
        max={50}
        defaultValue={25}
        min={10}
      />
    </Box>
  </Box>
));
