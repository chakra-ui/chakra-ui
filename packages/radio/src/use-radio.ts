import { useFormControlContext } from "@chakra-ui/form-control"
import { useBoolean, useControllableProp, useId } from "@chakra-ui/hooks"
import { PropGetter } from "@chakra-ui/react-utils"
import { ariaAttr, callAllHandlers, dataAttr, warn } from "@chakra-ui/utils"
import { visuallyHiddenStyle } from "@chakra-ui/visually-hidden"
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react"
import { useRadioGroupContext } from "./radio-group"

/**
 * @todo use the `useClickable` hook here
 * to manage the isFocusable & isDisabled props
 */
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
  value?: string | number
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update its value (since it is now controlled)
   */
  isChecked?: boolean
  /**
   * If `true`, the radio will be initially checked.
   *
   * @deprecated Please use `defaultChecked` which mirrors the default prop
   * name for radio elements.
   */
  defaultIsChecked?: boolean
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultChecked?: boolean
  /**
   * If `true`, the radio will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true` and `isDisabled` is true, the radio will remain
   * focusable but not interactive.
   */
  isFocusable?: boolean
  /**
   * If `true`, the radio will be read-only
   */
  isReadOnly?: boolean
  /**
   * If `true`, the radio button will be invalid. This also sets `aria-invalid` to `true`.
   */
  isInvalid?: boolean
  /**
   * If `true`, the radio button will be required. This also sets `aria-required` to `true`.
   */
  isRequired?: boolean
  /**
   * Function called when checked state of the `input` changes
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /**
   * @internal
   */
  "data-radiogroup"?: any
}

export function useRadio(props: UseRadioProps = {}) {
  const {
    defaultIsChecked,
    defaultChecked = defaultIsChecked,
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
    ...htmlProps
  } = props

  const uuid = useId(undefined, "radio")

  const formControl = useFormControlContext()
  const group = useRadioGroupContext()

  const isWithinRadioGroup = !!group || !!dataRadioGroup
  const isWithinFormControl = !!formControl

  let id = isWithinFormControl && !isWithinRadioGroup ? formControl.id : uuid
  id = idProp ?? id

  const isDisabled = isDisabledProp ?? formControl?.isDisabled
  const isReadOnly = isReadOnlyProp ?? formControl?.isReadOnly
  const isRequired = isRequiredProp ?? formControl?.isRequired
  const isInvalid = isInvalidProp ?? formControl?.isInvalid

  const [isFocused, setFocused] = useBoolean()
  const [isHovered, setHovering] = useBoolean()
  const [isActive, setActive] = useBoolean()

  const [isCheckedState, setChecked] = useState(Boolean(defaultChecked))

  const [isControlled, isChecked] = useControllableProp(
    isCheckedProp,
    isCheckedState,
  )

  warn({
    condition: !!defaultIsChecked,
    message:
      'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. ' +
      'Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.',
  })

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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
        setActive.on()
      }
    },
    [setActive],
  )

  const onKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === " ") {
        setActive.off()
      }
    },
    [setActive],
  )

  const getCheckboxProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-checked": dataAttr(isChecked),
      "data-focus": dataAttr(isFocused),
      "data-readonly": dataAttr(isReadOnly),
      "aria-hidden": true,
      onMouseDown: callAllHandlers(props.onMouseDown, setActive.on),
      onMouseUp: callAllHandlers(props.onMouseUp, setActive.off),
      onMouseEnter: callAllHandlers(props.onMouseEnter, setHovering.on),
      onMouseLeave: callAllHandlers(props.onMouseLeave, setHovering.off),
    }),
    [
      isActive,
      isHovered,
      isDisabled,
      isInvalid,
      isChecked,
      isFocused,
      isReadOnly,
      setActive.on,
      setActive.off,
      setHovering.on,
      setHovering.off,
    ],
  )

  const { onFocus, onBlur } = formControl ?? {}

  const getInputProps: PropGetter<HTMLInputElement> = useCallback(
    (props = {}, ref = null) => {
      const trulyDisabled = isDisabled && !isFocusable

      return {
        ...props,
        id,
        ref,
        type: "radio",
        name,
        value,
        onChange: callAllHandlers(props.onChange, handleChange),
        onBlur: callAllHandlers(onBlur, props.onBlur, setFocused.off),
        onFocus: callAllHandlers(onFocus, props.onFocus, setFocused.on),
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
      setFocused,
      onFocus,
      onKeyDown,
      onKeyUp,
      isChecked,
      isReadOnly,
      isRequired,
      isInvalid,
    ],
  )

  const getLabelProps: PropGetter = (props = {}, ref = null) => ({
    ...props,
    ref,
    onMouseDown: callAllHandlers(props.onMouseDown, stop),
    onTouchStart: callAllHandlers(props.onTouchStart, stop),
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

  return {
    state: {
      isInvalid,
      isFocused,
      isChecked,
      isActive,
      isHovered,
      isDisabled,
      isReadOnly,
      isRequired,
    },
    getCheckboxProps,
    getInputProps,
    getLabelProps,
    getRootProps,
    htmlProps,
  }
}

/**
 * Prevent `onBlur` being fired when the checkbox label is touched
 */
function stop(event: SyntheticEvent) {
  event.preventDefault()
  event.stopPropagation()
}

export type UseRadioReturn = ReturnType<typeof useRadio>
