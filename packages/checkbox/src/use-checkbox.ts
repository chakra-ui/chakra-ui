import {
  useBoolean,
  useControllableProp,
  useSafeLayoutEffect,
} from "@chakra-ui/hooks"
import {
  callAllHandlers,
  dataAttr,
  mergeRefs,
  PropGetter,
} from "@chakra-ui/utils"
import { visuallyHiddenStyle } from "@chakra-ui/visually-hidden"
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react"

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
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
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
 * useCheckbox that provides all the state and focus management logic
 * for a checkbox. It is consumed by the `Checkbox` component
 *
 * @see Docs https://chakra-ui.com/components/useCheckbox
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

  const [isFocused, setFocused] = useBoolean()
  const [isHovered, setHovered] = useBoolean()
  const [isActive, setActive] = useBoolean()

  const ref = useRef<HTMLInputElement>(null)

  const [checkedState, setCheckedState] = useState(!!defaultIsChecked)

  const [isControlled, isChecked] = useControllableProp(
    checkedProp,
    checkedState,
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        setActive.on()
      }
    },
    [setActive],
  )

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        setActive.off()
      }
    },
    [setActive],
  )

  const getCheckboxProps: PropGetter = (props = {}, forwardedRef = null) => {
    const onPressDown = (event: React.MouseEvent) => {
      // On mousedown, the input blurs and returns focus to the `body`,
      // we need to prevent this. Native checkboxes keeps focus on `input`
      event.preventDefault()
      setActive.on()
    }

    return {
      ...props,
      ref: forwardedRef,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(isChecked),
      "data-focus": dataAttr(isFocused),
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      "aria-hidden": true,
      onMouseDown: callAllHandlers(props.onMouseDown, onPressDown),
      onMouseUp: callAllHandlers(props.onMouseUp, setActive.off),
      onMouseEnter: callAllHandlers(props.onMouseEnter, setHovered.on),
      onMouseLeave: callAllHandlers(props.onMouseLeave, setHovered.off),
    }
  }

  const getInputProps: PropGetter = (props = {}, forwardedRef = null) => ({
    ...props,
    ref: mergeRefs(ref, forwardedRef),
    type: "checkbox",
    name,
    value,
    id,
    onChange: callAllHandlers(props.onChange, handleChange),
    onBlur: callAllHandlers(props.onBlur, setFocused.off),
    onFocus: callAllHandlers(props.onFocus, setFocused.on),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    onKeyUp: callAllHandlers(props.onKeyUp, onKeyUp),
    required: isRequired,
    checked: isChecked,
    disabled: trulyDisabled,
    readOnly: isReadOnly,
    "aria-invalid": isInvalid,
    "aria-disabled": isDisabled,
    style: visuallyHiddenStyle,
  })

  const getLabelProps: PropGetter = (props = {}, forwardedRef = null) => {
    return {
      ...props,
      ref: forwardedRef,
      onMouseDown: callAllHandlers(props.onMouseDown, stopEvent),
      onTouchStart: callAllHandlers(props.onTouchStart, stopEvent),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid),
    }
  }

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
    getCheckboxProps,
    getInputProps,
    getLabelProps,
    htmlProps,
  }
}

/**
 * Prevent `onBlur` being fired when the checkbox label is touched
 */
function stopEvent(event: React.SyntheticEvent) {
  event.preventDefault()
  event.stopPropagation()
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
