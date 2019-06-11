/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";
import { useState, useRef, forwardRef } from "react";
import { useUIMode } from "./ThemeProvider";

/* TO DO: Unify all the Themed Helpers */

const themedThumbProps = props => ({
  light: {
    borderWidth: 1,
    borderColor: themeGet(`colors.gray.200`)(props)
  },
  dark: {}
});

const thumbStyle = props => ({
  width: themeGet(`sizes.slider.${props.sliderSize}.thumb`, 16)(props),
  height: themeGet(`sizes.slider.${props.sliderSize}.thumb`, 16)(props),
  borderRadius: themeGet(`radii.round`)(props),
  backgroundColor: "#fff",
  top: -1,
  ...themedThumbProps(props)[props.mode],
  boxShadow: themeGet(`shadows.sm`)(props),
  transition: "transform 0.2s",
  "&:active": {
    transform: "scale(1.15)"
  }
});

const sliderThumbFocusedStyle = props => ({
  boxShadow: themeGet("shadows.focusring")(props),
  borderColor: themeGet(`colors.blue.300`)(props)
});

const sliderThumbDisabledStyle = props => ({
  backgroundColor: themeGet("colors.gray.300")(props)
});

const firefoxStyle = props => ({
  "&::-moz-focus-outer": {
    border: 0
  },
  "&:focus::-moz-range-thumb": {
    ...sliderThumbFocusedStyle(props)
  },
  "&:disabled::-moz-range-thumb": {
    ...sliderThumbDisabledStyle(props)
  },
  "&::-moz-range-thumb": {
    appearance: "none",
    ...thumbStyle(props)
  }
});

const IEStyle = props => ({
  "&:focus::-ms-thumb": {
    ...sliderThumbFocusedStyle(props)
  },
  "&:disabled::-ms-thumb": {
    ...sliderThumbDisabledStyle(props)
  },
  "&::-ms-thumb": {
    appearance: "none",
    marginTop: 0,
    ...thumbStyle(props)
  }
});

const chromeStyle = props => ({
  "&:focus::-webkit-slider-thumb": {
    ...sliderThumbFocusedStyle(props)
  },
  "&:disabled::-webkit-slider-thumb": {
    ...sliderThumbDisabledStyle(props)
  },
  "&::-webkit-slider-thumb": {
    appearance: "none",
    ...thumbStyle(props)
  }
});

const generateGradient = (props, color = "currentColor") => {
  return `linear-gradient(
    90deg,
    ${color} 0%,
    ${color} ${props.trackPercent}%,
    transparent ${props.trackPercent}%,
    transparent 100%
  )`;
};

const themedProps = props => ({
  light: {
    backgroundColor: themeGet(`colors.gray.200`)(props),
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.7,
      backgroundImage: generateGradient(
        props,
        themeGet(`colors.gray.400`)(props)
      )
    }
  },
  dark: {
    backgroundColor: themeGet(`colors.alpha.300`)(props),
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.7,
      backgroundImage: generateGradient(
        props,
        themeGet(`colors.alpha.500`)(props)
      )
    }
  }
});

const StyledSlider = styled("input")(props => ({
  appearance: "none",
  width: "100%",
  height: themeGet(`sizes.slider.${props.sliderSize}.trackHeight`, 4)(props),
  outline: "none",
  transition: "all 0.2s",
  borderRadius: themeGet(`radii.sm`)(props),
  cursor: "pointer",
  color: props.theme.colors[props.sliderColor]["500"],
  backgroundImage: generateGradient(props),
  ...themedProps(props)[props.mode],
  ...chromeStyle(props),
  ...firefoxStyle(props),
  ...IEStyle(props)
}));

const Slider = forwardRef(
  (
    {
      value,
      defaultValue,
      isDisabled,
      max,
      maxLabel,
      min,
      minLabel,
      size,
      color,
      step,
      onChange,
      ...rest
    },
    ref
  ) => {
    const mode = useUIMode();
    const [val, setVal] = useState(defaultValue || 0);
    const { current: isControlled } = useRef(value !== undefined);

    const handleChange = event => {
      !isControlled && setVal(event.target.value);
      onChange && onChange(event.target.value);
    };

    const getPercentValue = (value, min, max) => {
      let percent = 0;
      if (min < max && value > min) {
        percent = (((value - min) / (max - min)) * 100).toFixed(2);
      }
      return percent;
    };

    const trackPercent = isControlled
      ? getPercentValue(value, min, max)
      : getPercentValue(val, min, max);

    const sliderValue = isControlled ? value : val;

    return (
      <StyledSlider
        type="range"
        min={min}
        aria-valuemin={min}
        max={max}
        aria-valuemax={max}
        mode={mode}
        step={step}
        ref={ref}
        sliderColor={color}
        sliderSize={size}
        value={sliderValue}
        aria-valuenow={sliderValue}
        aria-orientation="horizontal"
        disabled={isDisabled}
        onChange={handleChange}
        trackPercent={trackPercent}
        {...rest}
      />
    );
  }
);

Slider.defaultProps = {
  isDisabled: false,
  defaultValue: 50,
  size: "md",
  color: "blue",
  min: 0,
  max: 100,
  step: 1,
  onChange: () => {}
};

Slider.displayName = "Slider";

export default Slider;
