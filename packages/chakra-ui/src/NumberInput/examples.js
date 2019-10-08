/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import NumberInput from ".";
import Box from "../Box";
import {
  NumberInput as NumberInputV2,
  NumberInputField,
  NumberDecrementStepper,
  NumberInputStepper,
  NumberIncrementStepper,
} from "./v2";
import { useState } from "react";

const stories = storiesOf("NumberInput", module);

stories.add("Default", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <NumberInput size="sm" defaultValue={30} min={0} step={0.1} max={35} />
    <NumberInput size="md" defaultValue={30} min={0} max={35} />
    <NumberInput size="lg" defaultValue={30} min={0} max={35} />
  </Box>
));

const ContolledEx = () => {
  const [val, setVal] = useState(23);
  return (
    <NumberInputV2
      size="md"
      max={35}
      min={0}
      step={4}
      value={val}
      keepWithinRange={false}
      clampValueOnBlur={false}
      precision={2}
      onChange={setVal}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInputV2>
  );
};

stories.add("version2", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <NumberInputV2
      size="md"
      max={35}
      min={0}
      step={4}
      defaultValue={23}
      keepWithinRange={false}
      clampValueOnBlur={false}
      precision={2}
      onChange={val => console.log(val)}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInputV2>
  </Box>
));

stories.add("v2 controlled", () => (
  <Box maxWidth="sm" mx="auto" mt={5}>
    <ContolledEx />
  </Box>
));
