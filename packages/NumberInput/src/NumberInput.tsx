import * as React from "react";
import { useNumberInput, NumberInputOptions } from "./NumberInput.hook";
import { chakra, forwardRef, PropsOf } from "@chakra-ui/system";
import { createContext, composeEventHandlers } from "@chakra-ui/utils";
import { useMergeRefs } from "@chakra-ui/hooks";

type ContextType = ReturnType<typeof useNumberInput> & { variantSize: string };
const [NumberInputCtxProvider, useNumberInputCtx] = createContext<
  ContextType
>();

const NumberInputStepper = forwardRef((props, ref) => {
  return (
    <chakra.div
      ref={ref}
      flexDirection="column"
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

export type NumberInputProps = NumberInputOptions & {
  isFullWidth?: boolean;
  variantSize?: string;
} & PropsOf<typeof chakra.div>;

export const NumberInput = forwardRef((props: NumberInputProps, ref) => {
  const {
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
    getAriaValueText,
    isReadOnly,
    isInvalid,
    isDisabled,
    isFullWidth,
    variantSize = "md",
    children,
    ...rest
  } = props;

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
    getAriaValueText,
    isReadOnly,
    isInvalid,
    isDisabled,
  });

  const finalChildren = children || (
    <>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </>
  );

  return (
    <NumberInputCtxProvider value={{ ...context, variantSize }}>
      <chakra.div
        ref={ref}
        alignItems="stretch"
        width={isFullWidth ? "full" : undefined}
        position="relative"
        {...rest}
      >
        {finalChildren}
      </chakra.div>
    </NumberInputCtxProvider>
  );
});

const StepperButton = forwardRef((props, ref) => {
  const { isDisabled } = useNumberInputCtx();

  return (
    <chakra.div
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
      {...props}
    />
  );
});

const NumberInputField = forwardRef(
  ({ onBlur, onFocus, onKeyDown, onChange, ...props }, ref) => {
    const {
      variantSize,
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
    } = useNumberInputCtx();

    const inputRef = useMergeRefs(_ref, ref);
    const handleBlur = composeEventHandlers(onBlur, _onBlur);
    const handleFocus = composeEventHandlers(onFocus, _onFocus);
    const handleKeyDown = composeEventHandlers(onKeyDown, _onKeyDown);
    const handleChange = composeEventHandlers(onChange, _onChange);

    return (
      <Input
        ref={inputRef}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        variantSize={variantSize}
        {...otherInputProps}
        {...props}
      />
    );
  },
);
