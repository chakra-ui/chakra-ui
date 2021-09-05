import { useBoolean } from "@chakra-ui/react"

import { useMemo, CSSProperties, useCallback, useRef, useEffect } from "react"
import { PropGetter, mergeRefs } from "@chakra-ui/react-utils"
import {
  ariaAttr,
  dataAttr,
  clampValue,
  normalizeEventKey,
  roundValueToStep,
  callAllHandlers,
  EventKeys,
  focus,
  getBox,
  PanEventInfo,
  percentToValue,
} from "@chakra-ui/utils"
import { usePanGesture } from "@chakra-ui/hooks"
import { getTrackPercent, orient } from "./multi-slider-utils"
import { useMultiSliderContext } from "./multi-slider-context"

export interface UseMultiSliderThumbProps {
  /**
   * Unique key of the thumb in the multi thumb slider.
   */
  thumbKey: number
  /**
   * The minimum allowed value of the slider thumb. Cannot be greater than max.
   * @default 0
   */
  min?: number
  /**
   * The maximum allowed value of the slider thumb. Cannot be less than min.
   * @default 100
   */
  max?: number
  /**
   * The value of the slider in controlled mode
   */
  value?: number
  /**
   * The initial value of the slider in uncontrolled mode
   */
  defaultValue?: number
  /**
   * Function called when the user starts selecting a new value (by dragging or clicking)
   */
  onValueChangeStart?(value: number): void
  /**
   * Function called when the user is done selecting a new value (by dragging or clicking)
   */
  onValueChangeEnd?(value: number): void
  /**
   * Function called whenever the slider value changes  (by dragging or clicking)
   */
  onValueChange?(value: number): void
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
   * Function that returns the `aria-valuetext` for screen readers.
   * It is mostly used to generate a more human-readable
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

export function useMultiSliderThumb(props: UseMultiSliderThumbProps) {
  const {
    thumbKey,
    min: minProp = -Infinity,
    max: maxProp = Infinity,
    onValueChange,
    value: valueProp,
    defaultValue: defaultValueProp,
    id,
    onValueChangeStart,
    onValueChangeEnd,
    getAriaValueText,
    "aria-valuetext": ariaValueText,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    name,
  } = props
  const {
    values,
    setThumbValue,
    trackRef,
    min: minContext,
    max: maxContext,
    step = 1,
    orientation,
    isReversed,
    isDisabled,
    isReadOnly,
  } = useMultiSliderContext()

  const minNeighbor =
    (isReversed ? values[thumbKey + 1] : values[thumbKey - 1]) ?? -Infinity
  const maxNeighbor =
    (isReversed ? values[thumbKey - 1] : values[thumbKey + 1]) ?? Infinity
  const min = Math.max(minProp, minNeighbor, minContext)
  const max = Math.min(maxProp, maxNeighbor, maxContext)

  const defaultValue =
    defaultValueProp ?? getDefaultValue(thumbKey, min, max, step)
  const value = valueProp ?? values[thumbKey] ?? defaultValue
  const setValue = useCallback(
    (value: number) => {
      const next = constrainValue(value, min, max, step)
      setThumbValue(thumbKey, next) // Update value in the global context.
      onValueChange?.(next)
    },
    [min, max, step, setThumbValue, thumbKey, onValueChange],
  )
  useEffect(() => {
    // Update the context thumb value.
    if (values[thumbKey] === undefined) {
      setThumbValue(thumbKey, value)
    }
  }, [setThumbValue, thumbKey, value, values])
  const trackPercent = getTrackPercent(
    value,
    minContext,
    maxContext,
    isReversed,
  )
  const isInteractive = !(isDisabled || isReadOnly)

  /**
   * Keyboard interaction to ensure users can operate
   * the slider using only their keyboard.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = normalizeEventKey(event)
      const nextValueMap = {
        stepUp: isReversed ? value - step : value + step,
        stepUp10: isReversed ? value - 10 * step : value + 10 * step,
        stepDown: isReversed ? value + step : value - step,
        stepDown10: isReversed ? value + 10 * step : value - 10 * step,
        stepStart: min,
        stepEnd: max,
      }
      const keyMap: Partial<Record<EventKeys, number>> = {
        ArrowRight: nextValueMap.stepUp,
        ArrowUp: nextValueMap.stepUp,
        ArrowLeft: nextValueMap.stepDown,
        ArrowDown: nextValueMap.stepDown,
        PageUp: nextValueMap.stepUp10,
        PageDown: nextValueMap.stepDown10,
        Home: nextValueMap.stepStart,
        End: nextValueMap.stepEnd,
      }
      const next = keyMap[eventKey]
      if (next !== undefined) {
        event.preventDefault()
        event.stopPropagation()
        onValueChangeStart?.(next)
        setValue(next)
        onValueChangeEnd?.(next)
      }
    },
    [
      isReversed,
      max,
      min,
      onValueChangeEnd,
      onValueChangeStart,
      setValue,
      step,
      value,
    ],
  )

  const thumbRef = useRef<HTMLElement>(null)
  const [isDragging, setIsDragging] = useBoolean(false)
  const getValueFromPointer = (eventInfo: PanEventInfo) => {
    if (!trackRef.current) return value
    const trackRect = getBox(trackRef.current).borderBox
    const {
      point: { x, y },
    } = eventInfo
    const diff =
      orientation === "vertical" ? y - trackRect.top : x - trackRect.left
    const length =
      orientation === "vertical" ? trackRect.height : trackRect.width
    const percent = diff / length
    const next = percentToValue(
      isReversed ? 1 - percent : percent,
      minContext,
      maxContext,
    )
    return next
  }
  usePanGesture(thumbRef, {
    onPanStart() {
      if (!isInteractive) return
      setIsDragging.on()
      if (thumbRef.current) {
        focus(thumbRef.current)
      }
      onValueChangeStart?.(value)
    },
    onPan(event, info) {
      if (!isInteractive) return
      const next = getValueFromPointer(info)
      setValue(next)
    },
    onPanEnd(event, info) {
      if (!isInteractive) return
      setIsDragging.off()
      const next = getValueFromPointer(info)
      const constrainedNext = constrainValue(next, min, max, step)
      onValueChangeEnd?.(constrainedNext)
      setValue(constrainedNext)
    },
  })

  const thumbStyle: CSSProperties = useMemo(
    () => ({
      position: "absolute",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      touchAction: "none",
      ...orient({
        orientation,
        vertical: {
          top: `${trackPercent}%`,
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
        },
        horizontal: {
          left: `${trackPercent}%`,
          top: `50%`,
          transform: "translateY(-50%) translateX(-50%)",
        },
      }),
    }),
    [orientation, trackPercent],
  )

  const getThumbProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, thumbRef),
      role: "slider",
      tabIndex: isInteractive ? 0 : undefined,
      id,
      "data-active": dataAttr(isDragging),
      "aria-valuetext": getAriaValueText?.(value) ?? ariaValueText,
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
        ...thumbStyle,
      },
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    }),
    [
      ariaLabel,
      ariaLabelledBy,
      ariaValueText,
      getAriaValueText,
      id,
      isDisabled,
      isDragging,
      isInteractive,
      isReadOnly,
      max,
      min,
      onKeyDown,
      orientation,
      thumbStyle,
      value,
    ],
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
    getThumbProps,
    getInputProps,
  }
}

function constrainValue(value: number, min: number, max: number, step: number) {
  return clampValue(parseFloat(roundValueToStep(value, min, step)), min, max)
}

function getDefaultValue(
  thumbKey: number,
  min: number,
  max: number,
  step: number,
) {
  return constrainValue(
    ((max - min) * thumbKey) / (thumbKey + 1) + min,
    min,
    max,
    step,
  )
}
