import { canUseDOM } from "exenv";
import { useRef, useState } from "react";
import {
  calculatePrecision,
  preventNonNumberKey,
  roundToPrecision,
} from "./utils";

function useLongPress(callback) {
  const timeout = useRef();
  const interval = useRef();

  const start = () => {
    callback();
    timeout.current = setTimeout(() => {
      interval.current = setInterval(() => {
        callback();
      }, 50);
    }, 300);
  };

  const stop = () => {
    clearTimeout(timeout.current);
    clearInterval(interval.current);
  };

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
  getAriaLabel,
  isReadonly,
  isInvalid,
  isDisabled,
  onFocus,
  onBlur,
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

  const isInteractive = !(isReadonly || isDisabled);

  const inputRef = useRef();

  const getNextValue = step => value => {
    let nextValue = Number(value) + Number(step);

    if (keepWithinRange) {
      nextValue = Math.min(nextValue, max);
    }

    nextValue = roundToPrecision(nextValue, precision);
    return nextValue;
  };

  const getPrevValue = step => value => {
    let nextValue = Number(value) - Number(step);

    if (keepWithinRange) {
      nextValue = Math.max(nextValue, min);
    }

    nextValue = roundToPrecision(nextValue, precision);
    return nextValue;
  };

  const focusInput = () => {
    if (focusInputOnChange && inputRef.current && canUseDOM) {
      requestAnimationFrame(() => {
        inputRef.current.focus();
      });
    }
  };

  const setValueToMax = () => {
    if (!isControlled) {
      setValue(max);
    }

    if (onChange) {
      onChange(max);
    }
  };

  const setValueToMin = () => {
    if (!isControlled) {
      setValue(min);
    }

    if (onChange) {
      onChange(min);
    }
  };

  const increment = (step = stepProp) => {
    if (!isInteractive) return;

    if (!isControlled) {
      setValue(getNextValue(step));
    }

    if (onChange) {
      onChange(getNextValue(step));
    }

    focusInput();
  };

  const decrement = (step = stepProp) => {
    if (!isInteractive) return;

    if (!isControlled) {
      setValue(getPrevValue(step));
    }
    if (onChange) {
      onChange(getPrevValue(step));
    }

    focusInput();
  };

  const incrementSpinnerProps = useLongPress(increment);
  const decrementSpinnerProps = useLongPress(decrement);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleKeyDown = event => {
    preventNonNumberKey(event);
    if (!isInteractive) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      increment(ratio * stepProp);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      decrement(ratio * stepProp);
    }

    if (event.key === "Home") {
      event.preventDefault();
      if (min != null) {
        setValueToMax();
      }
    }

    if (event.key === "End") {
      event.preventDefault();
      if (max != null) {
        setValueToMin();
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

  const validate = () => {
    const maxExists = max != null;
    const minExists = min != null;

    if (maxExists && _value > max) {
      setValueToMax();
    }

    if (minExists && _value < min) {
      setValueToMin();
    }
  };

  return {
    value: _value,
    isFocused,
    incrementSpinner: incrementSpinnerProps,
    decrementSpinner: decrementSpinnerProps,
    incrementButton: {
      onClick: () => increment(),
      "aria-label": "add",
      ...(keepWithinRange && {
        disabled: _value === max,
        "aria-disabled": _value === max,
      }),
    },
    decrementButton: {
      onClick: () => decrement(),
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
      "aria-invalid": isInvalid || _value > max,
      readOnly: isReadonly,
      disabled: isDisabled,
      autoComplete: "off",
      onFocus: event => {
        setIsFocused(true);
        if (onFocus) {
          onFocus(event);
        }
      },
      onBlur: event => {
        setIsFocused(false);
        if (clampValueOnBlur) {
          validate();
        }
        if (onBlur) {
          onBlur(event);
        }
      },
    },
    hiddenLabel: {
      "aria-live": "polite",
      children: getAriaLabel ? getAriaLabel(_value) : _value,
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
