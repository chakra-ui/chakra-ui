import {
  InputDOMAttributes,
  PropGetter,
  ariaAttr,
  callAllHandlers,
  dataAttr,
} from "@chakra-ui/utils"
import { trackFocusVisible } from "@zag-js/focus-visible"
import { useCallback, useEffect, useId, useState } from "react"
import { useFieldContext } from "../field"
import { visuallyHiddenStyle } from "../visually-hidden"
import { useRadioGroupContext } from "./radio-group-context"

export interface UseRadioProps {
  /**
   * id assigned to input
   */
  id?: string
  /**
   * The name of the input field in a radio
   * (Useful for form submission).
   */
  name?: string
  /**
   * The value to be used in the radio button.
   * This is the value that will be returned on form submission.
   */
  value?: string
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update its value (since it is now controlled)
   *
   * @default false
   */
  isChecked?: boolean
  /**
   * If `true`, the radio will be initially checked.
   *
   * @default false
   */
  defaultChecked?: boolean
  /**
   * If `true`, the radio will be disabled
   *
   * @default false
   */
  isDisabled?: boolean
  /**
   * If `true` and `isDisabled` is true, the radio will remain
   * focusable but not interactive.
   *
   * @default false
   */
  isFocusable?: boolean
  /**
   * If `true`, the radio will be read-only
   *
   * @default false
   */
  isReadOnly?: boolean
  /**
   * If `true`, the radio button will be invalid. This also sets `aria-invalid` to `true`.
   *
   * @default false
   */
  isInvalid?: boolean
  /**
   * If `true`, the radio button will be required. This also sets `aria-required` to `true`.
   *
   * @default false
   */
  isRequired?: boolean
  /**
   * Function called when checked state of the `input` changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * @internal
   */
  "data-radiogroup"?: any
  /**
   * Refers to the `id` of the element that labels the radio element.
   */
  "aria-describedby"?: string
}

export interface RadioState {
  isInvalid: boolean | undefined
  isFocused: boolean
  isChecked: boolean
  isActive: boolean
  isHovered: boolean
  isDisabled: boolean | undefined
  isReadOnly: boolean | undefined
  isRequired: boolean | undefined
}

/**
 * `useRadio` is a custom hook used to provide radio functionality, as well as state and focus management to custom radio components when using it.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-radio
 */
export function useRadio(props: UseRadioProps = {}) {
  const {
    defaultChecked,
    isChecked: isCheckedProp,
    isFocusable,
    isDisabled: isDisabledProp,
    isReadOnly: isReadOnlyProp,
    isRequired: isRequiredProp,
    onChange,
    isInvalid: isInvalidProp,
    name,
    value,
    id: idProp,
    "data-radiogroup": dataRadioGroup,
    "aria-describedby": ariaDescribedBy,
  } = props

  const uuid = `radio-${useId()}`

  const formControl = useFieldContext()
  const group = useRadioGroupContext()

  const isWithinRadioGroup = !!group || !!dataRadioGroup
  const isWithinFormControl = !!formControl

  let id = isWithinFormControl && !isWithinRadioGroup ? formControl.id : uuid
  id = idProp ?? id

  const isDisabled = isDisabledProp ?? formControl?.isDisabled
  const isReadOnly = isReadOnlyProp ?? formControl?.isReadOnly
  const isRequired = isRequiredProp ?? formControl?.isRequired
  const isInvalid = isInvalidProp ?? formControl?.isInvalid

  const [isFocusVisible, setIsFocusVisible] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [isHovered, setHovering] = useState(false)
  const [isActive, setActive] = useState(false)

  const [isCheckedState, setChecked] = useState(Boolean(defaultChecked))

  const isControlled = typeof isCheckedProp !== "undefined"
  const isChecked = isControlled ? isCheckedProp : isCheckedState

  useEffect(() => {
    return trackFocusVisible(setIsFocusVisible)
  }, [])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault()
        return
      }

      if (!isControlled) {
        setChecked(event.target.checked)
      }

      onChange?.(event)
    },
    [isControlled, isDisabled, isReadOnly, onChange],
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === " ") {
        setActive(true)
      }
    },
    [setActive],
  )

  const onKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === " ") {
        setActive(false)
      }
    },
    [setActive],
  )

  const getRadioProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-checked": dataAttr(isChecked),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocused && isFocusVisible),
      "data-readonly": dataAttr(isReadOnly),
      "aria-hidden": true,
      onMouseDown: callAllHandlers(props.onMouseDown, () => setActive(true)),
      onMouseUp: callAllHandlers(props.onMouseUp, () => setActive(false)),
      onMouseEnter: callAllHandlers(props.onMouseEnter, () =>
        setHovering(true),
      ),
      onMouseLeave: callAllHandlers(props.onMouseLeave, () =>
        setHovering(false),
      ),
    }),
    [
      isActive,
      isHovered,
      isDisabled,
      isInvalid,
      isChecked,
      isFocused,
      isReadOnly,
      isFocusVisible,
    ],
  )

  const { onFocus, onBlur } = formControl ?? {}

  //@ts-ignore
  const getInputProps: PropGetter<{}, InputDOMAttributes> = useCallback(
    (props = {}, ref: React.Ref<any> = null) => {
      const trulyDisabled = isDisabled && !isFocusable

      return {
        ...props,
        id,
        ref,
        type: "radio",
        name,
        value,
        onChange: callAllHandlers(props.onChange, handleChange),
        onBlur: callAllHandlers(onBlur, props.onBlur, () => setFocused(false)),
        onFocus: callAllHandlers(onFocus, props.onFocus, () =>
          setFocused(true),
        ),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
        onKeyUp: callAllHandlers(props.onKeyUp, onKeyUp),
        checked: isChecked,
        disabled: trulyDisabled,
        readOnly: isReadOnly,
        required: isRequired,
        "aria-invalid": ariaAttr(isInvalid),
        "aria-disabled": ariaAttr(trulyDisabled),
        "aria-required": ariaAttr(isRequired),
        "data-readonly": dataAttr(isReadOnly),
        "aria-describedby": ariaDescribedBy,
        style: visuallyHiddenStyle,
      }
    },
    [
      isDisabled,
      isFocusable,
      id,
      name,
      value,
      handleChange,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      isChecked,
      isReadOnly,
      isRequired,
      isInvalid,
      ariaDescribedBy,
    ],
  )

  const getLabelProps: PropGetter = (props = {}, ref = null) => ({
    ...props,
    ref,
    onMouseDown: callAllHandlers(props.onMouseDown, stopEvent),
    "data-disabled": dataAttr(isDisabled),
    "data-checked": dataAttr(isChecked),
    "data-invalid": dataAttr(isInvalid),
  })

  const getRootProps: PropGetter = (props, ref = null) => ({
    ...props,
    ref,
    "data-disabled": dataAttr(isDisabled),
    "data-checked": dataAttr(isChecked),
    "data-invalid": dataAttr(isInvalid),
  })

  const state: RadioState = {
    isInvalid,
    isFocused,
    isChecked,
    isActive,
    isHovered,
    isDisabled,
    isReadOnly,
    isRequired,
  }

  return {
    state,
    getRadioProps,
    getInputProps,
    getLabelProps,
    getRootProps,
  }
}

/**
 * Prevent `onBlur` being fired when the radio label is touched
 */
function stopEvent(event: React.SyntheticEvent) {
  event.preventDefault()
  event.stopPropagation()
}

export type UseRadioReturn = ReturnType<typeof useRadio>
