import { useControllableProp, useId } from "@chakra-ui/hooks";
import {
  composeEventHandlers,
  constrainValue,
  createContext,
  createOnKeyDown,
  percentToValue,
  roundValueToStep,
  valueToPercent,
} from "@chakra-ui/utils";
import * as React from "react";

const [SliderContextProvider, useSliderContext] = createContext<
  SliderHookReturn
>();
export { SliderContextProvider };

// http://muffinman.io/aria-progress-range-slider/

interface SliderHookProps {
  /**
   * The minimum allowed value of the slider. Cannot be greater than max.
   * @default 0
   */
  min?: number;
  /**
   * The maximum allowed value of the slider. Cannot be less than min.
   * @default 100
   */
  max?: number;
  /**
   * The step in which increments/decrements have to be made
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
  onChangeStart?: (value: number) => void;
  /**
   * function gets called whenever the user stops dragging the slider handle.
   */
  onChangeEnd?: (value: number) => void;
  /**
   * function gets called whenever the slider handle is being dragged or clicked
   */
  onChange?: (value: number) => void;
  /**
   * The base id to use for the slider and it's components
   */
  id?: string;
  /**
   * If `true`, the slider will be disabled
   */
  isDisabled?: boolean;
  /**
   * Function that returns the `aria-valuetext` for screen readers
   */
  getAriaValueText?: (value: number) => string;
  /**
   * The static string to use used for `aria-valuetext`
   */
  "aria-valuetext"?: string;
}

/////////////////////////////////////////////////////////////////////////////////

