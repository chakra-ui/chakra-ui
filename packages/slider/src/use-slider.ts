import {
  useBoolean,
  useCallbackRef,
  useControllableState,
  useDimensions,
  useIds,
  useLatestRef,
  usePanGesture,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import { EventKeyMap, mergeRefs, PropGetter } from "@chakra-ui/react-utils"
import {
  AnyPointerEvent,
  ariaAttr,
  callAllHandlers,
  clampValue,
  dataAttr,
  focus,
  getBox,
  normalizeEventKey,
  percentToValue,
  roundValueToStep,
  valueToPercent,
} from "@chakra-ui/utils"
import { CSSProperties, useCallback, useMemo, useRef } from "react"
import { getStyles, getIsReversed } from "./slider-utils"

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
   * Function called when the user starts selecting a new value (by dragging or clicking)
   */
  onChangeStart?(value: number): void
  /**
   * Function called when the user is done selecting a new value (by dragging or clicking)
   */
  onChangeEnd?(value: number): void
  /**
   * Function called whenever the slider value changes  (by dragging or clicking)
   */
  onChange?(value: number): void
  /**
   * The base `id` to use for the slider and its components
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
   * If `true`, the slider will be in `read-only` state
   */
  isReadOnly?: boolean
  /**
   * Function that returns the `aria-valuetext` for screen readers.
   * It is mostly used to generate a more human-readable
   * representation of the value for assistive technologies
   */
  getAriaValueText?(value: number): string
  /**
   * If `false`, the slider handle will not capture focus when value changes.
   * @default true
   */
  focusThumbOnChange?: boolean
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
  direction?: "ltr" | "rtl"
}

/**
 * React hook that implements an accessible range slider.
 *
 * It is an alternative to `<input type="range" />`, and returns
 * prop getters for the component parts
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#slider
 */
