import { usePanEvent } from "@chakra-ui/react-use-pan-event"
import { useCallbackRef } from "@chakra-ui/react-use-callback-ref"
import { useUpdateEffect } from "@chakra-ui/react-use-update-effect"
import { useControllableState } from "@chakra-ui/react-use-controllable-state"
import { useSize } from "@chakra-ui/react-use-size"
import { mergeRefs } from "@chakra-ui/react-use-merge-refs"
import { useLatestRef } from "@chakra-ui/react-use-latest-ref"
import type { PropGetter, RequiredPropGetter } from "@chakra-ui/react-types"
import {
  clampValue,
  percentToValue,
  roundValueToStep,
  valueToPercent,
} from "@chakra-ui/number-utils"
import { ariaAttr, callAllHandlers, dataAttr } from "@chakra-ui/utils"
import { useCallback, useMemo, useRef, useId, useState } from "react"
import { getIsReversed, getStyles } from "./slider-utils"

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
   * Orientation of the slider
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
   * @default false
   */
  isDisabled?: boolean
  /**
   * If `true`, the slider will be in `read-only` state
   * @default false
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
  /**
   * The writing mode
   * @default "ltr"
   */
  direction?: "ltr" | "rtl"
}

export interface SliderState {
  value: number
  isFocused: boolean
  isDragging: boolean
}

export interface SliderActions {
  stepUp(step?: number): void
  stepDown(step?: number): void
  reset(): void
  stepTo(value: number): void
}

