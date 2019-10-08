import React, { createContext, forwardRef, useContext } from "react";
import { useColorMode } from "../ColorModeProvider";
import Flex from "../Flex";
import Icon from "../Icon";
import Input from "../Input";
import PseudoBox from "../PseudoBox";
import useNumberInput from "../useNumberInput";
import { useForkRef, wrapEvent } from "../utils";
import styleProps from "./styles";

const NumberInputContext = createContext({});
const useNumberInputContext = () => {
  const context = useContext(NumberInputContext);
  if (context == null) {
    throw new Error(
      "This component must be wrapped within a `NumberInputContext` ",
    );
  }
  return context;
};

const NumberInput = forwardRef(
  (
    {
      value,
      onChange,
      defaultValue,
      focusInputOnChange,
      clampValueOnBlur,
      keepWithinRange,
      min,
      max,
      step,
      precision,
      getAriaLabel,
      isReadOnly,
      isInvalid,
      isDisabled,
      onFocus,
      onBlur,
      isFullWidth,
      size,
      ...rest
    },
    ref,
  ) => {
    const context = useNumberInput({
      value,
      onChange,
      defaultValue,
      focusInputOnChange,
      clampValueOnBlur,
      keepWithinRange,
      min,
      max,
      step,
      precision,
      getAriaLabel,
      isReadOnly,
      isInvalid,
      isDisabled,
    });
    return (
      <NumberInputContext.Provider value={{ ...context, size }}>
        <Flex
          ref={ref}
          align="stretch"
          w={isFullWidth ? "full" : null}
          pos="relative"
          {...rest}
        />
      </NumberInputContext.Provider>
    );
  },
);

const NumberInputField = forwardRef(
  ({ onBlur, onFocus, onKeyDown, onChange, ...props }, ref) => {
    const {
      size,
      input: {
        ref: _ref,
        onBlur: _onBlur,
        onFocus: _onFocus,
        onChange: _onChange,
        onKeyDown: _onKeyDown,
        disabled: isDisabled,
        readOnly: isReadOnly,
        ...otherInputProps
      },
    } = useNumberInputContext();

    const inputRef = useForkRef(_ref, ref);
    const handleBlur = wrapEvent(onBlur, _onBlur);
    const handleFocus = wrapEvent(onFocus, _onFocus);
    const handleKeyDown = wrapEvent(onKeyDown, _onKeyDown);
    const handleChange = wrapEvent(onChange, _onChange);

    return (
      <Input
        ref={inputRef}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        size={size}
        {...otherInputProps}
        {...props}
      />
    );
  },
);

const NumberInputStepper = forwardRef((props, ref) => {
  return (
    <Flex
      ref={ref}
      direction="column"
      aria-hidden
      width="24px"
      margin="1px"
      position="absolute"
      right="0px"
      height="calc(100% - 2px)"
      {...props}
    />
  );
});

const StepperButton = forwardRef((props, ref) => {
  const { colorMode } = useColorMode();
  const { isDisabled } = useNumberInputContext();

  return (
    <PseudoBox
      ref={ref}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex="1"
      transition="all 0.3s"
      role="button"
      tabindex="-1"
      userSelect="none"
      aria-disabled={isDisabled}
      pointerEvents={isDisabled ? "none" : undefined}
      cursor="pointer"
      lineHeight="normal"
      {...styleProps({ colorMode })}
      {...props}
    />
  );
});

const NumberIncrementStepper = forwardRef((props, ref) => {
  const { incrementSpinner, size } = useNumberInputContext();
  const iconSize = size === "sm" ? "11px" : "15px";
  const children = props.children || <Icon name="triangle-up" size="0.6em" />;
  return (
    <StepperButton
      fontSize={iconSize}
      ref={ref}
      {...props}
      {...incrementSpinner}
    >
      {children}
    </StepperButton>
  );
});

const NumberDecrementStepper = forwardRef((props, ref) => {
  const { decrementSpinner, size } = useNumberInputContext();
  const iconSize = size === "sm" ? "11px" : "15px";
  const children = props.children || <Icon name="triangle-down" size="0.6em" />;
  return (
    <StepperButton
      fontSize={iconSize}
      ref={ref}
      {...props}
      {...decrementSpinner}
    >
      {children}
    </StepperButton>
  );
});

/**
 * <NumberInput>
 *  <NumberInput />
 *  <NumberInputStepper>
 *   <NumberIncrementStepper children="+"/>
 *   <NumberDecrementStepper children="-"/>
 * </NumberInputStepper>
 * </NumberInput>
 *
 * <NumberInput>
 *   {({isDisabled, isReadOnly, incrementButton, decrementButton}) => JSX.Element}
 * </NumberInput>
 */

export {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
};
