import { chakra } from "@chakra-ui/system";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { useNumberInput } from ".";
import {
  NumberInput,
  BaseNumberInput,
  BaseNumberInputField,
  BaseDecrementStepper,
  BaseIncrementStepper,
  BaseStepperGroup,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "./NumberInput";

const stories = storiesOf("useNumberInput", module);

stories.addDecorator(story => (
  <chakra.div maxW="400px" mt="40px" mx="auto">
    {story()}
  </chakra.div>
));

function NumberInputHook() {
  const { input, upSpinner, downSpinner, valueAsNumber } = useNumberInput({
    step: 0.01,
    defaultValue: 1.53,
    min: -4,
    max: 6,
    precision: 4,
    onChange: action("onChange"),
  });
  return (
    <div>
      <div>current: {valueAsNumber}</div>
      <button tabIndex={-1} {...upSpinner}>
        +
      </button>
      <input {...input} />
      <button tabIndex={-1} {...downSpinner}>
        -
      </button>
    </div>
  );
}

stories.add("hook only", () => <NumberInputHook />);

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: "relative",
  },
  field: {
    backgroundColor: "black",
    color: "white",
    width: "100%",
    padding: 10,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    right: 0,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
  },
};

stories.add("base", () => (
  <BaseNumberInput style={styles.root}>
    <BaseNumberInputField style={styles.field} />
    <BaseStepperGroup style={styles.group}>
      <BaseIncrementStepper children="+" style={styles.button} />
      <BaseDecrementStepper children="-" style={styles.button} />
    </BaseStepperGroup>
  </BaseNumberInput>
));

stories.add("chakra", () => (
  <NumberInput>
    <NumberInputField focusBorderColor="tomato" />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
));
