import {
  useBoolean,
  useCallbackRef,
  useControllableState,
  useId,
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
  normalizeEventKey,
  percentToValue,
  roundValueToStep,
  valueToPercent,
} from "@chakra-ui/utils"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getIds, getIsReversed, getStyles, orient } from "./slider-utils"

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
   */
  direction?: "ltr" | "rtl"
  /**
   * The minimum distance between slider thumbs. Useful for preventing
   * the thumbs from being too close together.
   * @default 0
   */
  minStepsBetweenThumbs?: number
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
export function useRangeSlider(props: UseRangeSliderProps) {
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
    minStepsBetweenThumbs = 0,
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

  const [isDragging, setDragging] = useBoolean()
  const [isFocused, setFocused] = useBoolean()
  const [activeIndex, setActiveIndex] = useState(-1)
  const eventSourceRef = useRef<"pointer" | "keyboard" | null>(null)
  const isInteractive = !(isDisabled || isReadOnly)

  const initialValue = useRef(valueState)
  const value = valueState.map((val) => clampValue(val, min, max))
  const valueRef = useLatestRef(value)

  const spacing = minStepsBetweenThumbs * step
  const valueBounds = getValueBounds(value, min, max, spacing)

  const reversedValue = value.map((val) => max - val + min)
  const thumbValues = isReversed ? reversedValue : value

  const thumbPercents = thumbValues.map((val) => valueToPercent(val, min, max))

  const isVertical = orientation === "vertical"

  const [thumbRects, setThumbRects] = useState(
    Array.from({ length: value.length }).map(() => ({ width: 0, height: 0 })),
  )

  useEffect(() => {
    if (!rootRef.current) return

    const thumbs = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>("[role=slider]"),
    )
    const rects = thumbs.map((el) => ({
      width: el.offsetWidth,
      height: el.offsetHeight,
    }))

    if (rects.length) setThumbRects(rects)
  }, [])

  /**
   * Let's keep a reference to the slider track and thumb
   */
  const trackRef = useRef<HTMLElement>(null)
  const rootRef = useRef<HTMLElement>(null)

  const uuid = useId(idProp)
  const ids = getIds(uuid)

  const getValueFromPointer = useCallback(
    (event) => {
      if (!trackRef.current) return
      eventSourceRef.current = "pointer"
      const rect = trackRef.current.getBoundingClientRect()
      const { clientX, clientY } = event.touches?.[0] ?? event

      const diff = isVertical ? rect.bottom - clientY : clientX - rect.left
      const length = isVertical ? rect.height : rect.width

      let percent = diff / length
      if (isReversed) percent = 1 - percent

      return percentToValue(percent, min, max)
    },
    [isVertical, isReversed, max, min],
  )

  const tenSteps = (max - min) / 10
  const oneStep = step || (max - min) / 100

  const actions = useMemo(
    () => ({
      setValueAtIndex: (index: number, val: number) => {
        if (!isInteractive) return
        const bounds = valueBounds[index]
        val = parseFloat(roundValueToStep(val, bounds.min, oneStep))
        val = clampValue(val, bounds.min, bounds.max)
        const next = [...value]
        next[index] = val
        setValue(next)
      },
      setActiveIndex,
      stepUp: (index: number, step = oneStep) => {
        const valueAtIndex = value[index]
        const next = isReversed ? valueAtIndex - step : valueAtIndex + step
        actions.setValueAtIndex(index, next)
      },
      stepDown: (index: number, step = oneStep) => {
        const valueAtIndex = value[index]
        const next = isReversed ? valueAtIndex + step : valueAtIndex - step
        actions.setValueAtIndex(index, next)
      },
      reset: () => setValue(initialValue.current),
    }),
    [oneStep, value, isReversed, setValue, isInteractive, valueBounds],
  )

  /**
   * Keyboard interaction to ensure users can operate
   * the slider using only their keyboard.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = normalizeEventKey(event)
      const keyMap: EventKeyMap = {
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
        eventSourceRef.current = "keyboard"
      }
    },
    [actions, activeIndex, tenSteps, valueBounds],
  )

  /**
   * Compute styles for all component parts.
   */
  const { getThumbStyle, rootStyle, trackStyle, innerTrackStyle } = useMemo(
    () =>
      getStyles({
        isReversed,
        orientation,
        thumbRects,
        thumbPercents,
      }),
    [isReversed, orientation, thumbPercents, thumbRects],
  )

  const focusThumb = useCallback(
    (index?: number) => {
      const idx = index ?? activeIndex
      if (idx !== -1 && focusThumbOnChange) {
        const id = ids.getThumb(idx)
        const thumb = rootRef.current?.ownerDocument.getElementById(id)
        if (thumb) {
          setTimeout(() => focus(thumb))
        }
      }
    },
    [focusThumbOnChange, activeIndex, ids],
  )

  useUpdateEffect(() => {
    if (eventSourceRef.current === "keyboard") {
      onChangeEnd?.(valueRef.current)
    }
  }, [value, onChangeEnd])

  const onPanSessionStart = (event: AnyPointerEvent) => {
    const pointValue = getValueFromPointer(event) || 0
    const distances = value.map((val) => Math.abs(val - pointValue))
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
    if (isThumbStacked && pointValue > value[index]) {
      index = index + thumbsAtPosition.length - 1
    }
    setActiveIndex(index)
    actions.setValueAtIndex(index, pointValue)
    focusThumb(index)
  }

  const onPan = (event: AnyPointerEvent) => {
    if (activeIndex == -1) return
    const pointValue = getValueFromPointer(event) || 0
    setActiveIndex(activeIndex)
    actions.setValueAtIndex(activeIndex, pointValue)
    focusThumb(activeIndex)
  }

  usePanGesture(rootRef, {
    onPanSessionStart(event) {
      if (!isInteractive) return
      setDragging.on()
      onPanSessionStart(event)
      onChangeStart?.(valueRef.current)
    },
    onPanSessionEnd() {
      if (!isInteractive) return
      setDragging.off()
      onChangeEnd?.(valueRef.current)
    },
    onPan(event) {
      if (!isInteractive) return
      onPan(event)
    },
  })

  const getRootProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ...htmlProps,
      id: ids.root,
      ref: mergeRefs(ref, rootRef),
      tabIndex: -1,
      "aria-disabled": ariaAttr(isDisabled),
      "data-focused": dataAttr(isFocused),
      style: { ...props.style, ...rootStyle },
    }),
    [htmlProps, isDisabled, isFocused, rootStyle, ids],
  )

  const getTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, trackRef),
      id: ids.track,
      "data-disabled": dataAttr(isDisabled),
      style: { ...props.style, ...trackStyle },
    }),
    [isDisabled, trackStyle, ids],
  )

  const getInnerTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      id: ids.innerTrack,
      style: { ...props.style, ...innerTrackStyle },
    }),
    [innerTrackStyle, ids],
  )

  const getThumbProps = useCallback(
    (props, ref = null) => {
      const { index, ...rest } = props

      const _value = value[index]
      if (_value == null) {
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
        "aria-valuetext": getAriaValueText?.(_value) ?? ariaValueText?.[index],
        "aria-valuemin": bounds.min,
        "aria-valuemax": bounds.max,
        "aria-valuenow": _value,
        "aria-orientation": orientation,
        "aria-disabled": ariaAttr(isDisabled),
        "aria-readonly": ariaAttr(isReadOnly),
        "aria-label": ariaLabel?.[index],
        "aria-labelledby": ariaLabel?.[index]
          ? undefined
          : ariaLabelledBy?.[index],
        style: { ...props.style, ...getThumbStyle(index) },
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
        onFocus: callAllHandlers(props.onFocus, () => {
          setFocused.on()
          setActiveIndex(index)
        }),
        onBlur: callAllHandlers(props.onBlur, () => {
          setFocused.off()
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
      isDisabled,
      isReadOnly,
      ariaLabel,
      ariaLabelledBy,
      getThumbStyle,
      onKeyDown,
      setFocused,
    ],
  )

  const getOutputProps = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      id: ids.output,
      htmlFor: value.map((v, i) => ids.getThumb(i)).join(" "),
      "aria-live": "off",
    }),
    [ids, value],
  )

  const getMarkerProps: PropGetter<any, { value?: any }> = useCallback(
    (props = {}, ref = null) => {
      const { value: v, ...rest } = props

      const isInRange = !(v < min || v > max)
      const isHighlighted = v >= value[0] && v <= value[value.length - 1]

      let percent = valueToPercent(v, min, max)
      percent = isReversed ? 100 - percent : percent

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
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(!isInRange),
        "data-highlighted": dataAttr(isHighlighted),
        style: {
          ...props.style,
          ...markerStyle,
        },
      }
    },
    [isDisabled, isReversed, max, min, orientation, value, ids],
  )

  const getInputProps = useCallback(
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

  return {
    state: {
      value,
      isFocused,
      isDragging,
      getThumbPercent: (i: number) => thumbPercents[i],
      getThumbMinValue: (i: number) => valueBounds[i].min,
      getThumbMaxValue: (i: number) => valueBounds[i].max,
    },
    actions,
    getRootProps,
    getTrackProps,
    getInnerTrackProps,
    getThumbProps,
    getMarkerProps,
    getInputProps,
    getOutputProps,
  }
}

export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>

const getValueBounds = (
  arr: number[],
  min: number,
  max: number,
  spacing: number,
) =>
  arr.map((v, i) => {
    const _min = i === 0 ? min : arr[i - 1] + spacing
    const _max = i === arr.length - 1 ? max : arr[i + 1] - spacing
    return { min: _min, max: _max }
  })
