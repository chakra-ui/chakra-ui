/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from ".";
import { useState } from "react";

const stories = storiesOf("NumberInput", module);

const ContolledEx = () => {
  const [val, setVal] = useState(null);
  return (
    <NumberInput
      size="md"
      max={35}
      min={0}
      step={4}
      value={val}
      precision={2}
      onChange={setVal}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper children="+" />
        <NumberDecrementStepper children="-" />
      </NumberInputStepper>
    </NumberInput>
  );
};

stories.add("version2", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <NumberInput
      size="sm"
      max={35}
      min={0}
      step={4}
      onChange={console.log}
      // defaultValue={null}
      // keepWithinRange={false}
      // clampValueOnBlur={false}
      precision={2}
    />
  </Box>
));

stories.add("v2 controlled", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <ContolledEx />
  </Box>
));

stories.add("allow out of range", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <NumberInput
      defaultValue={15}
      max={10}
      clampValueOnBlur={false}
      keepWithinRange={false}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </Box>
));
