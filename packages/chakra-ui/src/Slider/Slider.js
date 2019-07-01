/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef, useRef, useState, useCallback } from "react";
import { Box } from "../Layout";
import useSliderStyle from "./SliderStyle";

function valueToPercent(value, min, max) {
  return ((value - min) * 100) / (max - min);
}

function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}

function makeValuePrecise(value, step) {
  const stepDecimalPart = step.toString().split(".")[1];
  const stepPrecision = stepDecimalPart ? stepDecimalPart.length : 0;
  return Number(value.toFixed(stepPrecision));
}

function roundValueToStep(value, step) {
  return makeValuePrecise(Math.round(value / step) * step, step);
}

function clampValue(val, min, max) {
  if (val > max) {
    return max;
  }
  if (val < min) {
    return min;
  }
  return val;
}

const Slider = forwardRef(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      onMouseDown,
      isDisabled,
      max = 100,
      min = 0,
      step = 1,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      "aria-valuetext": ariaValueText,
      orientation = "horizontal",
      getAriaValueText,
      size = "md",
      color = "blue",
      ...rest
    },
    ref
  ) => {
    const { current: isControlled } = useRef(controlledValue != null);
    const [value, setValue] = useState(defaultValue || 0);

    const derivedValue = isControlled ? controlledValue : value;
    let actualValue = clampValue(derivedValue, min, max);

    const trackPercent = valueToPercent(actualValue, min, max);
    const {
      trackStyle,
      filledTrackStyle,
      thumbStyle,
      rootStyle
    } = useSliderStyle({ trackPercent, orientation, size, color });

    const trackRef = useRef(null);
    const thumbRef = useRef(null);

    const getNewValue = event => {
      const { left, width } = trackRef.current.getBoundingClientRect();
      const { clientX } = event;
      let diffX = clientX - left;
      let percent = diffX / width;
      let newValue = percentToValue(percent, min, max);

      if (step) {
        newValue = roundValueToStep(newValue, step);
      }

      newValue = clampValue(newValue, min, max);

      return newValue;
    };

    const updateValue = useCallback(
      newValue => {
        if (!isControlled) {
          setValue(newValue);
        }
        if (onChange) {
          onChange(newValue);
        }
      },
      [isControlled, onChange]
    );

    const handleKeyDown = event => {
      let flag = false;
      let newValue;
      const tenPercents = (max - min) / 10;

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowDown":
          newValue = actualValue - step;
          flag = true;
          break;
        case "ArrowRight":
        case "ArrowUp":
          newValue = actualValue + step;
          flag = true;
          break;
        case "PageDown":
          newValue = actualValue - tenPercents;
          flag = true;
          break;
        case "PageUp":
          newValue = actualValue + tenPercents;
          flag = true;
          break;
        case "Home":
          newValue = min;
          flag = true;
          break;
        case "End":
          newValue = max;
          flag = true;
          break;
        default:
          return;
      }

      if (flag) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (step) {
        newValue = roundValueToStep(newValue, step);
      }
      newValue = clampValue(newValue, min, max);
      updateValue(newValue);
    };

    const handleMouseUp = event => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };

    // TODO: Optimize this mouseMove event (maybe we can throttle it)

    const handleMouseMove = event => {
      let newValue = getNewValue(event);
      updateValue(newValue);
    };

    const handleMouseDown = event => {
      if (isDisabled) {
        return;
      }

      if (onMouseDown) {
        onMouseDown(event);
      }

      event.preventDefault();

      let newValue = getNewValue(event);
      if (newValue !== actualValue) {
        updateValue(newValue);
      }

      document.body.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseup", handleMouseUp);

      thumbRef.current.focus();
    };

    const valueText = getAriaValueText
      ? getAriaValueText(actualValue)
      : ariaValueText;

    return (
      <Box
        role="presentation"
        tabIndex="-1"
        onMouseDown={handleMouseDown}
        css={rootStyle}
        py={3}
        aria-disabled={isDisabled}
        ref={ref}
        {...rest}
      >
        <Box data-slider-track="" ref={trackRef} css={trackStyle} />
        <Box
          data-slider-thumb=""
          ref={thumbRef}
          css={thumbStyle}
          role="slider"
          tabIndex={isDisabled ? undefined : 0}
          aria-valuemin={min}
          aria-valuetext={valueText}
          aria-orientation={orientation}
          aria-valuenow={actualValue}
          aria-valuemax={max}
          aria-labelledby={ariaLabelledBy}
          onKeyDown={handleKeyDown}
        />
        <Box data-slider-filled-track="" css={filledTrackStyle} />
        <input type="hidden" value={actualValue} name={name} />
      </Box>
    );
  }
);

export default Slider;
