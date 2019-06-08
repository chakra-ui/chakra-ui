import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React, { useRef } from "react";
import { Component } from "../src/Component";
// import CharacterCounter from "../src/CharacterCounter";
// import { FormControl } from "../src/FormControl";
// import GoogleAddress from "../src/GoogleAddress";
import Input from "../src/Input";
import SliderInput from "../src/SliderInput";
import NumberInput from "../src/NumberInput";
// import InputAddon from "../src/InputAddon";
import { Box } from "../src/Layout";
// import Select from "../src/Select";
import Slider from "../src/Slider";
// import { SliderInput, NumberInput } from "../src/Input";
import Text from "../src/Text";
// import Textarea, { ExpandingTextarea } from "../src/Textarea";

const stories = storiesOf("Input Fields", module);
stories.addDecorator(withKnobs);

stories.add("Input", () => (
  <Box maxWidth="md" mx="auto" mt={6}>
    <Box p="24px" maxWidth="md" mx="auto" mt={6}>
      <Text textTransform="uppercase" fontSize="sm" fontWeight="medium" mb={2}>
        Light Mode
      </Text>
      <Input
        placeholder={text("placeholder", "Here is a sample placeholder")}
        variant={select("variant", ["", "flushed", "unstyled"], "")}
        size={select("size", ["sm", "md", "lg"], "md")}
        isReadOnly={boolean("isReadOnly", false)}
        isInvalid={boolean("isInvalid", false)}
        isDisabled={boolean("isDisabled", false)}
      />
      <Input
        mt={4}
        as="button"
        children={text("placeholder", "Here is a sample placeholder")}
      />
    </Box>

    <Box p="24px" bg="gray.800" maxWidth="md" mx="auto" mt={6}>
      <Text
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="medium"
        color="alpha.600"
        mb={2}
      >
        Dark Mode
      </Text>
      <Input
        mode="dark"
        placeholder={text("Placeholder", "Here is a sample placeholder")}
        variant={select("Variant", ["", "flushed", "unstyled"], "")}
        size={select("Size", ["sm", "md", "lg"], "md")}
        isReadOnly={boolean("isReadOnly", false)}
        isInvalid={boolean("isInvalid", false)}
        isDisabled={boolean("isDisabled", false)}
      />
    </Box>
  </Box>
));

// stories.add("Label + Input", () => (
//   <Box className="testing" maxWidth="md" mx="auto" mt={6}>
//     <FormControl
//       label={text("Label", "How much you wan buy am?")}
//       help={text("Help", "Ensure its in USD")}
//       htmlFor="boo"
//       isRequired={boolean("isRequired", false)}
//       isSelected={boolean("isSelected", false)}
//       isInvalid={boolean("isInvalid", false)}
//       validationMessage={text(
//         "validationMessage",
//         "You gotta enter something!"
//       )}
//     >
//       <InputAddon text="$" position="left">
//         <Input placeholder={text("Placeholder", "Enter completion")} />
//       </InputAddon>
//     </FormControl>
//   </Box>
// ));

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

// stories.add("Textarea", () => (
//   <Box className="testing" maxWidth="md" mx="auto" mt={6}>
//     <Box p="24px" maxWidth="md" mx="auto" mt={6}>
//       <Text textTransform="uppercase" fontSize="sm" fontWeight="medium" mb={2}>
//         Light Mode
//       </Text>
//       <Textarea
//         placeholder={text("Placeholder", "Here is a sample placeholder")}
//         variant={select("Variant", ["", "flushed", "unstyled"], "")}
//         size={select("Size", ["sm", "md", "lg"], "md")}
//         isReadOnly={boolean("isReadOnly", false)}
//         isInvalid={boolean("isInvalid", false)}
//         isDisabled={boolean("isDisabled", false)}
//       />
//     </Box>

//     <Box p="24px" bg="gray.800" maxWidth="md" mx="auto" mt={6}>
//       <Text
//         textTransform="uppercase"
//         fontSize="sm"
//         fontWeight="medium"
//         color="alpha.600"
//         mb={2}
//       >
//         Dark Mode
//       </Text>
//       <Textarea
//         mode="dark"
//         placeholder={text("Placeholder", "Here is a sample placeholder")}
//         variant={select("Variant", ["flushed", "unstyled"], "")}
//         size={select("Size", ["sm", "md", "lg"], "md")}
//         isReadOnly={boolean("isReadOnly", false)}
//         isInvalid={boolean("isInvalid", false)}
//         isDisabled={boolean("isDisabled", false)}
//       />
//     </Box>
//   </Box>
// ));

// stories.add("Character Counter", () => (
//   <Box className="testing" maxWidth="md" mx="auto" mt={6}>
//     <CharacterCounter
//       countDown
//       defaultValue="This counts down from 50"
//       max={50}
//     />
//   </Box>
// ));

// stories.add("Expanding Textarea", () => (
//   <Box className="testing" maxWidth="md" mx="auto" mt={6}>
//     <ExpandingTextarea placeholder="It will measure the placeholder as well" />
//   </Box>
// ));

// stories.add("Select", () => (
//   <Box>
//     <Box className="testing" p="24px" maxWidth="md" mx="auto" mt={6}>
//       <Select
//         placeholder={text("Placeholder", "Select")}
//         variant={select("Variant", ["", "flushed", "unstyled"], "")}
//         size={select("Size", ["sm", "md", "lg"], "md")}
//         isReadOnly={boolean("isReadOnly", false)}
//         isInvalid={boolean("isInvalid", false)}
//         isDisabled={boolean("isDisabled", false)}
//       >
//         <option value="opt1">Option 1</option>
//         <option value="opt2">Option 2</option>
//         <option value="opt3">Option 3</option>
//       </Select>
//     </Box>

//     <Box
//       p="24px"
//       className="testing"
//       bg="gray.800"
//       maxWidth="md"
//       mx="auto"
//       mt={6}
//     >
//       <Select
//         mode="dark"
//         placeholder={text("Placeholder", "Select")}
//         variant={select("Variant", ["", "flushed", "unstyled"], "")}
//         size={select("Size", ["sm", "md", "lg"], "md")}
//         isReadOnly={boolean("isReadOnly", false)}
//         isInvalid={boolean("isInvalid", false)}
//         isDisabled={boolean("isDisabled", false)}
//       >
//         <option value="opt1">Option 1</option>
//         <option value="opt2">Option 2</option>
//         <option value="opt3">Option 3</option>
//       </Select>
//     </Box>
//   </Box>
// ));

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
