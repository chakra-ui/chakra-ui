/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Flex, Box } from "./Layout";
import NumberInput from "./NumberInput";
import Slider from "./Slider";
import { useState, useRef } from "react";
import { useUIMode } from "./ThemeProvider";

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
  ...rest
}) => {
  const mode = useUIMode();
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
      <Slider {...sharedProps} />
      <Box ml={4} flex="0 0 auto" width={inputWidth}>
        <NumberInput {...sharedProps} />
      </Box>
    </Flex>
  );
};
export default SliderInput;
