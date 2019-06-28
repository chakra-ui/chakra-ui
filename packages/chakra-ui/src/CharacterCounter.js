import React, { forwardRef, useRef, useState } from "react";
import Input from "./Input";
import { Box } from "./Layout";

const CharacterCounter = forwardRef(
  (
    {
      component: Comp = Input,
      defaultValue,
      value: valueProp,
      countDown,
      onChange,
      isInvalid,
      renderCounter,
      errorCondition: errorConditionProp,
      enforce,
      maxLength,
      ...rest
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue || "");
    const { current: isControlled } = useRef(valueProp != null);
    const realValue = isControlled ? valueProp : value;

    const errorCondition = () => {
      if (isInvalid) return isInvalid;
      if (errorConditionProp) return errorConditionProp(realValue.length);
      return countDown
        ? maxLength - realValue.length < 0
        : realValue.length > maxLength;
    };

    const renderCount = () => {
      if (countDown) return maxLength - realValue.length;
      return `${realValue.length}/${maxLength}`;
    };

    const handleChange = e => {
      onChange && onChange(e);
      !isControlled && setValue(e.target.value);
    };

    return (
      <Box position="relative">
        <Comp
          value={value}
          onChange={handleChange}
          ref={ref}
          isInvalid={errorCondition()}
          {...enforce && { maxLength }}
          {...rest}
        />
        {renderCounter ? (
          renderCounter({ countDown, count: realValue.length, maxLength })
        ) : (
          <Box
            mt={1}
            textAlign="right"
            fontSize="sm"
            aria-live="polite"
            aria-atomic="false"
            color={
              errorCondition()
                ? "red.600"
                : rest.mode === "dark"
                ? "alpha.800"
                : "gray.600"
            }
          >
            {renderCount()}
          </Box>
        )}
      </Box>
    );
  }
);

export default CharacterCounter;
