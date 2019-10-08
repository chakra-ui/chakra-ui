import { canUseDOM } from "exenv";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  calculatePrecision,
  preventNonNumberKey,
  roundToPrecision,
} from "./utils";

// function useLongPress(callback) {
//   const timeout = useRef();
//   const interval = useRef();

//   const start = () => {
//     callback();
//     timeout.current = setTimeout(() => {
//       interval.current = setInterval(() => {
//         callback();
//       }, 200);
//     }, 150);
//   };

//   const stop = () => {
//     clearTimeout(timeout.current);
//     clearInterval(interval.current);
//   };

//   return {
//     onMouseUp: stop,
//     onMouseLeave: stop,
//     onMouseDown: start,
//     onTouchStart: start,
//     onTouchEnd: stop,
//   };
// }

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

  return {
    onMouseUp: stop,
    onMouseLeave: stop,
    onMouseDown: start,
    onTouchStart: start,
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

  const [value, setValue] = useState(() => {
    if (defaultValue != null) {
      return roundToPrecision(defaultValue, precision);
    }
    return 0;
  });

  const [isFocused, setIsFocused] = useState(false);

  const _value = isControlled ? valueProp : value;
  const isInteractive = !(isReadOnly || isDisabled);
  const inputRef = useRef();

  const updateValue = value => {
    !isControlled && setValue(value);
    onChange && onChange(value);
  };

  const handleIncrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(_value) + Number(step);

    if (keepWithinRange) {
      nextValue = Math.min(nextValue, max);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const handleDecrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(_value) - Number(step);

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

  const incrementSpinnerProps = useLongPress(handleIncrement);
  const decrementSpinnerProps = useLongPress(handleDecrement);

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

    if (maxExists && _value > max) {
      updateValue(max);
    }

    if (minExists && _value < min) {
      updateValue(min);
    }
  };

  const isOutOfRange = _value > max || _value < min;
  const ariaValueText = getAriaValueText ? getAriaValueText(_value) : null;

  return {
    value: _value,
    isFocused,
    isDisabled,
    isReadOnly,
    incrementSpinner: incrementSpinnerProps,
    decrementSpinner: decrementSpinnerProps,
    incrementButton: {
      onClick: () => handleIncrement(),
      "aria-label": "add",
      ...(keepWithinRange && {
        disabled: _value === max,
        "aria-disabled": _value === max,
      }),
    },
    decrementButton: {
      onClick: () => handleDecrement(),
      "aria-label": "subtract",
      ...(keepWithinRange && {
        disabled: _value === min,
        "aria-disabled": _value === min,
      }),
    },
    input: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ref: inputRef,
      value: _value,
      role: "spinbutton",
      type: "text",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-disabled": isDisabled,
      "aria-valuenow": _value,
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
      children: getAriaValueText ? ariaValueText : _value,
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
