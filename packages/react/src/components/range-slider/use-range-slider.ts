"use client"

import {
  mergeRefs,
  useCallbackRef,
  useControllableState,
  usePanEvent,
  useSizes,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import {
  ariaAttr,
  callAllHandlers,
  clampValue,
  dataAttr,
  getOwnerDocument,
  percentToValue,
  roundValueToStep,
  valueToPercent,
} from "@chakra-ui/utils"
import type { PropGetter, RequiredPropGetter } from "@chakra-ui/utils"
import { query, raf } from "@zag-js/dom-utils"
import { useCallback, useId, useMemo, useRef, useState } from "react"
import { PropGetterFn } from "../../styled-system"
import { getIds, getReversed, getStyles, orient } from "../slider/slider-utils"

export interface UseRangeSliderProps {
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
  value?: number[]
  /**
   * The initial value of the slider in uncontrolled mode
   */
  defaultValue?: number[]
  /**
   * Orientation of the slider
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical"
  /**
   * If `true`, the value will be incremented or decremented in reverse.
   * @default false
   */
  reversed?: boolean

  /**
   * Function called when the user starts selecting a new value (by dragging or clicking)
   */
  onChangeStart?(value: number[]): void

  /**
   * Function called when the user is done selecting a new value (by dragging or clicking)
   */
  onChangeEnd?(value: number[]): void

  /**
   * Function called whenever the slider value changes  (by dragging or clicking)
   */
  onChange?(value: number[]): void

  /**
   * The base `id` to use for the slider and its components
   */
  id?: string
  /**
   * The name attribute of the hidden `input` field.
   * This is particularly useful in forms
   */
  name?: string | string[]
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
  "aria-valuetext"?: string[]
  /**
   * The static string to use used for `aria-label`
   * if no visible label is used.
   */
  "aria-label"?: string[]
  /**
   * The static string `aria-labelledby` that points to the
   * ID of the element that serves as label for the slider
   */
  "aria-labelledby"?: string[]
  /**
   * The writing mode
   * @default "ltr"
   */
  direction?: "ltr" | "rtl"
  /**
   * The minimum distance between slider thumbs. Useful for preventing
   * the thumbs from being too close together.
   * @default 0
   */
  minStepsBetweenThumbs?: number
}

export interface RangeSliderState {
  value: number[]
  focused: boolean
  isDragging: boolean
  getThumbPercent: (index: number) => number
  getThumbMinValue: (index: number) => number
  getThumbMaxValue: (index: number) => number
}

export interface RangeSliderActions {
  setValueAtIndex(index: number, val: number): void
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  stepUp(index: number, step?: number): void
  stepDown(index: number, step?: number): void
  reset(): void
}

/**
 * React hook that implements an accessible range slider.
 *
 * It is an alternative to `<input type="range" />`, and returns
 * prop getters for the component parts
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/
 */
export function useRangeSlider(props: UseRangeSliderProps) {
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
    minStepsBetweenThumbs = 0,
  } = props

  const onChangeStart = useCallbackRef(onChangeStartProp)
  const onChangeEnd = useCallbackRef(onChangeEndProp)
  const getAriaValueText = useCallbackRef(getAriaValueTextProp)

  const reversed = getReversed({
    reversed: reversedProp,
    direction,
    orientation,
  })

  const [valueState, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? [25, 75],
    onChange,
  })

  if (!Array.isArray(valueState)) {
    throw new TypeError(
      `[range-slider] You passed an invalid value for \`value\` or \`defaultValue\`, expected \`Array\` but got \`${typeof valueState}\``,
    )
  }

  const [isDragging, setDragging] = useState(false)
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const isInteractive = !(disabled || readOnly)

  const initialValue = useRef(valueState)
  const value = valueState.map((val) => clampValue(val, min, max))

  const spacing = minStepsBetweenThumbs * step
  const valueBounds = getValueBounds(value, min, max, spacing)

  const stateRef = useRef<{
    eventSource: "pointer" | "keyboard" | null
    value: number[]
    valueBounds: Array<{ min: number; max: number }>
  }>({
    eventSource: null,
    value: [],
    valueBounds: [],
  })

  stateRef.current.value = value
  stateRef.current.valueBounds = valueBounds

  const reversedValue = value.map((val) => max - val + min)
  const thumbValues = reversed ? reversedValue : value
  const thumbPercents = thumbValues.map((val) => valueToPercent(val, min, max))

  const isVertical = orientation === "vertical"

  const trackRef = useRef<HTMLElement>(null)
  const controlRef = useRef<HTMLElement>(null)

  const thumbRects = useSizes({
    getNodes() {
      const node = controlRef.current
      const thumbNodes = node?.querySelectorAll<HTMLElement>("[role=slider]")
      return thumbNodes ? Array.from(thumbNodes) : []
    },
  })

  const reactId = useId()
  const uuid = idProp ?? reactId
  const ids = getIds(uuid)

  const getValueFromPointer = useCallback(
    (event: any) => {
      if (!trackRef.current) return
      stateRef.current.eventSource = "pointer"
      const rect = trackRef.current.getBoundingClientRect()
      const { clientX, clientY } = event.touches?.[0] ?? event

      const diff = isVertical ? rect.bottom - clientY : clientX - rect.left
      const length = isVertical ? rect.height : rect.width

      let percent = diff / length
      if (reversed) percent = 1 - percent

      return percentToValue(percent, min, max)
    },
    [isVertical, reversed, max, min],
  )

  const tenSteps = (max - min) / 10
  const oneStep = step || (max - min) / 100

  const actions: RangeSliderActions = useMemo(
    () => ({
      setValueAtIndex(index: number, val: number) {
        if (!isInteractive) return
        const bounds = stateRef.current.valueBounds[index]
        val = parseFloat(roundValueToStep(val, bounds.min, oneStep))
        val = clampValue(val, bounds.min, bounds.max)
        const next = [...stateRef.current.value]
        next[index] = val
        setValue(next)
      },
      setActiveIndex,
      stepUp(index: number, step = oneStep) {
        const valueAtIndex = stateRef.current.value[index]
        const next = reversed ? valueAtIndex - step : valueAtIndex + step
        actions.setValueAtIndex(index, next)
      },
      stepDown(index: number, step = oneStep) {
        const valueAtIndex = stateRef.current.value[index]
        const next = reversed ? valueAtIndex + step : valueAtIndex - step
        actions.setValueAtIndex(index, next)
      },
      reset() {
        setValue(initialValue.current)
      },
    }),
    [oneStep, reversed, setValue, isInteractive],
  )

  /**
   * Keyboard interaction to ensure users can operate
   * the slider using only their keyboard.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = event.key
      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowRight: () => actions.stepUp(activeIndex),
        ArrowUp: () => actions.stepUp(activeIndex),
        ArrowLeft: () => actions.stepDown(activeIndex),
        ArrowDown: () => actions.stepDown(activeIndex),
        PageUp: () => actions.stepUp(activeIndex, tenSteps),
        PageDown: () => actions.stepDown(activeIndex, tenSteps),
        Home: () => {
          const { min: value } = valueBounds[activeIndex]
          actions.setValueAtIndex(activeIndex, value)
        },
        End: () => {
          const { max: value } = valueBounds[activeIndex]
          actions.setValueAtIndex(activeIndex, value)
        },
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        event.stopPropagation()
        action(event)
        stateRef.current.eventSource = "keyboard"
      }
    },
    [actions, activeIndex, tenSteps, valueBounds],
  )

  /**
   * Compute styles for all component parts.
   */
  const { getThumbStyle, controlStyle, trackStyle, innerTrackStyle } = useMemo(
    () =>
      getStyles({
        reversed,
        orientation,
        thumbRects,
        thumbPercents,
      }),
    [reversed, orientation, thumbPercents, thumbRects],
  )

  const focusThumb = useCallback(
    (index?: number) => {
      const idx = index ?? activeIndex
      if (idx !== -1 && focusThumbOnChange) {
        const id = ids.getThumb(idx)
        const doc = getOwnerDocument(controlRef.current)
        const thumb = doc.getElementById(id)
        if (thumb) {
          setTimeout(() => thumb.focus())
        }
      }
    },
    [focusThumbOnChange, activeIndex, ids],
  )

  useUpdateEffect(() => {
    if (stateRef.current.eventSource === "keyboard") {
      onChangeEnd?.(stateRef.current.value)
    }
  }, [value, onChangeEnd])

  const onPanSessionStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const pointValue = getValueFromPointer(event) || 0
    const distances = stateRef.current.value.map((val) =>
      Math.abs(val - pointValue),
    )
    const closest = Math.min(...distances)
    let index = distances.indexOf(closest)

    // check if the clicked thumb is stacked by checking if there are multiple
    // thumbs at the same distance
    const thumbsAtPosition = distances.filter(
      (distance) => distance === closest,
    )
    const isThumbStacked = thumbsAtPosition.length > 1

    // when two thumbs are stacked and the user clicks at a point larger than
    // their values, pick the last thumb with the greatest index
    if (isThumbStacked && pointValue > stateRef.current.value[index]) {
      index = index + thumbsAtPosition.length - 1
    }

    setActiveIndex(index)
    actions.setValueAtIndex(index, pointValue)
    focusThumb(index)
  }

  const onPan = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (activeIndex == -1) return
    const pointValue = getValueFromPointer(event) || 0
    setActiveIndex(activeIndex)
    actions.setValueAtIndex(activeIndex, pointValue)
    focusThumb(activeIndex)
  }

  usePanEvent(controlRef, {
    onPanSessionStart(event) {
      if (!isInteractive) return
      setDragging(true)
      onPanSessionStart(event)
      onChangeStart?.(stateRef.current.value)
    },
    onPanSessionEnd() {
      if (!isInteractive) return
      setDragging(false)
      onChangeEnd?.(stateRef.current.value)
    },
    onPan(event) {
      if (!isInteractive) return
      onPan(event)
    },
  })

  const getRootProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        id: ids.root,
        ref,
        tabIndex: -1,
        "data-focused": dataAttr(focused),
        "data-disabled": dataAttr(disabled),
        "data-orientation": orientation,
      }
    },
    [ids.root, focused, disabled, orientation],
  )

  const getLabelProps: PropGetterFn<"label"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        htmlFor: ids.getInput(0),
        "data-focused": dataAttr(focused),
        "data-disabled": dataAttr(disabled),
        onClick: callAllHandlers(props.onClick, (event) => {
          if (isInteractive) {
            event.preventDefault()
            raf(() => {
              const firstThumb = query(controlRef.current, "[role=slider]")
              firstThumb?.focus({ preventScroll: true })
            })
          }
        }),
      }
    },
    [disabled, focused, ids, isInteractive],
  )

  const getControlProps: PropGetterFn<"div"> = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        id: ids.control,
        ref: mergeRefs(ref, controlRef),
        tabIndex: -1,
        "data-orientation": orientation,
        "data-focused": dataAttr(focused),
        "data-disabled": dataAttr(disabled),
        style: {
          ...props.style,
          ...controlStyle,
        },
      }
    },
    [controlStyle, disabled, focused, ids.control, orientation],
  )

  const getTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref: mergeRefs(ref, trackRef),
        id: ids.track,
        "data-disabled": dataAttr(disabled),
        style: { ...props.style, ...trackStyle },
      }
    },
    [disabled, trackStyle, ids],
  )

  const getInnerTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        id: ids.innerTrack,
        style: {
          ...props.style,
          ...innerTrackStyle,
        },
      }
    },
    [innerTrackStyle, ids],
  )

  const getThumbProps: RequiredPropGetter<{ index: number }> = useCallback(
    (props, ref = null) => {
      const { index, ...rest } = props

      const valueAtIndex = value[index]
      if (valueAtIndex == null) {
        throw new TypeError(
          `[range-slider > thumb] Cannot find value at index \`${index}\`. The \`value\` or \`defaultValue\` length is : ${value.length}`,
        )
      }

      const bounds = valueBounds[index]

      return {
        ...rest,
        ref,
        role: "slider",
        tabIndex: isInteractive ? 0 : undefined,
        id: ids.getThumb(index),
        "data-active": dataAttr(isDragging && activeIndex === index),
        "aria-valuetext":
          getAriaValueText?.(valueAtIndex) ?? ariaValueText?.[index],
        "aria-valuemin": bounds.min,
        "aria-valuemax": bounds.max,
        "aria-valuenow": valueAtIndex,
        "aria-orientation": orientation,
        "aria-disabled": ariaAttr(disabled),
        "aria-readonly": ariaAttr(readOnly),
        "aria-label": ariaLabel?.[index],
        "aria-labelledby": ariaLabel?.[index]
          ? undefined
          : ariaLabelledBy?.[index],
        style: { ...props.style, ...getThumbStyle(index) },
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
        onFocus: callAllHandlers(props.onFocus, () => {
          setFocused(true)
          setActiveIndex(index)
        }),
        onBlur: callAllHandlers(props.onBlur, () => {
          setFocused(false)
          setActiveIndex(-1)
        }),
      }
    },
    [
      ids,
      value,
      valueBounds,
      isInteractive,
      isDragging,
      activeIndex,
      getAriaValueText,
      ariaValueText,
      orientation,
      disabled,
      readOnly,
      ariaLabel,
      ariaLabelledBy,
      getThumbStyle,
      onKeyDown,
      setFocused,
    ],
  )

  const getOutputProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        id: ids.output,
        htmlFor: value.map((v, i) => ids.getThumb(i)).join(" "),
        "aria-live": "off",
      }
    },
    [ids, value],
  )

  const getMarkerProps: RequiredPropGetter<{ value: number }> = useCallback(
    (props, ref = null) => {
      const { value: v, ...rest } = props

      const isInRange = !(v < min || v > max)
      const isHighlighted = v >= value[0] && v <= value[value.length - 1]

      let percent = valueToPercent(v, min, max)
      percent = reversed ? 100 - percent : percent

      const markerStyle: React.CSSProperties = {
        position: "absolute",
        pointerEvents: "none",
        ...orient({
          orientation,
          vertical: { bottom: `${percent}%` },
          horizontal: { left: `${percent}%` },
        }),
      }

      return {
        ...rest,
        ref,
        id: ids.getMarker(props.value),
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
    [disabled, reversed, max, min, orientation, value, ids],
  )

  const getInputProps: RequiredPropGetter<{ index: number }> = useCallback(
    (props, ref = null) => {
      const { index, ...rest } = props
      return {
        ...rest,
        ref,
        id: ids.getInput(index),
        type: "hidden",
        value: value[index],
        name: Array.isArray(name) ? name[index] : `${name}-${index}`,
      }
    },
    [name, value, ids],
  )

  const state: RangeSliderState = {
    value,
    focused,
    isDragging,
    getThumbPercent: (index: number) => thumbPercents[index],
    getThumbMinValue: (index: number) => valueBounds[index].min,
    getThumbMaxValue: (index: number) => valueBounds[index].max,
  }

  return {
    state,
    actions,
    getRootProps,
    getTrackProps,
    getInnerTrackProps,
    getThumbProps,
    getMarkerProps,
    getInputProps,
    getOutputProps,
    getControlProps,
    getLabelProps,
  }
}

export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>

function getValueBounds(
  arr: number[],
  min: number,
  max: number,
  spacing: number,
) {
  return arr.map((v, i) => {
    const _min = i === 0 ? min : arr[i - 1] + spacing
    const _max = i === arr.length - 1 ? max : arr[i + 1] - spacing
    return { min: _min, max: _max }
  })
}
