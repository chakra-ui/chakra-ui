/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useRef, useState, cloneElement, Children } from "react";
import NumberInput from "../Input/NumberInput";
import { Box, Flex } from "../Layout";
import { useUIMode } from "../theme";
import Slider from "./Slider";

const SliderInput = ({
  defaultValue,
  isDisabled,
  min,
  max,
  size,
  inputWidth = "72px",
  step,
  onChange,
  value: valueProp,
  children,
  ...rest
}) => {
  const { mode } = useUIMode();
  const [value, setValue] = useState(defaultValue || 0);
  const { current: isControlled } = useRef(valueProp !== undefined);

  const handleChange = value => {
    onChange && onChange(value);
    !isControlled && setValue(value);
  };

  const sharedProps = {
    min,
    max,
    step,
    size,
    isDisabled,
    mode,
    value: isControlled ? valueProp : value,
    onChange: handleChange
  };

  return (
    <Flex alignItems="center" {...rest}>
      {Children.map(children, child => cloneElement(child, sharedProps))}
    </Flex>
  );
};
export default SliderInput;
