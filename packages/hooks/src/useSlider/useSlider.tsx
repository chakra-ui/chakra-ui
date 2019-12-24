import {
  constrainValue,
  composeEventHandlers,
  createOnKeyDown,
  percentToValue,
  roundValueToStep,
  valueToPercent,
  createContext,
} from "@chakra-ui/utils";
import * as React from "react";
import useControllableValue from "../useControllableValue";
import useId from "../useId";
import { throttle } from "throttle-debounce";

const [SliderContextProvider, useSliderContext] = createContext<any>();
export { SliderContextProvider };

// http://muffinman.io/aria-progress-range-slider/
/////////////////////////////////////////////////////////////////////////////////

export function useSliderThumb(props: any) {
  const slider = useSliderContext();

  return {
    ref: slider.thumbRef,
    "aria-disabled": slider.isDisabled ? undefined : 0,
    "data-chakra-slider-thumb": "",
    role: "slider",
    "aria-valuetext": slider.valueText,
    "aria-valuemin": slider.min,
    "aria-valuemax": slider.max,
    "aria-valuenow": slider.value,
    "aria-orientation": slider.orientation,
    onKeyDown: composeEventHandlers(props.onKeyDown, slider.onKeyDown),
  };
}

export function useSliderMarker(props: any) {
  const slider = useSliderContext();

  const isInRange = !(props.value < slider.min || props.value > slider.max);
  const isHighlighted = slider.value >= props.value;
  const markerPercent = valueToPercent(props.value, slider.min, slider.max);

  const markerStyle: React.CSSProperties = {
    position: "absolute",
    ...(slider.isVertical
      ? { bottom: `${markerPercent}%` }
      : { left: `${markerPercent}%` }),
  };

  return { isInRange, markerStyle, isHighlighted };
}

interface SliderOptions {
  /**
   * minimum value the slider can hold
   * @default 0
   */
  min?: number;
  /**
   * maximum value the slider can hold
   * @default 100
   */
  max?: number;
  /**
   * step in which increments/decrements have to be made
   * @default 1
   */
  step?: number;
  /**
   * The value of the slider in controlled mode
   */
  value?: number;
  /**
   * The initial value of the slider in uncontrolled mode
   */
  defaultValue?: number;
  /**
   * orientation of the slider
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * If `true`, the value will be incremented or decremented in reverse.
   */
  isReversed?: boolean;
  /**
   * function gets called whenever the user starts dragging the slider handle
   */
  onChangeState?: (value?: number) => void;
  /**
   * function gets called whenever the user stops dragging the slider handle.
   */
  onChangeEnd?: (value?: number) => void;
  /**
   * function gets called whenever the slider handle is being dragged or clicked
   */
  onChange?: (value?: number) => void;
}

/////////////////////////////////////////////////////////////////////////////////

