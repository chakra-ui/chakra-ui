import {
  useBooleanState,
  useControllableState,
  useDimensions,
  useEventCallback,
  useEventListener,
  useIds,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import {
  ariaAttr,
  callAllHandlers,
  clampValue,
  createOnKeyDown,
  dataAttr,
  merge,
  Dict,
  ensureFocus,
  getBox,
  getOwnerDocument,
  mergeRefs,
  percentToValue,
  roundValueToStep,
  valueToPercent,
} from "@chakra-ui/utils"
import * as React from "react"

export interface UseSliderProps {
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
  onChangeStart?(value: number): void
  /**
   * function gets called whenever the user stops dragging the slider handle.
   */
  onChangeEnd?(value: number): void
  /**
   * function gets called whenever the slider handle is being dragged or clicked
   */
  onChange?(value: number): void
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
  getAriaValueText?(value: number): string
  /**
   * The static string to use used for `aria-valuetext`
   */
  "aria-valuetext"?: string
  /**
   * The static string to use used for `aria-label`
   * if no visible label is used.
   */
  "aria-label"?: string
  /**
   * The static string `aria-labelledby` that points to the
   * ID of the element that serves as label for the slider
   */
  "aria-labelledby"?: string
}

export function useSlider(props: UseSliderProps) {
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

  const [isDragging, setDragging] = useBooleanState()
  const [isFocused, setFocused] = useBooleanState()
  const [source, setSource] = React.useState<"mouse" | "touch" | "keyboard">()

  const [sliderValue, updateValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? getDefaultValue(min, max),
    onChange,
  })

  const mouseDownDetach = React.useRef<Function>()
  const touchstartDetach = React.useRef<Function>()
  const touchendDetach = React.useRef<Function>()
  const mouseupDetach = React.useRef<Function>()
  const touchcancelDetach = React.useRef<Function>()

  // Constrain the value because it can't be less than min
  // or greater than max
  const value = clampValue(sliderValue, min, max)
  const prev = React.useRef<number>()

  const reversedValue = max - value + min
  const trackValue = isReversed ? reversedValue : value
  const trackPercent = valueToPercent(trackValue, min, max)

  const isVertical = orientation === "vertical"

  // Let's keep a reference to the slider track and thumb
  const trackRef = React.useRef<any>(null)
  const thumbRef = React.useRef<any>(null)
  const rootRef = React.useRef<any>(null)

  const [thumbId, trackId] = useIds(idProp, `slider-thumb`, `slider-track`)

  const getValueFromPointer = React.useCallback(
    (event: any) => {
      if (!trackRef.current) return

      const trackRect = getBox(trackRef.current).borderBox

      const { clientX, clientY } = event.touches?.[0] ?? event

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
        nextValue = parseFloat(roundValueToStep(nextValue, step))
      }

      nextValue = clampValue(nextValue, min, max)

      return nextValue
    },
    [isVertical, isReversed, max, min, step],
  )

  const tenSteps = (max - min) / 10
  const stepSize = step || (max - min) / 100

  const constrain = React.useCallback(
    (value: number) => {
      prev.current = value
      value = parseFloat(roundValueToStep(value, stepSize))
      value = clampValue(value, min, max)
      updateValue(value)
    },
    [stepSize, max, min, updateValue],
  )

  const onKeyDown = createOnKeyDown({
    stopPropagation: true,
    onKey: () => setSource("keyboard"),
    keyMap: {
      ArrowRight: () => constrain(value + stepSize),
      ArrowUp: () => constrain(value + stepSize),
      ArrowLeft: () => constrain(value - stepSize),
      ArrowDown: () => constrain(value - stepSize),
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
    outline: 0,
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
      stepUp: () => constrain(value + stepSize),
      stepDown: () => constrain(value - stepSize),
      reset: () => constrain(defaultValue || 0),
      stepTo: (value: number) => constrain(value),
    }),
    [constrain, value, stepSize, defaultValue],
  )

  useUpdateEffect(() => {
    if (thumbRef.current) {
      ensureFocus(thumbRef.current)
    }
  }, [value])

  useUpdateEffect(() => {
    const shouldUpdate =
      !isDragging && source !== "keyboard" && prev.current !== value

    if (shouldUpdate) {
      onChangeEnd?.(value)
    }
  }, [isDragging, onChangeEnd, value, source])

  const onMouseDown = useEventCallback((event: MouseEvent) => {
    // prevent update if it's right-click
    if (event.button != 0) return

    if (isDisabled || !rootRef.current) return
    setDragging.on()
    prev.current = value
    onChangeStart?.(value)

    const doc = getOwnerDocument(rootRef.current)

    const run = (event: MouseEvent) => {
      const nextValue = getValueFromPointer(event)

      if (nextValue && nextValue !== value) {
        setSource("mouse")
        updateValue(nextValue)
      }
    }

    run(event)

    doc.addEventListener("mousemove", run)

    const clean = () => {
      doc.removeEventListener("mousemove", run)
      setDragging.off()
    }

    doc.addEventListener("mouseup", clean)
    mouseupDetach.current = () => {
      doc.removeEventListener("mouseup", clean)
    }
  })

  const onTouchStart = useEventCallback((event: TouchEvent) => {
    if (isDisabled || !rootRef.current) return

    // Prevent scrolling for touch events
    event.preventDefault()

    setDragging.on()
    prev.current = value
    onChangeStart?.(value)

    const doc = getOwnerDocument(rootRef.current)

    const run = (event: TouchEvent) => {
      const nextValue = getValueFromPointer(event)

      if (nextValue && nextValue !== value) {
        setSource("touch")
        updateValue(nextValue)
      }
    }

    run(event)

    doc.addEventListener("touchmove", run)

    const clean = () => {
      doc.removeEventListener("touchmove", run)
      setDragging.off()
    }

    doc.addEventListener("touchend", clean)
    doc.addEventListener("touchcancel", clean)

    touchendDetach.current = () => doc.removeEventListener("touchend", clean)
    touchcancelDetach.current = () => {
      doc.removeEventListener("touchcancel", clean)
    }
  })

  useUpdateEffect(() => {
    if (!isDragging) {
      mouseDownDetach.current?.()
      touchstartDetach.current?.()
      touchendDetach.current?.()
      touchcancelDetach.current?.()
      mouseupDetach.current?.()
    }
  }, [isDragging])

  mouseDownDetach.current = useEventListener(
    "mousedown",
    onMouseDown,
    rootRef.current,
  )
  touchstartDetach.current = useEventListener(
    "touchstart",
    onTouchStart,
    rootRef.current,
  )

  return {
    state: {
      value,
      isFocused,
      isDragging: isDragging,
    },
    actions,
    getRootProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, rootRef),
      tabIndex: -1,
      "aria-disabled": ariaAttr(isDisabled),
      "data-focused": dataAttr(isFocused),
      style: merge(props.style, rootStyle),
    }),
    getTrackProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, trackRef),
      id: trackId,
      "data-disabled": dataAttr(isDisabled),
      style: merge(props.style, trackStyle),
    }),
    getInnerTrackProps: (props: Dict = {}) => ({
      ...props,
      style: merge(props.style, innerTrackStyle),
    }),
    getThumbProps: (props: Dict = {}) => ({
      ...props,
      ref: thumbRef,
      role: "slider",
      tabIndex: 0,
      id: thumbId,
      "data-active": dataAttr(isDragging),
      "aria-valuetext": valueText,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-orientation": orientation,
      "aria-disabled": ariaAttr(isDisabled),
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabel ? undefined : ariaLabelledBy,
      style: merge(props.style, thumbStyle),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onFocus: callAllHandlers(props.onFocus, setFocused.on),
      onBlur: callAllHandlers(props.onBlur, setFocused.off),
    }),
    getMarkerProps: (props: Dict) => {
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
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(!isInRange),
        "data-highlighted": dataAttr(isHighlighted),
        style: merge(props.style, markerStyle),
      }
    },
    getInputProps: (props: Dict = {}) => ({
      ...props,
      type: "hidden",
      value,
      name,
    }),
    // quick hack to get the remaining props
    htmlProps,
  }
}

export type UseSliderReturn = ReturnType<typeof useSlider>

/**
 * Get the value based on orientation
 * @param options
 */
function getOrientationValue<T>(options: {
  orientation: UseSliderProps["orientation"]
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
