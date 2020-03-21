import {
  useBooleanState,
  useDimensions,
  useControllableState,
  useIds,
} from "@chakra-ui/hooks"
import {
  clampValue,
  createOnKeyDown,
  percentToValue,
  roundValueToStep,
  valueToPercent,
  getBox,
  makeDataAttr as attr,
  callAllHandlers,
  mergeRefs,
} from "@chakra-ui/utils"
import * as React from "react"

// http://muffinman.io/aria-progress-range-slider/

export interface SliderHookProps {
  /**
   * The minimum allowed value of the slider. Cannot be greater than max.
   * @default 0
   */
  min?: number
  /**
   * The maximum allowed value of the slider. Cannot be less than min.
   * @default 100
   */
  max?: number
  /**
   * The step in which increments/decrements have to be made
   * @default 1
   */
  step?: number
  /**
   * The value of the slider in controlled mode
   */
  value?: number
  /**
   * The initial value of the slider in uncontrolled mode
   */
  defaultValue?: number
  /**
   * orientation of the slider
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical"
  /**
   * If `true`, the value will be incremented or decremented in reverse.
   */
  isReversed?: boolean
  /**
   * function gets called whenever the user starts dragging the slider handle
   */
  onChangeStart?: (value: number) => void
  /**
   * function gets called whenever the user stops dragging the slider handle.
   */
  onChangeEnd?: (value: number) => void
  /**
   * function gets called whenever the slider handle is being dragged or clicked
   */
  onChange?: (value: number) => void
  /**
   * The base `id` to use for the slider and it's components
   */
  id?: string
  /**
   * The name attribute of the hidden `input` field.
   * This is particularly useful in forms
   */
  name?: string
  /**
   * If `true`, the slider will be disabled
   */
  isDisabled?: boolean
  /**
   * Function that returns the `aria-valuetext` for screen readers.
   * It's mostly used to generate a more human-readable
   * representation of the value for assistive technologies
   */
  getAriaValueText?: (value: number) => string
  /**
   * The static string to use used for `aria-valuetext`
   */
  "aria-valuetext"?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

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
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    name,
    ...htmlProps
  } = props

  const [isPointerDown, setPointerDown] = useBooleanState()
  const [isFocused, setFocused] = useBooleanState()

  const [sliderValue, updateValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? getDefaultValue(min, max),
    onChange,
  })

  // Constrain the value because it can't be less than min
  // or greater than max
  const value = clampValue(sliderValue, min, max)

  const reversedValue = max - value + min
  const trackValue = isReversed ? reversedValue : value
  const trackPercent = valueToPercent(trackValue, min, max)

  const isVertical = orientation === "vertical"

  // Let's keep a reference to the slider track and thumb
  const trackRef = React.useRef<any>()
  const thumbRef = React.useRef<any>()

  const [thumbId, trackId] = useIds(idProp, `slider-thumb`, `slider-track`)

  const getValueFromPointer = React.useCallback(
    (event: React.PointerEvent) => {
      if (!trackRef.current) return

      const trackRect = getBox(trackRef.current).borderBox

      const { clientX, clientY } = event

      const diff = isVertical
        ? trackRect.bottom - clientY
        : clientX - trackRect.left

      const length = isVertical ? trackRect.height : trackRect.width
      let percent = diff / length

      if (isReversed) {
        percent = 1 - percent
      }

      let nextValue = percentToValue(percent, min, max)

      if (step) {
        nextValue = +roundValueToStep(nextValue, step)
      }

      nextValue = clampValue(nextValue, min, max)

      return nextValue
    },
    [isVertical, isReversed, max, min, step],
  )

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault()

      if (isDisabled || !trackRef.current) return

      setPointerDown.on()

      onChangeStart?.(value)

      const nextValue = getValueFromPointer(event)
      trackRef.current.setPointerCapture(event.pointerId)

      if (nextValue && nextValue !== value) {
        updateValue(nextValue)
      }

      thumbRef.current?.focus()
    },
    [
      isDisabled,
      setPointerDown,
      onChangeStart,
      value,
      getValueFromPointer,
      updateValue,
    ],
  )

  const onPointerUp = React.useCallback(
    (event: React.PointerEvent) => {
      setPointerDown.off()
      trackRef.current?.releasePointerCapture(event.pointerId)
      onChangeEnd?.(value)
    },
    [onChangeEnd, setPointerDown, value],
  )

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent) => {
      if (!isPointerDown) return

      const nextValue = getValueFromPointer(event)
      if (nextValue && nextValue !== value) {
        updateValue(nextValue)
      }
    },
    [isPointerDown, updateValue, getValueFromPointer, value],
  )

  const tenSteps = (max - min) / 10
  const keyStep = step || (max - min) / 100

  const constrain = React.useCallback(
    (value: number) => {
      let nextValue = value
      nextValue = +roundValueToStep(nextValue, keyStep)
      nextValue = clampValue(nextValue, min, max)
      updateValue(nextValue)
    },
    [keyStep, max, min, updateValue],
  )

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
  })

  /**
   * ARIA (Optional): To define a human readable representation of the value,
   * we allow users pass aria-valuetext.
   */
  const valueText = getAriaValueText?.(value) ?? ariaValueText

  const thumbBoxModel = useDimensions(thumbRef)
  const thumbRect = thumbBoxModel?.borderBox ?? {
    width: 0,
    height: 0,
  }

  const thumbStyle: React.CSSProperties = {
    position: "absolute",
    userSelect: "none",
    touchAction: "none",
    ...getOrientationValue({
      orientation,
      vertical: {
        bottom: `calc(${trackPercent}% - ${thumbRect.height / 2}px)`,
      },
      horizontal: {
        left: `calc(${trackPercent}% - ${thumbRect.width / 2}px)`,
      },
    }),
  }

  const rootStyle: React.CSSProperties = {
    position: "relative",
    touchAction: "none",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    userSelect: "none",
    ...getOrientationValue({
      orientation,
      vertical: {
        paddingLeft: thumbRect.width / 2,
        paddingRight: thumbRect.width / 2,
      },
      horizontal: {
        paddingTop: thumbRect.height / 2,
        paddingBottom: thumbRect.height / 2,
      },
    }),
  }

  const trackStyle: React.CSSProperties = {
    position: "absolute",
    ...getOrientationValue({
      orientation,
      vertical: {
        left: "50%",
        transform: "translateX(-50%)",
        height: "100%",
      },
      horizontal: {
        top: "50%",
        transform: "translateY(-50%)",
        width: "100%",
      },
    }),
  }

  const innerTrackStyle: React.CSSProperties = {
    ...trackStyle,
    ...getOrientationValue({
      orientation,
      vertical: { height: `${trackPercent}%`, bottom: 0 },
      horizontal: { width: `${trackPercent}%`, left: 0 },
    }),
  }

  // Support for Native slider methods
  const actions = React.useMemo(
    () => ({
      stepUp: () => constrain(value + keyStep),
      stepDown: () => constrain(value - keyStep),
      reset: () => constrain(defaultValue || 0),
      stepTo: (value: number) => constrain(value),
    }),
    [constrain, value, keyStep, defaultValue],
  )

  return {
    state: {
      value,
      isFocused,
      isDragging: isPointerDown,
    },
    actions,
    getRootProps: (props: any = {}) => ({
      ...props,
      tabIndex: -1,
      "aria-disabled": attr(isDisabled),
      "data-focused": attr(isFocused),
      onPointerDown: callAllHandlers(props.onPointerDown, onPointerDown),
      onPointerUp: callAllHandlers(props.onPointerUp, onPointerUp),
      onPointerMove: callAllHandlers(props.onPointerMove, onPointerMove),
      style: { ...props.style, ...rootStyle },
    }),
    getTrackProps: (props: any = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, trackRef),
      id: trackId,
      "data-disabled": attr(isDisabled),
      style: { ...props.style, ...trackStyle },
    }),
    getInnerTrackProps: (props: any = {}) => ({
      ...props,
      style: { ...props.style, ...innerTrackStyle },
    }),
    getThumbProps: (props: any = {}) => ({
      ...props,
      ref: thumbRef,
      role: "slider",
      tabIndex: 0,
      id: thumbId,
      "aria-valuetext": valueText,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-orientation": orientation,
      "aria-disabled": attr(isDisabled),
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabel ? undefined : ariaLabelledBy,
      style: { ...props.style, ...thumbStyle },
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onFocus: callAllHandlers(props.onFocus, setFocused.on),
      onBlur: callAllHandlers(props.onBlur, setFocused.off),
    }),
    getMarkerProps: (props: any) => {
      const isInRange = !(props.value < min || props.value > max)
      const isHighlighted = value >= props.value
      const markerPercent = valueToPercent(props.value, min, max)

      const markerStyle: React.CSSProperties = {
        position: "absolute",
        pointerEvents: "none",
        ...getOrientationValue({
          orientation,
          vertical: { bottom: `${markerPercent}%` },
          horizontal: { left: `${markerPercent}%` },
        }),
      }

      return {
        ...props,
        role: "presentation",
        "aria-hidden": true,
        "data-disabled": attr(isDisabled),
        "data-invalid": attr(!isInRange),
        "data-highlighted": attr(isHighlighted),
        style: { ...props.style, ...markerStyle },
      }
    },
    getInputProps: (props: any = {}) => ({
      ...props,
      type: "hidden",
      value,
      name,
    }),
    // quick hack to get the remaining props
    htmlProps,
  }
}

export type SliderHookReturn = ReturnType<typeof useSlider>

/**
 * Get the value based on orientation
 * @param options
 */
function getOrientationValue<T>(options: {
  orientation: SliderHookProps["orientation"]
  vertical: T
  horizontal: T
}) {
  const { orientation, vertical, horizontal } = options
  return orientation === "vertical" ? vertical : horizontal
}

/**
 * The browser <input type="range" /> calculates
 * the default value of a slider by using mid-point
 * between the min and the max.
 *
 * @param min the minimum value
 * @param max the maximum value
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
 */
function getDefaultValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2
}
