import React, { forwardRef, useRef, useState, useEffect } from "react";
import Flex from "../Flex";
import Input from "../Input";
import Spinner from "./Spinner";

const NumberInput = forwardRef(
  (
    {
      size,
      form,
      pattern,
      name,
      placeholder,
      onBlur,
      onChange,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onFocus,
      id,
      autoFocus,
      variant,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      "aria-labelledby": ariaLabelledby,
      min,
      max,
      step = 1,
      defaultValue,
      value: valueProp,
      isReadOnly,
      isFullWidth,
      isDisabled,
      isInvalid,
      isRequired,
      focusBorderColor,
      inputProps,
      ...rest
    },
    ref,
  ) => {
    const [val, setVal] = useState(defaultValue || 0);

    const { current: isControlled } = useRef(valueProp != null);
    const _value = isControlled ? valueProp : val;

    const ownRef = useRef();

    const _ref = ref || ownRef;

    const clampValue = nextVal => {
      let output = nextVal;

      if (nextVal > max) {
        output = nextVal;
      }
      if (nextVal < min) {
        output = min;
      }
      return output;
    };

    const updateValue = value => {
      !isControlled && setVal(value);
      onChange && onChange(value);
    };

    const handleIncrement = () => {
      let nextValue = Math.round((_value + step) * 1e12) / 1e12;
      nextValue = clampValue(nextValue);

      if (max == null) {
        updateValue(nextValue);
      }
      if (max != null && max >= nextValue) {
        updateValue(nextValue);
      }
    };

    const handleDecrement = () => {
      let nextValue = Math.round((_value - step) * 1e12) / 1e12;
      nextValue = clampValue(nextValue);

      if (min == null) {
        updateValue(nextValue);
      }
      if (min != null && min <= nextValue) {
        updateValue(nextValue);
      }
    };

    const incrementRef = useRef();
    const decrementRef = useRef();

    const handleClick = (event, action) => {
      if (action === "increment") {
        handleIncrement(event);
      }

      if (action === "decrement") {
        handleDecrement(event);
      }
    };

    // A11y: Increase the value at an interval when the mouse is still down
    const handleUpMouseDown = () => {};

    // A11y: Decrease the value at an interval when the mouse is still down
    const handleDownMouseDown = () => {};

    const handleMouseUp = () => {
      clearInterval(incrementRef.current);
      clearInterval(decrementRef.current);
    };

    const handleChange = event => {
      const nextValue = Number(event.target.value);
      updateValue(nextValue);
    };

    // useEffect(() => {
    //   _ref.current && _ref.current.focus();
    // }, [val, _ref]);

    const iconSize = size === "sm" ? "11px" : "15px";

    return (
      <Flex
        align="stretch"
        w={isFullWidth ? "full" : null}
        pos="relative"
        {...rest}
      >
        <Input
          ref={_ref}
          size={size}
          type="number"
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={_value}
          onChange={handleChange}
          value={_value}
          {...{
            form,
            pattern,
            min,
            placeholder,
            onBlur,
            onKeyDown,
            onKeyUp,
            onKeyPress,
            onFocus,
            autoFocus,
            max,
            step,
            isDisabled,
            isInvalid,
            isRequired,
            name,
            id,
            isReadOnly,
            focusBorderColor,
            variant,
            "aria-label": ariaLabel,
            "aria-describedby": ariaDescribedby,
          }}
          {...inputProps}
        />
        <Spinner
          onClick={handleClick}
          onMouseDown={(event, action) => {
            if (action === "increment") {
              handleUpMouseDown();
            }

            if (action === "decrement") {
              handleDownMouseDown();
            }
          }}
          isDisabled={isDisabled}
          iconSize={iconSize}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </Flex>
    );
  },
);

export default NumberInput;