/**
 * React hook that implements an accessible range slider.
 *
 * It is an alternative to `<input type="range" />`, and returns
 * prop getters for the component parts
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/slider/
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

  const [isDragging, setDragging] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const isInteractive = !(isDisabled || isReadOnly)

  const tenSteps = (max - min) / 10
  const oneStep = step || (max - min) / 100

  /**
   * Constrain the value because it can't be less than min
   * or greater than max
   */
  const value = clampValue(computedValue, min, max)
  const reversedValue = max - value + min
  const trackValue = isReversed ? reversedValue : value
  const thumbPercent = valueToPercent(trackValue, min, max)

  const isVertical = orientation === "vertical"

  const stateRef = useLatestRef({
    min,
    max,
    step,
    isDisabled,
    value,
    isInteractive,
    isReversed,
    isVertical,
    eventSource: null as "pointer" | "keyboard" | null,
    focusThumbOnChange,
    orientation,
  })

  /**
   * Let's keep a reference to the slider track and thumb
   */
  const trackRef = useRef<HTMLElement>(null)
  const thumbRef = useRef<HTMLElement>(null)
  const rootRef = useRef<HTMLElement>(null)

  /**
   * Generate unique ids for component parts
   */
  const reactId = useId()
  const uuid = idProp ?? reactId
  const [thumbId, trackId] = [`slider-thumb-${uuid}`, `slider-track-${uuid}`]

  /**
   * Get relative value of slider from the event by tracking
   * how far you clicked within the track to determine the value
   *
   * @todo - Refactor this later on to use info from pan session
   */

  const getValueFromPointer = useCallback(
    (event: any) => {
      if (!trackRef.current) return

      const state = stateRef.current
      state.eventSource = "pointer"

      const trackRect = trackRef.current.getBoundingClientRect()
      const { clientX, clientY } = event.touches?.[0] ?? event

      const diff = isVertical
        ? trackRect.bottom - clientY
        : clientX - trackRect.left

      const length = isVertical ? trackRect.height : trackRect.width
      let percent = diff / length

      if (isReversed) {
        percent = 1 - percent
      }

      let nextValue = percentToValue(percent, state.min, state.max)

      if (state.step) {
        nextValue = parseFloat(
          roundValueToStep(nextValue, state.min, state.step),
        )
      }

      nextValue = clampValue(nextValue, state.min, state.max)

      return nextValue
    },
    [isVertical, isReversed, stateRef],
  )

  const constrain = useCallback(
    (value: number) => {
      const state = stateRef.current
      if (!state.isInteractive) return
      value = parseFloat(roundValueToStep(value, state.min, oneStep))
      value = clampValue(value, state.min, state.max)
      setValue(value)
    },
    [oneStep, setValue, stateRef],
  )

  const actions: SliderActions = useMemo(
    () => ({
      stepUp(step = oneStep) {
        const next = isReversed ? value - step : value + step
        constrain(next)
      },
      stepDown(step = oneStep) {
        const next = isReversed ? value + step : value - step
        constrain(next)
      },
      reset() {
        constrain(defaultValue || 0)
      },
      stepTo(value: number) {
        constrain(value)
      },
    }),
    [constrain, isReversed, value, oneStep, defaultValue],
  )

  /**
   * Keyboard interaction to ensure users can operate
   * the slider using only their keyboard.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const state = stateRef.current

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowRight: () => actions.stepUp(),
        ArrowUp: () => actions.stepUp(),
        ArrowLeft: () => actions.stepDown(),
        ArrowDown: () => actions.stepDown(),
        PageUp: () => actions.stepUp(tenSteps),
        PageDown: () => actions.stepDown(tenSteps),
        Home: () => constrain(state.min),
        End: () => constrain(state.max),
      }

      const action = keyMap[event.key]

      if (action) {
        event.preventDefault()
        event.stopPropagation()
        action(event)
        state.eventSource = "keyboard"
      }
    },
    [actions, constrain, tenSteps, stateRef],
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
  const thumbSize = useSize(thumbRef)

  /**
   * Compute styles for all component parts.
   */
  const { getThumbStyle, rootStyle, trackStyle, innerTrackStyle } =
    useMemo(() => {
      const state = stateRef.current

      const thumbRect = thumbSize ?? { width: 0, height: 0 }
      return getStyles({
        isReversed,
        orientation: state.orientation,
        thumbRects: [thumbRect],
        thumbPercents: [thumbPercent],
      })
    }, [isReversed, thumbSize, thumbPercent, stateRef])

  const focusThumb = useCallback(() => {
    const state = stateRef.current
    if (state.focusThumbOnChange) {
      setTimeout(() => thumbRef.current?.focus())
    }
  }, [stateRef])

  useUpdateEffect(() => {
    const state = stateRef.current
    focusThumb()
    if (state.eventSource === "keyboard") {
      onChangeEnd?.(state.value)
    }
  }, [value, onChangeEnd])

  function setValueFromPointer(event: MouseEvent | TouchEvent | PointerEvent) {
    const nextValue = getValueFromPointer(event)
    if (nextValue != null && nextValue !== stateRef.current.value) {
      setValue(nextValue)
    }
  }

  usePanEvent(rootRef, {
    onPanSessionStart(event) {
      const state = stateRef.current
      if (!state.isInteractive) return
      setDragging(true)
      focusThumb()
      setValueFromPointer(event)
      onChangeStart?.(state.value)
    },
    onPanSessionEnd() {
      const state = stateRef.current
      if (!state.isInteractive) return
      setDragging(false)
      onChangeEnd?.(state.value)
    },
    onPan(event) {
      const state = stateRef.current
      if (!state.isInteractive) return
      setValueFromPointer(event)
    },
  })

  const getRootProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
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
      }
    },
    [htmlProps, isDisabled, isFocused, rootStyle],
  )

  const getTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref: mergeRefs(ref, trackRef),
        id: trackId,
        "data-disabled": dataAttr(isDisabled),
        style: {
          ...props.style,
          ...trackStyle,
        },
      }
    },
    [isDisabled, trackId, trackStyle],
  )

  const getInnerTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        style: {
          ...props.style,
          ...innerTrackStyle,
        },
      }
    },
    [innerTrackStyle],
  )

  const getThumbProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
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
        onFocus: callAllHandlers(props.onFocus, () => setFocused(true)),
        onBlur: callAllHandlers(props.onBlur, () => setFocused(false)),
      }
    },
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
    ],
  )

  const getMarkerProps: RequiredPropGetter<{ value: number }> = useCallback(
    (props, ref = null) => {
      const isInRange = !(props.value < min || props.value > max)
      const isHighlighted = value >= props.value
      const markerPercent = valueToPercent(props.value, min, max)

      const markerStyle: React.CSSProperties = {
        position: "absolute",
        pointerEvents: "none",
        ...orient({
          orientation: orientation,
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

  const getInputProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        type: "hidden",
        value,
        name,
      }
    },
    [name, value],
  )

  const state: SliderState = { value, isFocused, isDragging }

  return {
    state,
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
  vertical: React.CSSProperties
  horizontal: React.CSSProperties
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
