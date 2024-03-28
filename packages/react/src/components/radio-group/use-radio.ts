"use client"

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
  checked?: boolean
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
  disabled?: boolean
  /**
   * If `true` and `disabled` is true, the radio will remain
   * focusable but not interactive.
   *
   * @default false
   */
  focusable?: boolean
  /**
   * If `true`, the radio will be read-only
   *
   * @default false
   */
  readOnly?: boolean
  /**
   * If `true`, the radio button will be invalid. This also sets `aria-invalid` to `true`.
   *
   * @default false
   */
  invalid?: boolean
  /**
   * If `true`, the radio button will be required. This also sets `aria-required` to `true`.
   *
   * @default false
   */
  required?: boolean
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
  invalid: boolean | undefined
  focused: boolean
  checked: boolean
  active: boolean
  isHovered: boolean
  disabled: boolean | undefined
  readOnly: boolean | undefined
  required: boolean | undefined
}

/**
 * `useRadio` is a custom hook used to provide radio functionality, as well as state and focus management to custom radio components when using it.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-radio
 */
export function useRadio(props: UseRadioProps = {}) {
  const {
    defaultChecked,
    checked: checkedProp,
    focusable,
    disabled: disabledProp,
    readOnly: readOnlyProp,
    required: requiredProp,
    onChange,
    invalid: invalidProp,
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

  const disabled = disabledProp ?? formControl?.disabled
  const readOnly = readOnlyProp ?? formControl?.readOnly
  const required = requiredProp ?? formControl?.required
  const invalid = invalidProp ?? formControl?.invalid

  const [focusVisible, setIsFocusVisible] = useState(false)
  const [focused, setFocused] = useState(false)
  const [isHovered, setHovering] = useState(false)
  const [active, setActive] = useState(false)

  const [checkedState, setChecked] = useState(Boolean(defaultChecked))

  const isControlled = typeof checkedProp !== "undefined"
  const checked = isControlled ? checkedProp : checkedState

  useEffect(() => {
    return trackFocusVisible((value) => setIsFocusVisible(value && focused))
  }, [focused])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault()
        return
      }

      if (!isControlled) {
        setChecked(event.target.checked)
      }

      onChange?.(event)
    },
    [isControlled, disabled, readOnly, onChange],
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

  const getControlProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      "data-active": dataAttr(active),
      "data-hover": dataAttr(isHovered),
      "data-disabled": dataAttr(disabled),
      "data-invalid": dataAttr(invalid),
      "data-checked": dataAttr(checked),
      "data-focus": dataAttr(focused),
      "data-focus-visible": dataAttr(focusVisible),
      "data-readonly": dataAttr(readOnly),
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
      active,
      isHovered,
      disabled,
      invalid,
      checked,
      focused,
      readOnly,
      focusVisible,
    ],
  )

  const { onFocus, onBlur } = formControl ?? {}

  //@ts-ignore
  const getInputProps: PropGetter<{}, InputDOMAttributes> = useCallback(
    (props = {}, ref: React.Ref<any> = null) => {
      const trulyDisabled = disabled && !focusable

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
        checked: checked,
        disabled: trulyDisabled,
        readOnly: readOnly,
        required: required,
        "aria-invalid": ariaAttr(invalid),
        "aria-disabled": ariaAttr(trulyDisabled),
        "aria-required": ariaAttr(required),
        "data-readonly": dataAttr(readOnly),
        "aria-describedby": ariaDescribedBy,
        style: visuallyHiddenStyle,
      }
    },
    [
      disabled,
      focusable,
      id,
      name,
      value,
      handleChange,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      checked,
      readOnly,
      required,
      invalid,
      ariaDescribedBy,
    ],
  )

  const getLabelProps: PropGetter = (props = {}, ref = null) => ({
    ...props,
    ref,
    onMouseDown: callAllHandlers(props.onMouseDown, stopEvent),
    "data-disabled": dataAttr(disabled),
    "data-checked": dataAttr(checked),
    "data-invalid": dataAttr(invalid),
  })

  const getRootProps: PropGetter = (props, ref = null) => ({
    ...props,
    ref,
    "data-disabled": dataAttr(disabled),
    "data-checked": dataAttr(checked),
    "data-invalid": dataAttr(invalid),
  })

  const state: RadioState = {
    invalid,
    focused,
    checked,
    active,
    isHovered,
    disabled,
    readOnly,
    required,
  }

  return {
    state,
    getControlProps,
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