export function useSlider(props: SliderHookProps) {
  const {
    min = 0,
    max = 100,
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
    getAriaValueText,
    "aria-valuetext": ariaValueText,
  } = props;

  const [isPointerDown, setIsPointerDown] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const [valueState, setValue] = React.useState(() => {
    if (defaultValue) return defaultValue;
    return isReversed ? max : min;
  });

  const [isControlled, derivedValue] = useControllableProp(
    valueProp,
    valueState,
  );

  // Constrain the value because it can't be less than min
  // or greater than max
  const value = constrainValue(derivedValue, min, max);

  const reversedValue = max - value + min;
  const trackValue = isReversed ? reversedValue : value;
  const trackPercent = valueToPercent(trackValue, min, max);

  // A single place to update state for controlled/uncontrolled scenarios
  const updateValue = React.useCallback(
    nextValue => {
      if (!isControlled) {
        setValue(nextValue);
      }
      if (onChange) {
        onChange(nextValue);
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
  const thumbId = `slider-thumb-${id}`;
  const trackId = `slider-track-${id}`;

  const getValueFromPointer = React.useCallback(
    (event: React.PointerEvent) => {
      if (trackRef.current) {
        const trackRect = trackRef.current.getBoundingClientRect();
        const { clientX, clientY } = event;
        const diff = isVertical
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

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent) => {
      if (isPointerDown) {
        const nextValue = getValueFromPointer(event);
        if (nextValue !== value) {
          updateValue(nextValue);
        }
      }
    },
    [isPointerDown, updateValue, getValueFromPointer, value],
  );

  // Callback invoked When focus is on the thumb and you use the arrow keys,
  const tenSteps = (max - min) / 10;
  const keyStep = step || (max - min) / 100;

  const constrain = React.useCallback(
    (value: number) => {
      let nextValue = value;
      nextValue = +roundValueToStep(nextValue, keyStep);
      nextValue = constrainValue(nextValue, min, max);
      updateValue(nextValue);
    },
    [keyStep, max, min, updateValue],
  );

  const onKeyDown = createOnKeyDown({
    stopPropagation: true,
    keyMap: {
      ArrowRight: () => constrain(value + keyStep),
      ArrowUp: () => constrain(value + keyStep),
      ArrowLeft: () => constrain(value - keyStep),
      ArrowDown: () => constrain(value - keyStep),
      PageUp: () => constrain(value + tenSteps),
      PageDown: () => constrain(value - tenSteps),
      Home: () => constrain(min),
      End: () => constrain(max),
    },
  });

  /**
   * ARIA (Optional): To define a human readable representation of the value,
   * we allow users pass aria-valuetext.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-valuetext_attribute
   */
  const valueText = getAriaValueText ? getAriaValueText(value) : ariaValueText;

  const onFocus = React.useCallback(() => setIsFocused(true), []);
  const onBlur = React.useCallback(() => setIsFocused(false), []);

  const thumbStyle = {
    position: "absolute",
    ...(isVertical
      ? { bottom: `calc(${trackPercent}%)` }
      : { left: `calc(${trackPercent}%)` }),
  };

  const trackStyle = {
    position: "relative",
    touchAction: "none",
  };

  // Support for Native slider methods
  const stepUp = React.useCallback(() => constrain(value + keyStep), [
    constrain,
    keyStep,
    value,
  ]);
  const stepDown = React.useCallback(() => constrain(value - keyStep), [
    constrain,
    keyStep,
    value,
  ]);
  const reset = React.useCallback(() => constrain(defaultValue || 0), [
    constrain,
    defaultValue,
  ]);
  const stepTo = React.useCallback((value: number) => constrain(value), [
    constrain,
  ]);

  return {
    min,
    max,
    isVertical,
    isDisabled,
    orientation,
    trackPercent,
    value,
    valueText,
    isFocused,
    isPointerDown,
    thumbRef,
    thumbId,
    thumbStyle,
    onKeyDown,
    onFocus,
    onBlur,
    trackId,
    trackRef,
    trackStyle,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    stepUp,
    stepDown,
    stepTo,
    reset,
  };
}

type SliderHookReturn = ReturnType<typeof useSlider>;

export type SliderTrackHookProps = {
  onPointerDown: React.PointerEventHandler;
  onPointerUp: React.PointerEventHandler;
  onPointerMove: React.PointerEventHandler;
};

export function useSliderTrack(props: SliderTrackHookProps) {
  const {
    trackRef,
    trackStyle,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    trackId,
  } = useSliderContext();

  return {
    ...props,
    ref: trackRef,
    onPointerDown: composeEventHandlers(props.onPointerDown, onPointerDown),
    onPointerUp: composeEventHandlers(props.onPointerUp, onPointerUp),
    onPointerMove: composeEventHandlers(props.onPointerMove, onPointerMove),
    id: trackId,
    style: trackStyle,
  };
}

type SliderThumbHookProps = {
  onKeyDown: React.KeyboardEventHandler;
};

export function useSliderThumb(props: SliderThumbHookProps) {
  const {
    thumbRef,
    isDisabled,
    value,
    valueText,
    min,
    max,
    onKeyDown,
    orientation,
  } = useSliderContext();

  return {
    ...props,
    ref: thumbRef,
    "aria-disabled": isDisabled ? undefined : 0,
    "data-chakra-slider-thumb": "",
    role: "slider",
    "aria-valuetext": valueText,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": value,
    "aria-orientation": orientation,
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
  };
}

type SliderMarkerHookProps = {
  style?: React.CSSProperties;
  value: number;
};

export function useSliderMarker(props: SliderMarkerHookProps) {
  const { min, max, isVertical, value } = useSliderContext();

  const isInRange = !(props.value < min || props.value > max);
  const isHighlighted = value >= props.value;
  const markerPercent = valueToPercent(props.value, min, max);

  const markerStyle = {
    position: "absolute",
    ...(isVertical
      ? { bottom: `${markerPercent}%` }
      : { left: `${markerPercent}%` }),
  };

  return {
    ...props,
    "data-invalid": !isInRange || undefined,
    style: { ...props.style, ...markerStyle },
    "data-highlighted": isHighlighted || undefined,
  };
}