export function useSlider(props: any) {
  const {
    min,
    max,
    onChange,
    value: valueProp,
    defaultValue,
    isReversed,
    orientation,
    id: idProp,
    isDisabled,
    onChangeStart,
    onChangeEnd,
    step,
  } = props;

  const [isPointerDown, setIsPointerDown] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const [valueState, setValue] = React.useState(() => {
    if (defaultValue) return defaultValue;
    return isReversed ? max : min;
  });

  const [isControlled, _value] = useControllableValue(valueProp, valueState);

  // Constrain the value because it can't be less than min
  // or greater than max
  const value = constrainValue(_value, min, max);

  const reversedValue = max - value + min;
  const trackValue = isReversed ? reversedValue : value;
  const trackPercent = valueToPercent(trackValue, min, max);

  // A single place to update state for controlled/uncontrolled scenarios
  const updateValue = React.useCallback(
    newValue => {
      if (!isControlled) {
        setValue(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
    },
    [isControlled, onChange],
  );

  const isVertical = orientation === "vertical";

  // Let's keep a reference to the slider track and thumb
  const trackRef = React.useRef<HTMLElement>();
  const thumbRef = React.useRef<HTMLElement>();

  const uuid = useId();
  const id = idProp || uuid;

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      if (isDisabled) return;

      setIsPointerDown(true);

      if (onChangeStart) {
        onChangeStart(value);
      }

      if (trackRef.current) {
        const nextValue = getValueFromPointer(event);
        trackRef.current.setPointerCapture(event.pointerId);

        if (nextValue !== value) {
          updateValue(nextValue);
        }

        if (thumbRef.current) {
          thumbRef.current.focus();
        }
      }
    },
    //eslint-disable-next-line
    [isDisabled, onChangeStart, value, updateValue],
  );

  const onPointerUp = React.useCallback(
    (event: React.PointerEvent) => {
      setIsPointerDown(false);

      if (trackRef.current) {
        trackRef.current.releasePointerCapture(event.pointerId);
      }

      if (onChangeEnd) {
        onChangeEnd(value);
      }
    },
    [onChangeEnd, value],
  );

  // throttle the pointer move function
  const log = throttle(100, (event?: any) => {
    // setIsHovering(true)
    const nextValue = getValueFromPointer(event);
    console.log(nextValue);
  });

  const onPointerLeave = () => {
    // setIsHovering(false)
  };

  const onPointerMove = (event: React.PointerEvent) => {
    event.persist();
    log(event);
    if (isPointerDown) {
      const nextValue = getValueFromPointer(event);
      if (nextValue !== value) {
        updateValue(nextValue);
      }
    }
  };

  const getValueFromPointer = React.useCallback(
    (event: React.PointerEvent) => {
      if (trackRef.current) {
        const trackRect = trackRef.current.getBoundingClientRect();
        const { clientX, clientY } = event;
        let diff = isVertical
          ? trackRect.bottom - clientY
          : clientX - trackRect.left;

        const length = isVertical ? trackRect.height : trackRect.width;
        let percent = diff / length;

        if (isReversed) {
          percent = 1 - percent;
        }

        let nextValue = percentToValue(percent, min, max);

        if (step) {
          nextValue = +roundValueToStep(nextValue, step);
        }

        nextValue = constrainValue(nextValue, min, max);
        return nextValue;
      }
    },
    [isVertical, isReversed, max, min, step],
  );

  // Callback invoked When focus is on the thumb and you use the arrow keys,
  const tenSteps = (max - min) / 10;
  const keyStep = step || (max - min) / 100;

  const constrainAndUpdate = React.useCallback(
    (value: number) => {
      let nextValue = value;
      nextValue = +roundValueToStep(nextValue, keyStep);
      nextValue = constrainValue(nextValue, min, max);
      updateValue(nextValue);
    },
    [keyStep, max, min, updateValue],
  );

  // Just a short-hand for `constrainAndUpdate`
  const cAU = constrainAndUpdate;

  const onKeyDown = createOnKeyDown({
    stopPropagation: true,
    keyMap: {
      ArrowRight: () => cAU(value + keyStep),
      ArrowUp: () => cAU(value + keyStep),
      ArrowLeft: () => cAU(value - keyStep),
      ArrowDown: () => cAU(value - keyStep),
      PageUp: () => cAU(value + tenSteps),
      PageDown: () => cAU(value - tenSteps),
      Home: () => cAU(props.min),
      End: () => cAU(props.max),
    },
  });

  /**
   * ARIA (Optional): To define a human readable representation of the value,
   * we allow users pass aria-valuetext.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-valuetext_attribute
   */
  const valueText = props.getAriaValueText
    ? props.getAriaValueText(value)
    : props["aria-valuetext"];

  const onFocus = React.useCallback(() => setIsFocused(true), []);
  const onBlur = React.useCallback(() => setIsFocused(false), []);

  const thumbStyle: React.CSSProperties = {
    position: "absolute",
    ...(isVertical
      ? { bottom: `calc(${trackPercent}%)` }
      : { left: `calc(${trackPercent}%)` }),
  };
  const thumbId = `slider-thumb-${id}`;

  const trackStyle: React.CSSProperties = {
    position: "relative",
    touchAction: "none",
  };

  const trackId = `slider-track-${id}`;

  // Support for Native slider methods
  const stepUp = React.useCallback(() => cAU(value + keyStep), [
    cAU,
    keyStep,
    value,
  ]);
  const stepDown = React.useCallback(() => cAU(value - keyStep), [
    cAU,
    keyStep,
    value,
  ]);
  const reset = React.useCallback(() => cAU(props.defaultValue), [
    cAU,
    props.defaultValue,
  ]);
  const stepTo = React.useCallback((value: number) => cAU(value), [cAU]);

  // Return all the goods :)
  return {
    trackPercent,
    value,
    valueText,
    isPointerDown,
    isFocused,
    methods: {
      stepUp,
      stepDown,
      stepTo,
      reset,
    },
    track: {
      ref: trackRef as any,
      onPointerDown,
      onPointerUp,
      onPointerMove,
      id: trackId,
      style: trackStyle,
    },
    thumb: {
      ref: thumbRef as any,
      onKeyDown,
      onFocus,
      onBlur,
      id: thumbId,
      style: thumbStyle,
    },
  };
}
