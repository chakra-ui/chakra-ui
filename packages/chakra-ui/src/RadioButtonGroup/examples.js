/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import RadioButtonGroup from ".";

const stories = storiesOf("Radio Button Group", module);

const Radio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, ...rest } = props;
  return (
    <Button
      ref={ref}
      color={isChecked ? "red" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

stories.add("Default", () => {
  return (
    <>
      <RadioButtonGroup>
        <Radio value="rad1">Radio 1</Radio>
        <Radio value="rad2">Radio 2</Radio>
        <Radio value="rad3">Radio 3</Radio>
      </RadioButtonGroup>
    </>
  );
});
