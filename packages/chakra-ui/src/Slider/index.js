/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  forwardRef,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext
} from "react";
import { Box } from "../Layout";
import useSliderStyle from "./styles";
import PseudoBox from "../PseudoBox";
import { mergeRefs } from "../utils";

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

export function roundValueToStep(value, step) {
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

////////////////////////////////////////////////////////////////

export const SliderThumb = forwardRef((props, ref) => {
  const {
    thumbRef,
    isDisabled,
    onFocus,
    onThumbKeyDown: onKeyDown,
    min,
    max,
    valueText,
    orientation,
    trackPercent,
    size,
    color,
    value,
    ariaLabelledBy
  } = useSliderContext();
  const { thumbStyle } = useSliderStyle({
    trackPercent,
    orientation,
    size,
    color
  });
  return (
    <PseudoBox
      data-slider-thumb=""
      onFocus={onFocus}
      ref={node => mergeRefs([thumbRef, ref], node)}
      role="slider"
      tabIndex={isDisabled ? undefined : 0}
      aria-disabled={isDisabled}
      aria-valuemin={min}
      aria-valuetext={valueText}
      aria-orientation={orientation}
      aria-valuenow={value}
      aria-valuemax={max}
      aria-labelledby={ariaLabelledBy}
      onKeyDown={onKeyDown}
      {...thumbStyle}
      {...props}
    />
  );
});

////////////////////////////////////////////////////////////////

export const SliderTrack = props => {
  const { trackRef, isDisabled, ...context } = useSliderContext();
  const { trackStyle } = useSliderStyle(context);
  return (
    <Box
      data-slider-track=""
      aria-disabled={isDisabled}
      ref={trackRef}
      {...trackStyle}
      {...props}
    />
  );
};

////////////////////////////////////////////////////////////////

export const SliderFilledTrack = props => {
  const { isDisabled, ...context } = useSliderContext();
  const { filledTrackStyle } = useSliderStyle(context);
  return (
    <PseudoBox
      aria-disabled={isDisabled}
      data-slider-filled-track=""
      {...filledTrackStyle}
      {...props}
    />
  );
};

////////////////////////////////////////////////////////////////

const SliderContext = createContext();
const useSliderContext = () => {
  return useContext(SliderContext);
};

const Slider = forwardRef(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
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
      name,
      id,
      children,
      ...rest
    },
    ref
  ) => {
    const { current: isControlled } = useRef(controlledValue != null);
    const [value, setValue] = useState(defaultValue || 0);

    const _value = isControlled ? controlledValue : value;
    let actualValue = clampValue(_value, min, max);

    const trackPercent = valueToPercent(actualValue, min, max);

    const { rootStyle } = useSliderStyle({
      trackPercent,
      orientation,
      size,
      color
    });

    const trackRef = useRef();
    const thumbRef = useRef();

    const getNewValue = event => {
      if (trackRef.current) {
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
      }
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

    const handleThumbKeyDown = event => {
      let flag = false;
      let newValue;
      const tenSteps = (max - min) / 10;

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
          newValue = actualValue - tenSteps;
          flag = true;
          break;
        case "PageUp":
          newValue = actualValue + tenSteps;
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

      onKeyDown && onKeyDown(event);
    };

    const handleMouseUp = () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };

    // TODO: Optimize this mouseMove event

    const handleMouseMove = event => {
      let newValue = getNewValue(event);
      updateValue(newValue);
    };

    const handleMouseDown = event => {
      if (isDisabled) return;
      onMouseDown && onMouseDown(event);
      event.preventDefault();

      let newValue = getNewValue(event);
      if (newValue !== actualValue) {
        updateValue(newValue);
      }

      document.body.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseup", handleMouseUp);
      thumbRef.current && thumbRef.current.focus();
    };

    const valueText = getAriaValueText
      ? getAriaValueText(actualValue)
      : ariaValueText;

    const context = {
      trackRef,
      thumbRef,
      onThumbKeyDown: handleThumbKeyDown,
      onFocus,
      trackPercent,
      ariaLabelledBy,
      orientation,
      isDisabled,
      size,
      color,
      min,
      max,
      valueText,
      value: actualValue
    };

    return (
      <SliderContext.Provider value={context}>
        <Box
          role="presentation"
          tabIndex="-1"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onBlur={event => {
            handleMouseUp();
            onBlur && onBlur(event);
          }}
          py={3}
          aria-disabled={isDisabled}
          ref={ref}
          {...rootStyle}
          {...rest}
        >
          {children}
          <input type="hidden" value={actualValue} name={name} id={id} />
        </Box>
      </SliderContext.Provider>
    );
  }
);

export default Slider;
