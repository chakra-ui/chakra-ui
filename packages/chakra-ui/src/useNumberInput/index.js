import { canUseDOM } from "exenv";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  calculatePrecision,
  preventNonNumberKey,
  roundToPrecision,
} from "./utils";

function useLongPress(callback = () => {}, speed = 200) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    let timerId;
    if (isPressed) {
      timerId = setTimeout(callback, speed);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isPressed, callback, speed]);

  const start = useCallback(() => {
    callback();
    setIsPressed(true);
  }, [callback]);

  const stop = useCallback(() => {
    setIsPressed(false);
  }, []);

  const clickEvent =
    canUseDOM && !!document.documentElement.ontouchstart
      ? "onTouchStart"
      : "onMouseDown";

  return {
    [clickEvent]: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
  };
}

function useNumberInput({
  value: valueProp,
  onChange,
  defaultValue,
  focusInputOnChange = true,
  clampValueOnBlur = true,
  keepWithinRange = true,
  min = -Infinity,
  max = Infinity,
  step: stepProp = 1,
  precision: precisionProp,
  getAriaValueText,
  isReadOnly,
  isInvalid,
  isDisabled,
}) {
  const { current: isControlled } = useRef(valueProp != null);

  const defaultPrecision = Math.max(calculatePrecision(stepProp), 0);
  const precision = precisionProp || defaultPrecision;

  const [valueState, setValue] = useState(() => {
    if (defaultValue != null) {
      let nextValue = defaultValue;
      if (keepWithinRange) {
        nextValue = Math.max(Math.min(nextValue, max), min);
      }
      nextValue = roundToPrecision(nextValue, precision);
      return nextValue;
    }
    return "";
  });

  const [isFocused, setIsFocused] = useState(false);

  const value = isControlled ? valueProp : valueState;
  const isInteractive = !(isReadOnly || isDisabled);
  const inputRef = useRef();

  const prevNextValue = useRef(null);

  const shouldConvertToNumber = value => {
    const hasDot = value.indexOf(".") > -1;
    const hasTrailingZero = value.substr(value.length - 1) === "0";
    const hasTrailingDot = value.substr(value.length - 1) === ".";
    if (hasDot && hasTrailingZero) return false;
    if (hasDot && hasTrailingDot) return false;
    return true;
  };

  const updateValue = nextValue => {
    //eslint-disable-next-line
    if (prevNextValue.current == nextValue) return;

    const shouldConvert = shouldConvertToNumber(nextValue);
    const converted = shouldConvert ? +nextValue : nextValue;

    if (!isControlled) setValue(converted);
    if (onChange) onChange(converted);

    prevNextValue.current = nextValue;
  };

  const handleIncrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(value) + Number(step);

    if (keepWithinRange) {
      nextValue = Math.min(nextValue, max);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const handleDecrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(value) - Number(step);

    if (keepWithinRange) {
      nextValue = Math.max(nextValue, min);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const focusInput = () => {
    if (focusInputOnChange && inputRef.current && canUseDOM) {
      requestAnimationFrame(() => {
        inputRef.current.focus();
      });
    }
  };

  const incrementStepperProps = useLongPress(handleIncrement);
  const decrementStepperProps = useLongPress(handleDecrement);

  const handleChange = event => {
    updateValue(event.target.value);
  };

  const handleKeyDown = event => {
    preventNonNumberKey(event);
    if (!isInteractive) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      handleIncrement(ratio * stepProp);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      handleDecrement(ratio * stepProp);
    }

    if (event.key === "Home") {
      event.preventDefault();
      if (min != null) {
        updateValue(max);
      }
    }

    if (event.key === "End") {
      event.preventDefault();
      if (max != null) {
        updateValue(min);
      }
    }
  };

  const getIncrementFactor = event => {
    let ratio = 1;
    if (event.metaKey || event.ctrlKey) {
      ratio = 0.1;
    }
    if (event.shiftKey) {
      ratio = 10;
    }
    return ratio;
  };

  const validateAndClamp = () => {
    const maxExists = max != null;
    const minExists = min != null;

    if (maxExists && value > max) {
      updateValue(max);
    }

    if (minExists && value < min) {
      updateValue(min);
    }
  };

  const isOutOfRange = value > max || value < min;
  const ariaValueText = getAriaValueText ? getAriaValueText(value) : null;

  return {
    value: value,
    isFocused,
    isDisabled,
    isReadOnly,
    incrementStepper: incrementStepperProps,
    decrementStepper: decrementStepperProps,
    incrementButton: {
      onClick: () => handleIncrement(),
      "aria-label": "add",
      ...(keepWithinRange && {
        disabled: value === max,
        "aria-disabled": value === max,
      }),
    },
    decrementButton: {
      onClick: () => handleDecrement(),
      "aria-label": "subtract",
      ...(keepWithinRange && {
        disabled: value === min,
        "aria-disabled": value === min,
      }),
    },
    input: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ref: inputRef,
      value,
      role: "spinbutton",
      type: "text",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-disabled": isDisabled,
      "aria-valuenow": value,
      "aria-invalid": isInvalid || isOutOfRange,
      ...(getAriaValueText && { "aria-valuetext": ariaValueText }),
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: "off",
      onFocus: () => {
        setIsFocused(true);
      },
      onBlur: () => {
        setIsFocused(false);
        if (clampValueOnBlur) {
          validateAndClamp();
        }
      },
    },
    hiddenLabel: {
      "aria-live": "polite",
      children: getAriaValueText ? ariaValueText : value,
      style: {
        position: "absolute",
        clip: "rect(0px, 0px, 0px, 0px)",
        height: 1,
        width: 1,
        margin: -1,
        whiteSpace: "nowrap",
        border: 0,
        overflow: "hidden",
        padding: 0,
      },
    },
  };
}

export default useNumberInput;