export function useSlider(props: UseSliderProps) {
  const {
    min = 0,
    max = 100,
    onChange,
    value: valueProp,
    defaultValue,
    isReversed: isReversedProp,
    direction = "ltr",
    orientation = "horizontal",
    id: idProp,
    isDisabled,
    isReadOnly,
    onChangeStart: onChangeStartProp,
    onChangeEnd: onChangeEndProp,
    step = 1,
    getAriaValueText: getAriaValueTextProp,
    "aria-valuetext": ariaValueText,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    name,
    focusThumbOnChange = true,
    ...htmlProps
  } = props

  const onChangeStart = useCallbackRef(onChangeStartProp)
  const onChangeEnd = useCallbackRef(onChangeEndProp)
  const getAriaValueText = useCallbackRef(getAriaValueTextProp)

  const isReversed = getIsReversed({
    isReversed: isReversedProp,
    direction,
    orientation,
  })

  /**
   * Enable the slider handle controlled and uncontrolled scenarios
   */
  const [computedValue, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? getDefaultValue(min, max),
    onChange,
  })

  const [isDragging, setDragging] = useBoolean()

  const [isFocused, setFocused] = useBoolean()
  const eventSourceRef = useRef<"pointer" | "keyboard" | null>(null)

  const isInteractive = !(isDisabled || isReadOnly)

  /**
   * Constrain the value because it can't be less than min
   * or greater than max
   */
  const value = clampValue(computedValue, min, max)
  const valueRef = useLatestRef(value)

  const prevRef = useRef(valueRef.current)

  const reversedValue = max - value + min
  const trackValue = isReversed ? reversedValue : value
  const thumbPercent = valueToPercent(trackValue, min, max)

  const isVertical = orientation === "vertical"

  /**
   * Let's keep a reference to the slider track and thumb
   */
  const trackRef = useRef<any>(null)
  const thumbRef = useRef<any>(null)
  const rootRef = useRef<any>(null)

  /**
   * Generate unique ids for component parts
   */
  const [thumbId, trackId] = useIds(idProp, `slider-thumb`, `slider-track`)

  /**
   * Get relative value of slider from the event by tracking
   * how far you clicked within the track to determine the value
   *
   * @todo - Refactor this later on to use info from pan session
   */

  const getValueFromPointer = useCallback(
    (event) => {
      if (!trackRef.current) return
      eventSourceRef.current = "pointer"
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
        nextValue = parseFloat(roundValueToStep(nextValue, min, step))
      }

      nextValue = clampValue(nextValue, min, max)

      return nextValue
    },
    [isVertical, isReversed, max, min, step],
  )

  const tenSteps = (max - min) / 10
  const oneStep = step || (max - min) / 100

  const constrain = useCallback(
    (value: number) => {
      if (!isInteractive) return
      value = parseFloat(roundValueToStep(value, min, oneStep))
      value = clampValue(value, min, max)
      setValue(value)
    },
    [oneStep, max, min, setValue, isInteractive],
  )

  const actions = useMemo(
    () => ({
      stepUp: (step = oneStep) => {
        const next = isReversed ? value - step : value + step
        constrain(next)
      },
      stepDown: (step = oneStep) => {
        const next = isReversed ? value + step : value - step
        constrain(next)
      },
      reset: () => constrain(defaultValue || 0),
      stepTo: (value: number) => constrain(value),
    }),
    [constrain, isReversed, value, oneStep, defaultValue],
  )

  /**
   * Keyboard interaction to ensure users can operate
   * the slider using only their keyboard.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = normalizeEventKey(event)
      const keyMap: EventKeyMap = {
        ArrowRight: () => actions.stepUp(),
        ArrowUp: () => actions.stepUp(),
        ArrowLeft: () => actions.stepDown(),
        ArrowDown: () => actions.stepDown(),
        PageUp: () => actions.stepUp(tenSteps),
        PageDown: () => actions.stepDown(tenSteps),
        Home: () => constrain(min),
        End: () => constrain(max),
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        event.stopPropagation()
        action(event)
        eventSourceRef.current = "keyboard"
      }
    },
    [actions, constrain, max, min, tenSteps],
  )

  /**
   * ARIA (Optional): To define a human-readable representation of the value,
   * we allow users pass aria-valuetext.
   */
  const valueText = getAriaValueText?.(value) ?? ariaValueText

  /**
   * Measure the dimensions of the thumb, so
   * we can center it within the track properly
   */
  const thumbBoxModel = useDimensions(thumbRef)

  /**
   * Compute styles for all component parts.
   */
  const { getThumbStyle, rootStyle, trackStyle, innerTrackStyle } =
    useMemo(() => {
      const thumbRect = thumbBoxModel?.borderBox ?? { width: 0, height: 0 }
      return getStyles({
        isReversed,
        orientation,
        thumbRects: [thumbRect],
        thumbPercents: [thumbPercent],
      })
    }, [isReversed, orientation, thumbBoxModel?.borderBox, thumbPercent])

  const focusThumb = useCallback(() => {
    if (thumbRef.current && focusThumbOnChange) {
      setTimeout(() => focus(thumbRef.current))
    }
  }, [focusThumbOnChange])

  useUpdateEffect(() => {
    focusThumb()
    if (eventSourceRef.current === "keyboard") {
      onChangeEnd?.(valueRef.current)
    }
  }, [value, onChangeEnd])

  const setValueFromPointer = (event: AnyPointerEvent) => {
    const nextValue = getValueFromPointer(event)
    if (nextValue != null && nextValue !== valueRef.current) {
      setValue(nextValue)
    }
  }

  usePanGesture(rootRef, {
    onPanSessionStart(event) {
      if (!isInteractive) return
      setDragging.on()
      focusThumb()
      setValueFromPointer(event)
      onChangeStart?.(valueRef.current)
    },
    onPanSessionEnd() {
      if (!isInteractive) return
      setDragging.off()
      onChangeEnd?.(valueRef.current)
      prevRef.current = valueRef.current
    },
    onPan(event) {
      if (!isInteractive) return
      setValueFromPointer(event)
    },
  })

  const getRootProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ...htmlProps,
      ref: mergeRefs(ref, rootRef),
      tabIndex: -1,
      "aria-disabled": ariaAttr(isDisabled),
      "data-focused": dataAttr(isFocused),
      style: {
        ...props.style,
        ...rootStyle,
      },
    }),
    [htmlProps, isDisabled, isFocused, rootStyle],
  )

  const getTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, trackRef),
      id: trackId,
      "data-disabled": dataAttr(isDisabled),
      style: {
        ...props.style,
        ...trackStyle,
      },
    }),
    [isDisabled, trackId, trackStyle],
  )

  const getInnerTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      style: {
        ...props.style,
        ...innerTrackStyle,
      },
    }),
    [innerTrackStyle],
  )

  const getThumbProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, thumbRef),
      role: "slider",
      tabIndex: isInteractive ? 0 : undefined,
      id: thumbId,
      "data-active": dataAttr(isDragging),
      "aria-valuetext": valueText,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-orientation": orientation,
      "aria-disabled": ariaAttr(isDisabled),
      "aria-readonly": ariaAttr(isReadOnly),
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabel ? undefined : ariaLabelledBy,
      style: {
        ...props.style,
        ...getThumbStyle(0),
      },
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onFocus: callAllHandlers(props.onFocus, setFocused.on),
      onBlur: callAllHandlers(props.onBlur, setFocused.off),
    }),
    [
      isInteractive,
      thumbId,
      isDragging,
      valueText,
      min,
      max,
      value,
      orientation,
      isDisabled,
      isReadOnly,
      ariaLabel,
      ariaLabelledBy,
      getThumbStyle,
      onKeyDown,
      setFocused.on,
      setFocused.off,
    ],
  )

  const getMarkerProps: PropGetter<any, { value?: any }> = useCallback(
    (props = {}, ref = null) => {
      const isInRange = !(props.value < min || props.value > max)
      const isHighlighted = value >= props.value
      const markerPercent = valueToPercent(props.value, min, max)

      const markerStyle: React.CSSProperties = {
        position: "absolute",
        pointerEvents: "none",
        ...orient({
          orientation,
          vertical: {
            bottom: isReversed
              ? `${100 - markerPercent}%`
              : `${markerPercent}%`,
          },
          horizontal: {
            left: isReversed ? `${100 - markerPercent}%` : `${markerPercent}%`,
          },
        }),
      }

      return {
        ...props,
        ref,
        role: "presentation",
        "aria-hidden": true,
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(!isInRange),
        "data-highlighted": dataAttr(isHighlighted),
        style: {
          ...props.style,
          ...markerStyle,
        },
      }
    },
    [isDisabled, isReversed, max, min, orientation, value],
  )

  const getInputProps: PropGetter<HTMLInputElement> = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      type: "hidden",
      value,
      name,
    }),
    [name, value],
  )

  return {
    state: {
      value,
      isFocused,
      isDragging,
    },
    actions,
    getRootProps,
    getTrackProps,
    getInnerTrackProps,
    getThumbProps,
    getMarkerProps,
    getInputProps,
  }
}

export type UseSliderReturn = ReturnType<typeof useSlider>

function orient(options: {
  orientation: UseSliderProps["orientation"]
  vertical: CSSProperties
  horizontal: CSSProperties
}) {
  const { orientation, vertical, horizontal } = options
  return orientation === "vertical" ? vertical : horizontal
}

/**
 * The browser <input type="range" /> calculates
 * the default value of a slider by using mid-point
 * between the min and the max.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
 */
function getDefaultValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2
}
