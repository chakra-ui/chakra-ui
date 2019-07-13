/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, useRef, useState } from "react";
import { Flex } from "../Layout";

const SliderInput = ({
  defaultValue,
  isDisabled,
  min,
  max,
  size,
  step,
  onChange,
  value: valueProp,
  children,
  ...rest
}) => {
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
    value: isControlled ? valueProp : value,
    onChange: handleChange
  };

  return (
    <Flex alignItems="center" width="100%" {...rest}>
      {Children.map(children, child => cloneElement(child, sharedProps))}
    </Flex>
  );
};
export default SliderInput;
