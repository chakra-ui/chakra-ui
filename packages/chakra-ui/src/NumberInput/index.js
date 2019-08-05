import React, { forwardRef, useRef, useState } from "react";
import Flex from "../Flex";
import Icon from "../Icon";
import Input from "../Input";
import PseudoBox from "../PseudoBox";
import { useUIMode } from "../ThemeProvider";
import { roundValueToStep } from "../Slider";

const themedProps = {
  light: {
    borderColor: "inherit",
    _active: {
      bg: "gray.200",
    },
    _lastChild: {
      roundedBottomRight: 3,
      mt: "-1px",
      borderTopWidth: 1,
    },
  },
  dark: {
    color: "whiteAlpha.800",
    borderColor: "whiteAlpha.300",
    _lastChild: {
      roundedBottomRight: 3,
      mt: "-1px",
      borderTopWidth: 1,
    },
    _active: {
      bg: "whiteAlpha.300",
    },
  },
};

const styleProps = ({ mode }) => ({
  borderLeft: "1px",
  _firstChild: {
    roundedTopRight: 1,
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  ...themedProps[mode],
});

const Segment = ({ isDisabled, mode, ...props }) => (
  <PseudoBox
    display="flex"
    justifyContent="center"
    alignItems="center"
    flex="1"
    cursor="pointer"
    transition="all 0.3s"
    role="button"
    tabindex="-1"
    aria-disabled={isDisabled}
    {...styleProps({ mode })}
    {...props}
  />
);

const NumberInput = forwardRef(
  (
    {
      size,
      onChange,
      min,
      max,
      step = 1,
      defaultValue,
      value: valueProp,
      isDisabled,
      wrapperProps,
      ...rest
    },
    ref,
  ) => {
    const { mode } = useUIMode();
    const [val, setVal] = useState(defaultValue || 0);

    const { current: isControlled } = useRef(valueProp != null);
    const _value = isControlled ? valueProp : val;

    const getNextValue = nextVal => {
      return roundValueToStep(nextVal, step);
    };

    const handleIncrement = () => {
      const nextValue = getNextValue(_value + step);
      if (max == null) {
        !isControlled && setVal(nextValue);
        onChange && onChange(nextValue);
      }
      if (max != null && max >= nextValue) {
        !isControlled && setVal(nextValue);
        onChange && onChange(nextValue);
      }
    };

    const handleDecrement = () => {
      const nextValue = getNextValue(_value - step);
      if (min == null) {
        !isControlled && setVal(nextValue);
        onChange && onChange(nextValue);
      }
      if (min != null && min <= nextValue) {
        !isControlled && setVal(nextValue);
        onChange && onChange(nextValue);
      }
    };

    const handleChange = event => {
      const newValue = Number(event.target.value);
      !isControlled && setVal(newValue);
      onChange && onChange(newValue);
    };

    const iconSize = size === "sm" ? "11px" : "15px";

    return (
      <Flex alignItems="stretch" position="relative" {...wrapperProps}>
        <Input
          size={size}
          type="number"
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={_value}
          ref={ref}
          onChange={handleChange}
          value={_value}
          min={min}
          max={max}
          step={step}
          isDisabled={isDisabled}
          {...rest}
        />
        <Flex
          flexDirection="column"
          aria-hidden
          width="24px"
          m="1px"
          position="absolute"
          right="0px"
          height="calc(100% - 2px)"
        >
          <Segment
            onClick={isDisabled ? undefined : handleIncrement}
            mode={mode}
          >
            <Icon name="chevron-up" size={iconSize} color="currentColor" />
          </Segment>
          <Segment
            onClick={isDisabled ? undefined : handleDecrement}
            mode={mode}
          >
            <Icon name="chevron-down" size={iconSize} color="currentColor" />
          </Segment>
        </Flex>
      </Flex>
    );
  },
);

export default NumberInput;
