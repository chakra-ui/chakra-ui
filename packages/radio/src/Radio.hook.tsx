import { useBooleanState, useControllableProp } from "@chakra-ui/hooks"
import { attr, callAllHandlers, Dict, mergeRefs } from "@chakra-ui/utils"
import { visuallyHiddenStyle } from "@chakra-ui/visually-hidden"
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react"

/**
 * @todo use the `useTabbable` hook here
 * to manage the isFocusable & isDisabled props
 */
export interface RadioHookProps {
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
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultIsChecked?: boolean
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
   * If `true`, the radio button will be invalid. This sets `aria-invalid` to `true`.
   */
  isInvalid?: boolean
  /**
   * If `true`, the radio button will be invalid. This sets `aria-invalid` to `true`.
   */
  isRequired?: boolean
  /**
   * Function called when checked state of the `input` changes
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export function useRadio(props: RadioHookProps = {}) {
  const {
    defaultIsChecked,
    isChecked: isCheckedProp,
    isFocusable,
    isDisabled,
    isReadOnly,
    isRequired,
    onChange,
    isInvalid,
    name,
    value,
    id,
    ...htmlProps
  } = props

  const [isFocused, setFocused] = useBooleanState()
  const [isHovered, setHovering] = useBooleanState()
  const [isActive, setActive] = useBooleanState()

  const ref = useRef<HTMLInputElement>(null)

  const [isCheckedState, setCheckedState] = useState(Boolean(defaultIsChecked))

  const [isControlled, isChecked] = useControllableProp(
    isCheckedProp,
    isCheckedState,
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly || isDisabled) {
      event.preventDefault()
      return
    }

    if (!isControlled) {
      setCheckedState(event.target.checked)
    }

    onChange?.(event)
  }

  const trulyDisabled = isDisabled && !isFocusable

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        setActive.on()
      }
    },
    [setActive],
  )

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        setActive.off()
      }
    },
    [setActive],
  )

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
    getCheckboxProps: (props: Dict = {}) => ({
      ...props,
      "data-active": attr(isActive),
      "data-hover": attr(isHovered),
      "data-checked": attr(isChecked),
      "data-focus": attr(isFocused),
      "data-readonly": attr(isReadOnly),
      "aria-hidden": true,
      onPointerDown: callAllHandlers(props.onPointerDown, setActive.on),
      onPointerUp: callAllHandlers(props.onPointerUp, setActive.off),
      onPointerEnter: callAllHandlers(props.onPointerEnter, setHovering.on),
      onPointerLeave: callAllHandlers(props.onPointerLeave, setHovering.off),
    }),
    getInputProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, ref),
      type: "radio",
      name,
      value,
      id,
      onChange: callAllHandlers(props.onChange, handleChange),
      onBlur: callAllHandlers(props.onBlur, setFocused.off),
      onFocus: callAllHandlers(props.onFocus, setFocused.on),
      onKeyDown: callAllHandlers(props.onKeyDown, handleKeyDown),
      onKeyUp: callAllHandlers(props.onKeyUp, handleKeyUp),
      "aria-required": attr(isRequired),
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      "aria-invalid": attr(isInvalid),
      "aria-disabled": attr(isDisabled),
      style: visuallyHiddenStyle,
    }),
    htmlProps,
  }
}

export type RadioHookReturn = ReturnType<typeof useRadio>
