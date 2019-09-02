import React, { forwardRef, useRef, useState } from "react";
import Flex from "../Flex";
import Icon from "../Icon";
import Input from "../Input";
import PseudoBox from "../PseudoBox";
import { useColorMode } from "../ColorModeProvider";
import { clampValue } from "../Slider";

const themedProps = {
  light: {
    borderColor: "inherit",
    _active: {
      bg: "gray.200",
    },
    _last: {
      roundedBottomRight: 3,
      mt: "-1px",
      borderTopWidth: 1,
    },
  },
  dark: {
    color: "whiteAlpha.800",
    borderColor: "whiteAlpha.300",
    _last: {
      roundedBottomRight: 3,
      mt: "-1px",
      borderTopWidth: 1,
    },
    _active: {
      bg: "whiteAlpha.300",
    },
  },
};

const styleProps = ({ colorMode }) => ({
  borderLeft: "1px",
  _first: {
    roundedTopRight: 1,
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  ...themedProps[colorMode],
});

const SpinButton = ({ isDisabled, ...props }) => {
  const { colorMode } = useColorMode();

  return (
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
      {...styleProps({ colorMode })}
      {...props}
    />
  );
};

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
    const [val, setVal] = useState(defaultValue || 0);

    const { current: isControlled } = useRef(valueProp != null);
    const _value = isControlled ? valueProp : val;

    const getNextValue = nextVal => {
      if (nextVal > max) {
        return nextVal;
      }
      if (nextVal < min) {
        return min;
      }
      return nextVal;
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
          <SpinButton onClick={isDisabled ? undefined : handleIncrement}>
            <Icon name="chevron-up" size={iconSize} />
          </SpinButton>
          <SpinButton onClick={isDisabled ? undefined : handleDecrement}>
            <Icon name="chevron-down" size={iconSize} />
          </SpinButton>
        </Flex>
      </Flex>
    );
  },
);

export default NumberInput;
