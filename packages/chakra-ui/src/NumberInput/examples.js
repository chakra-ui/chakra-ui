/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import {
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberInputStepper,
  NumberIncrementStepper,
} from ".";
import { useState } from "react";

const stories = storiesOf("NumberInput", module);

const ContolledEx = () => {
  const [val, setVal] = useState(23);
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
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

stories.add("version2", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <NumberInput
      size="md"
      max={35}
      min={0}
      step={4}
      defaultValue={23}
      // keepWithinRange={false}
      // clampValueOnBlur={false}
      precision={2}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </Box>
));

stories.add("v2 controlled", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <ContolledEx />
  </Box>
));
