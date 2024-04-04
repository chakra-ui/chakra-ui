"use client"

import {
  mergeRefs,
  useCallbackRef,
  useControllableState,
  useLatestRef,
  usePanEvent,
  useSize,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import {
  ariaAttr,
  callAllHandlers,
  clampValue,
  dataAttr,
  percentToValue,
  roundValueToStep,
  valueToPercent,
} from "@chakra-ui/utils"
import { useCallback, useId, useMemo, useRef, useState } from "react"
import { PropGetterFn } from "../../styled-system/factory.types"
import { getReversed, getStyles } from "./slider-utils"

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
  reversed?: boolean
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
  disabled?: boolean
  /**
   * If `true`, the slider will be in `read-only` state
   * @default false
   */
  readOnly?: boolean
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
  focused: boolean
  dragging: boolean
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
    reversed: reversedProp,
    direction = "ltr",
    orientation = "horizontal",
    id: idProp,
    disabled,
    readOnly,
    onChangeStart: onChangeStartProp,
    onChangeEnd: onChangeEndProp,
    step = 1,
    getAriaValueText: getAriaValueTextProp,
    "aria-valuetext": ariaValueText,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    name,
    focusThumbOnChange = true,
  } = props

  const onChangeStart = useCallbackRef(onChangeStartProp)
  const onChangeEnd = useCallbackRef(onChangeEndProp)
  const getAriaValueText = useCallbackRef(getAriaValueTextProp)

  const reversed = getReversed({
    reversed: reversedProp,
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

  const [dragging, setDragging] = useState(false)
  const [focused, setFocused] = useState(false)
  const isInteractive = !(disabled || readOnly)

  const tenSteps = (max - min) / 10
  const oneStep = step || (max - min) / 100

  /**
   * Constrain the value because it can't be less than min
   * or greater than max
   */
  const value = clampValue(computedValue, min, max)
  const reversedValue = max - value + min
  const trackValue = reversed ? reversedValue : value
  const thumbPercent = valueToPercent(trackValue, min, max)

  const isVertical = orientation === "vertical"

  const stateRef = useLatestRef({
    min,
    max,
    step,
    disabled,
    value,
    isInteractive,
    reversed,
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
  const controlRef = useRef<HTMLElement>(null)

  /**
   * Generate unique ids for component parts
   */
  const reactId = useId()
  const uuid = idProp ?? reactId
  const [thumbId, trackId, inputId] = [
    `slider-thumb-${uuid}`,
    `slider-track-${uuid}`,
    `slider-input-${uuid}`,
  ]

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

      if (reversed) {
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
    [isVertical, reversed, stateRef],
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
        const next = reversed ? value - step : value + step
        constrain(next)
      },
      stepDown(step = oneStep) {
        const next = reversed ? value + step : value - step
        constrain(next)
      },
      reset() {
        constrain(defaultValue || 0)
      },
      stepTo(value: number) {
        constrain(value)
      },
    }),
    [constrain, reversed, value, oneStep, defaultValue],
  )

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
  const { getThumbStyle, controlStyle, trackStyle, innerTrackStyle } =
    useMemo(() => {
      const state = stateRef.current

      const thumbRect = thumbSize ?? { width: 0, height: 0 }
      return getStyles({
        reversed,
        orientation: state.orientation,
        thumbRects: [thumbRect],
        thumbPercents: [thumbPercent],
      })
    }, [reversed, thumbSize, thumbPercent, stateRef])

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

  usePanEvent(controlRef, {
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

  const getRootProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        "aria-disabled": ariaAttr(disabled),
        "data-focused": dataAttr(focused),
        "data-disabled": dataAttr(disabled),
      }
    },
    [disabled, focused],
  )

  const getLabelProps: PropGetterFn<"label"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        htmlFor: inputId,
        "data-focused": dataAttr(focused),
        "data-disabled": dataAttr(disabled),
        onClick: callAllHandlers(props.onClick, (event) => {
          if (isInteractive) {
            event.preventDefault()
            thumbRef.current?.focus()
          }
        }),
      }
    },
    [disabled, focused, isInteractive, inputId],
  )

  const getControlProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref: mergeRefs(ref, controlRef),
        tabIndex: -1,
        "data-focused": dataAttr(focused),
        "data-disabled": dataAttr(disabled),
        style: {
          ...props.style,
          ...controlStyle,
        },
      }
    },
    [controlStyle, disabled, focused],
  )

  const getTrackProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref: mergeRefs(ref, trackRef),
        id: trackId,
        "data-focused": dataAttr(focused),
        "data-disabled": dataAttr(disabled),
        style: {
          ...props.style,
          ...trackStyle,
        },
      }
    },
    [disabled, focused, trackId, trackStyle],
  )

  const getInnerTrackProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        "data-focused": dataAttr(focused),
        "data-disabled": dataAttr(disabled),
        style: {
          ...props.style,
          ...innerTrackStyle,
        },
      }
    },
    [innerTrackStyle, disabled, focused],
  )

  const getThumbProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref: mergeRefs(ref, thumbRef),
        role: "slider",
        tabIndex: isInteractive ? 0 : undefined,
        id: thumbId,
        "data-active": dataAttr(dragging),
        "data-disabled": dataAttr(disabled),
        "data-focused": dataAttr(focused),
        "aria-valuetext": valueText,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": value,
        "aria-orientation": orientation,
        "aria-disabled": ariaAttr(disabled),
        "aria-readonly": ariaAttr(readOnly),
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
      dragging,
      disabled,
      focused,
      valueText,
      min,
      max,
      value,
      orientation,
      readOnly,
      ariaLabel,
      ariaLabelledBy,
      getThumbStyle,
      onKeyDown,
    ],
  )

  const getMarkerProps: PropGetterFn<"div", { value: number }> = useCallback(
    (props = { value: 0 }, ref = null) => {
      const isInRange = !(props.value < min || props.value > max)
      const isHighlighted = value >= props.value
      const markerPercent = valueToPercent(props.value, min, max)

      const markerStyle: React.CSSProperties = {
        position: "absolute",
        pointerEvents: "none",
        ...orient({
          orientation: orientation,
          vertical: {
            bottom: reversed ? `${100 - markerPercent}%` : `${markerPercent}%`,
          },
          horizontal: {
            left: reversed ? `${100 - markerPercent}%` : `${markerPercent}%`,
          },
        }),
      }

      return {
        ...props,
        ref,
        role: "presentation",
        "aria-hidden": true,
        "data-disabled": dataAttr(disabled),
        "data-invalid": dataAttr(!isInRange),
        "data-highlighted": dataAttr(isHighlighted),
        style: {
          ...props.style,
          ...markerStyle,
        },
      }
    },
    [disabled, reversed, max, min, orientation, value],
  )

  const getInputProps: PropGetterFn<"input"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        id: inputId,
        ref,
        type: "hidden",
        value,
        name,
      }
    },
    [name, value, inputId],
  )

  const state: SliderState = {
    value,
    focused,
    dragging,
  }

  return {
    state,
    actions,
    getRootProps,
    getControlProps,
    getTrackProps,
    getInnerTrackProps,
    getThumbProps,
    getMarkerProps,
    getInputProps,
    getLabelProps,
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
