import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { useNumberInput } from ".";
import setup from "../story.setup";

const stories = storiesOf("useNumberInput", module).addDecorator(setup);

function NumberInput() {
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

stories.add("default", () => <NumberInput />);
