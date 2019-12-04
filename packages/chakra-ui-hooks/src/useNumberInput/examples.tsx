import React from "react";
import { storiesOf } from "@storybook/react";
import { useNumberInput } from ".";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("useNumberInput", module).addDecorator(story => (
  <ThemeProvider>
    {/* <CSSReset /> */}
    {story()}
  </ThemeProvider>
));

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
      <input {...(input as any)} />
      <button tabIndex={-1} {...downSpinner}>
        -
      </button>
    </div>
  );
}

stories.add("default", () => <NumberInput />);
