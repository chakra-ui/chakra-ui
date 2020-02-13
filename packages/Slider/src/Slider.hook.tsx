import { useControllableProp, useId, useDimensions } from "@chakra-ui/hooks";
import {
  composeEventHandlers as compose,
  constrainValue,
  createContext,
  createOnKeyDown,
  percentToValue,
  roundValueToStep,
  valueToPercent,
  getBox,
  makeDataAttr as attr,
} from "@chakra-ui/utils";
import * as React from "react";

const [SliderProvider, useSliderContext] = createContext<SliderHookReturn>();

export { SliderProvider, useSliderContext };

// http://muffinman.io/aria-progress-range-slider/

export interface SliderHookProps {
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
  name?: string;
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
  thumbAlignment?: "center" | "contain";
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
    step = 1,
    getAriaValueText,
    "aria-valuetext": ariaValueText,
    name,
    ...htmlProps
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
  const trackRef = React.useRef<any>();
  const thumbRef = React.useRef<any>();

  const uuid = useId();
  const id = idProp || uuid;
  const thumbId = `slider-thumb-${id}`;
  const trackId = `slider-track-${id}`;
  const labelId = `slider-label-${id}`;

  const getValueFromPointer = React.useCallback(
    (event: React.PointerEvent) => {
      if (trackRef.current) {
        const trackRect = getBox(trackRef.current).borderBox;
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
   */
  const valueText = getAriaValueText ? getAriaValueText(value) : ariaValueText;

  const onFocus = React.useCallback(() => setIsFocused(true), []);
  const onBlur = React.useCallback(() => setIsFocused(false), []);

  const boxModel = useDimensions(thumbRef);
  const thumbRect = boxModel?.borderBox ?? { width: 0, height: 0 };

  const thumbAlignmentStyle: React.CSSProperties = isVertical
    ? { bottom: `calc(${trackPercent}% - ${thumbRect.height / 2}px)` }
    : { left: `calc(${trackPercent}% - ${thumbRect.width / 2}px)` };

  const thumbStyle: React.CSSProperties = {
    position: "absolute",
    userSelect: "none",
    touchAction: "none",
    ...thumbAlignmentStyle,
  };

  const rootStyle: React.CSSProperties = {
    position: "relative",
    touchAction: "none",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    userSelect: "none",
    ...(isVertical
      ? {
          paddingLeft: thumbRect.width,
          paddingRight: thumbRect.width,
        }
      : {
          paddingTop: thumbRect.height,
          paddingBottom: thumbRect.height,
        }),
  };

  const trackStyle: React.CSSProperties = {
    position: "absolute",
    ...(isVertical
      ? {
          left: "50%",
          transform: "translateX(-50%)",
          height: "100%",
        }
      : {
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
        }),
  };

  const innerTrackStyle: React.CSSProperties = {
    ...trackStyle,
    ...(isVertical
      ? { height: `${trackPercent}%`, bottom: 0 }
      : { width: `${trackPercent}%`, left: 0 }),
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
    id,
    name,
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
    labelId,
    thumbRef,
    thumbId,
    thumbStyle,
    onKeyDown,
    onFocus,
    onBlur,
    trackId,
    trackRef,
    rootStyle,
    trackStyle,
    innerTrackStyle,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    stepUp,
    stepDown,
    stepTo,
    reset,
    // quick hack to get the remaining props
    htmlProps,
  };
}

export type SliderHookReturn = ReturnType<typeof useSlider>;

export type SliderRootHookProps = {
  onPointerDown?: React.PointerEventHandler;
  onPointerUp?: React.PointerEventHandler;
  onPointerMove?: React.PointerEventHandler;
  style?: React.CSSProperties;
};

export function useSliderRoot(props: SliderRootHookProps) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    isDisabled,
    rootStyle,
  } = useSliderContext();
  return {
    ...props,
    tabIndex: -1,
    "aria-disabled": isDisabled || undefined,
    onPointerDown: compose(props.onPointerDown, onPointerDown),
    onPointerUp: compose(props.onPointerUp, onPointerUp),
    onPointerMove: compose(props.onPointerMove, onPointerMove),
    style: { ...props.style, ...rootStyle },
  };
}

export function useSliderTrack(props: any) {
  const { trackRef, trackId, isDisabled, trackStyle } = useSliderContext();
  return {
    ...props,
    ref: trackRef,
    id: trackId,
    "data-disabled": isDisabled || undefined,
    style: { ...props.style, ...trackStyle },
  };
}

function generateDataAttrs(context: SliderHookReturn) {
  return {
    "data-focused": context.isFocused || undefined,
    "data-dragging": context.isPointerDown || undefined,
    "data-disabled": context.isDisabled || undefined,
    "data-orientation": context.orientation,
  };
}

export function useSliderInnerTrack(props: any) {
  const { innerTrackStyle } = useSliderContext();
  return {
    ...props,
    style: { ...props.style, ...innerTrackStyle },
  };
}

export type SliderThumbHookProps = {
  onKeyDown?: React.KeyboardEventHandler;
  style?: React.CSSProperties;
};

export function useSliderThumb(props: SliderThumbHookProps) {
  const {
    thumbRef,
    isDisabled,
    value,
    valueText,
    min,
    max,
    labelId,
    onKeyDown,
    orientation,
    thumbStyle,
  } = useSliderContext();

  return {
    ...props,
    ref: thumbRef,
    role: "slider",
    tabIndex: 0,
    "aria-valuetext": valueText,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": value,
    "aria-orientation": orientation,
    "aria-disabled": isDisabled || undefined,
    "aria-labelledby": labelId,
    style: { ...props.style, ...thumbStyle },
    onKeyDown: compose(props.onKeyDown, onKeyDown),
  };
}

export type SliderMarkerHookProps = {
  style?: React.CSSProperties;
  value: number;
};

export function useSliderMarker(props: SliderMarkerHookProps) {
  const { min, max, isVertical, value, isDisabled } = useSliderContext();

  const isInRange = !(props.value < min || props.value > max);
  const isHighlighted = value >= props.value;
  const markerPercent = valueToPercent(props.value, min, max);

  const markerStyle: React.CSSProperties = {
    position: "absolute",
    ...(isVertical
      ? { bottom: `${markerPercent}%` }
      : { left: `${markerPercent}%` }),
  };

  return {
    ...props,
    role: "presentation",
    "aria-hidden": true,
    "data-disabled": attr(isDisabled),
    "data-invalid": attr(!isInRange),
    "data-highlighted": attr(isHighlighted),
    style: { ...props.style, ...markerStyle },
  };
}

export function useSliderLabel(props: any) {
  const { thumbRef, labelId, isDisabled } = useSliderContext();

  const onClick = React.useCallback(() => {
    thumbRef.current?.focus();
  }, [thumbRef]);

  return {
    ...props,
    "data-disabled": attr(isDisabled),
    id: labelId,
    onClick,
  };
}
