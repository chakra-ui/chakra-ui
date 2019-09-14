import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import Flex from "../Flex";
import Input from "../Input";
import Spinner from "./Spinner";
import { wrapEvent } from "../utils";

function useLongPress(callback = () => {}, speed = 200) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, speed);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress, callback, speed]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);

  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return { start, stop };
}

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
      focusOnUpDown = true,
      ...rest
    },
    ref,
  ) => {
    const [val, setVal] = useState(defaultValue || 0);
    const { current: isControlled } = useRef(valueProp != null);
    const _value = isControlled ? valueProp : val;

    const isEditable = !isReadOnly && !isDisabled;
    const ownRef = useRef();
    const _ref = ref || ownRef;

    const clampValue = nextVal => {
      let output = nextVal;

      if (nextVal > max) {
        output = max;
      }
      if (nextVal < min) {
        output = min;
      }
      return output;
    };

    const focusInput = () => {
      if (focusOnUpDown && _ref.current) {
        _ref.current.focus();
      }
    };

    const updateValue = value => {
      !isControlled && setVal(value);
      onChange && onChange(value);
    };

    const handleIncrement = (unitStep = step) => {
      let nextValue = Math.round((_value + unitStep) * 1e12) / 1e12;
      nextValue = clampValue(nextValue);

      const maxExists = max != null;

      if (!maxExists || (maxExists && max >= nextValue)) {
        updateValue(nextValue);
      }

      focusInput();
    };

    const handleDecrement = (unitStep = step) => {
      let nextValue = Math.round((_value - unitStep) * 1e12) / 1e12;
      nextValue = clampValue(nextValue);

      const minExists = min != null;
      if (!minExists || (minExists && min <= nextValue)) {
        updateValue(nextValue);
      }

      focusInput();
    };

    const handleChange = event => {
      const nextValue = Number(event.target.value);
      updateValue(nextValue);
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

    const handleKeyDown = event => {
      if (!isEditable) {
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const ratio = getIncrementFactor(event);
        handleIncrement(ratio * step);
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const ratio = getIncrementFactor(event);
        handleDecrement(ratio * step);
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    const handleBlur = wrapEvent(onBlur, event => {
      const maxExists = max != null;
      const minExists = min != null;

      if (maxExists && event.target.value > max) {
        updateValue(max);
      }

      if (minExists && event.target.value < min) {
        updateValue(min);
      }
    });

    const iconSize = size === "sm" ? "11px" : "15px";

    const increment = useLongPress(handleIncrement);
    const decrement = useLongPress(handleDecrement);

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
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          {...{
            form,
            pattern,
            min,
            placeholder,
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
          incrementProps={{
            onMouseDown: increment.start,
            onMouseUp: increment.stop,
            onMouseLeave: increment.stop,
            onTouchStart: increment.start,
            onTouchEnd: increment.stop,
            onClick: () => handleIncrement(),
            isDisabled: !isEditable,
          }}
          decrementProps={{
            onMouseDown: decrement.start,
            onMouseUp: decrement.stop,
            onMouseLeave: decrement.stop,
            onTouchStart: decrement.start,
            onTouchEnd: decrement.stop,
            onClick: () => handleDecrement(),
            isDisabled: !isEditable,
          }}
          iconSize={iconSize}
        />
      </Flex>
    );
  },
);

export default NumberInput;
