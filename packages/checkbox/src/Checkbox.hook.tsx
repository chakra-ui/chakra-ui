import {
  useBooleanState,
  useControllableProp,
  useSafeLayoutEffect,
} from "@chakra-ui/hooks"
import { callAllHandlers, attr, mergeRefs } from "@chakra-ui/utils"
import { visuallyHiddenStyle } from "@chakra-ui/visually-hidden"
import * as React from "react"

export interface UseCheckboxProps {
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the isChecked property.
   */
  isIndeterminate?: boolean
  /**
   * If `true`, the checkbox will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true` and `isDisabled` is passed, the checkbox will
   * remain tabbable but not interactive
   */
  isFocusable?: boolean
  /**
   * If `true`, the checkbox will be readonly
   */
  isReadOnly?: boolean
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   */
  isInvalid?: boolean
  /**
   * If `true`, the checkbox input is marked as required,
   * and `required` attribute will be added
   */
  isRequired?: boolean
  /**
   * If `true`, the checkbox will be initially checked.
   */
  defaultIsChecked?: boolean
  /**
   * The callback invoked when the checked state of the `Checkbox` changes..
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name?: string
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value?: string | number
  /**
   * id assigned to input
   */
  id?: string
}

///////////////////////////////////////////////////////////////////////////

/**
 * useCheckbox
 *
 * React hook that provides all the state and focus management logic
 * for a checkbox.
 *
 * It is consumed by the `Checkbox` component
 */

export function useCheckbox(props: UseCheckboxProps = {}) {
  const {
    defaultIsChecked,
    isChecked: checkedProp,
    isFocusable,
    isDisabled,
    isReadOnly,
    isRequired,
    onChange,
    isIndeterminate,
    isInvalid,
    name,
    value,
    id,
    ...htmlProps
  } = props

  const [isFocused, setFocused] = useBooleanState(false)
  const [isHovered, setHovered] = useBooleanState(false)
  const [isActive, setActive] = useBooleanState(false)

  const ref = React.useRef<HTMLInputElement>(null)

  const [checkedState, setCheckedState] = React.useState(
    Boolean(defaultIsChecked),
  )

  const [isControlled, isChecked] = useControllableProp(
    checkedProp,
    checkedState,
  )

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault()
        return
      }

      if (!isControlled) {
        if (isChecked) {
          setCheckedState(event.target.checked)
        } else {
          setCheckedState(isIndeterminate ? true : event.target.checked)
        }
      }

      if (onChange) {
        onChange(event)
      }
    },
    [
      isReadOnly,
      isDisabled,
      isChecked,
      isControlled,
      isIndeterminate,
      onChange,
    ],
  )

  useSafeLayoutEffect(() => {
    if (!ref.current) return
    ref.current.indeterminate = Boolean(isIndeterminate)
  }, [isIndeterminate])

  const trulyDisabled = isDisabled && !isFocusable

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === " ") setActive.on()
    },
    [setActive],
  )
  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === " ") setActive.off()
    },
    [setActive],
  )

  type CustomCheckboxProps = {
    onPointerDown?: React.PointerEventHandler
    onPointerUp?: React.PointerEventHandler
    onPointerEnter?: React.PointerEventHandler
    onPointerLeave?: React.PointerEventHandler
    style?: React.CSSProperties
    children?: React.ReactNode
  }

  type HiddenInputProps = {
    ref?: React.Ref<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>
    onChange?: React.ChangeEventHandler<HTMLInputElement>
  }

  return {
    // states
    state: {
      isInvalid,
      isFocused,
      isChecked,
      isActive,
      isHovered,
      isIndeterminate,
      isDisabled,
      isReadOnly,
      isRequired,
    },
    // prop getters
    getCheckboxProps: (props: CustomCheckboxProps = {}) => ({
      ...props,
      "data-active": attr(isActive),
      "data-hover": attr(isHovered),
      "data-checked": attr(isChecked),
      "data-focus": attr(isFocused),
      "data-mixed": attr(isIndeterminate),
      "data-disabled": attr(isDisabled),
      "data-readonly": attr(isReadOnly),
      "aria-hidden": true,
      onPointerDown: callAllHandlers(props.onPointerDown, setActive.on),
      onPointerUp: callAllHandlers(props.onPointerUp, setActive.off),
      onPointerEnter: callAllHandlers(props.onPointerEnter, setHovered.on),
      onPointerLeave: callAllHandlers(props.onPointerLeave, setHovered.off),
      style: { touchAction: "none", ...props.style },
    }),
    getInputProps: (props: HiddenInputProps = {}) => ({
      ...props,
      ref: mergeRefs(ref, props.ref),
      type: "checkbox",
      name,
      value,
      id,
      onChange: callAllHandlers(props.onChange, handleChange),
      onBlur: callAllHandlers(props.onBlur, setFocused.off),
      onFocus: callAllHandlers(props.onFocus, setFocused.on),
      onKeyDown: callAllHandlers(props.onKeyDown, handleKeyDown),
      onKeyUp: callAllHandlers(props.onKeyUp, handleKeyUp),
      required: isRequired,
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      "aria-invalid": isInvalid,
      "aria-disabled": isDisabled,
      style: visuallyHiddenStyle,
    }),
    htmlProps,
  }
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
