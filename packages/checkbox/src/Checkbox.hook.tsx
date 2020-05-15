import {
  useBooleanState,
  useControllableProp,
  useSafeLayoutEffect,
} from "@chakra-ui/hooks"
import { callAllHandlers, dataAttr, mergeRefs, Dict } from "@chakra-ui/utils"
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

/**
 * useCheckbox
 *
 * React hook that provides all the state and focus management logic
 * for a checkbox.
 *
 * It is consumed by the `Checkbox` component
 *
 * @see Docs https://chakra-ui.com/useCheckbox
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

  const [isFocused, setFocused] = useBooleanState()
  const [isHovered, setHovered] = useBooleanState()
  const [isActive, setActive] = useBooleanState()

  const ref = React.useRef<HTMLInputElement>(null)

  const [checkedState, setCheckedState] = React.useState(!!defaultIsChecked)

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

      onChange?.(event)
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
    if (ref.current) {
      ref.current.indeterminate = Boolean(isIndeterminate)
    }
  }, [isIndeterminate])

  const trulyDisabled = isDisabled && !isFocusable

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === " ") {
        setActive.on()
      }
    },
    [setActive],
  )
  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent) => {
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
      isIndeterminate,
      isDisabled,
      isReadOnly,
      isRequired,
    },
    getCheckboxProps: (props: CustomCheckboxProps = {}) => ({
      ...props,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(isChecked),
      "data-focus": dataAttr(isFocused),
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      "aria-hidden": true,
      onMouseDown: callAllHandlers(props.onMouseDown, setActive.on),
      onMouseUp: callAllHandlers(props.onMouseUp, setActive.off),
      onMouseEnter: callAllHandlers(props.onMouseEnter, setHovered.on),
      onMouseLeave: callAllHandlers(props.onMouseLeave, setHovered.off),
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
    getLabelProps: (props: Dict = {}) => {
      /**
       * Prevent `onBlur` being fired when the checkbox label is touched
       */
      const stop = (event: React.SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()
      }
      return {
        ...props,
        style: { ...props.style, touchAction: "none" },
        onMouseDown: callAllHandlers(props.onMouseDown, stop),
        onTouchStart: callAllHandlers(props.onTouchState, stop),
        "data-disabled": dataAttr(isDisabled),
        " data-checked": dataAttr(isChecked),
        "data-invalid": dataAttr(isInvalid),
      }
    },
    htmlProps,
  }
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>

interface CustomCheckboxProps {
  onMouseDown?: React.MouseEventHandler
  onMouseUp?: React.MouseEventHandler
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  style?: React.CSSProperties
  children?: React.ReactNode
}

interface HiddenInputProps {
  ref?: React.Ref<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
