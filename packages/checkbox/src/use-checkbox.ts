import {
  useBoolean,
  useCallbackRef,
  useControllableProp,
  useSafeLayoutEffect,
} from "@chakra-ui/hooks"
import { callAllHandlers, dataAttr, PropGetter, warn } from "@chakra-ui/utils"
import { mergeRefs, withFlushSync } from "@chakra-ui/react-utils"
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
   * You'll need to pass `onChange` to update its value (since it is now controlled)
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
   * @deprecated Please use the `defaultChecked` prop, which mirrors default
   * React checkbox behavior.
   */
  defaultIsChecked?: boolean
  /**
   * If `true`, the checkbox will be initially checked.
   */
  defaultChecked?: boolean
  /**
   * The callback invoked when the checked state of the `Checkbox` changes..
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * The callback invoked when the checkbox is blurred (loses focus)
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  /**
   * The callback invoked when the checkbox is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
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
  /**
   * Defines the string that labels the checkbox element.
   */
  "aria-label"?: string
  /**
   * Refers to the `id` of the element that labels the checkbox element.
   */
  "aria-labelledby"?: string
}

/**
 * useCheckbox that provides all the state and focus management logic
 * for a checkbox. It is consumed by the `Checkbox` component
 *
 * @see Docs https://chakra-ui.com/docs/form/checkbox#hooks
 */
export function useCheckbox(props: UseCheckboxProps = {}) {
  const {
    defaultIsChecked,
    defaultChecked = defaultIsChecked,
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
    onBlur,
    onFocus,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...htmlProps
  } = props

  const onChangeProp = useCallbackRef(onChange)
  const onBlurProp = useCallbackRef(onBlur)
  const onFocusProp = useCallbackRef(onFocus)

  const [isFocused, setFocused] = useBoolean()
  const [isHovered, setHovered] = useBoolean()
  const [isActive, setActive] = useBoolean()

  const ref = useRef<HTMLInputElement>(null)

  const [checkedState, setCheckedState] = useState(!!defaultChecked)

  const [isControlled, isChecked] = useControllableProp(
    checkedProp,
    checkedState,
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
        if (isChecked) {
          setCheckedState(event.target.checked)
        } else {
          setCheckedState(isIndeterminate ? true : event.target.checked)
        }
      }

      onChangeProp?.(event)
    },
    [
      isReadOnly,
      isDisabled,
      isChecked,
      isControlled,
      isIndeterminate,
      onChangeProp,
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

  /**
   * Sync state with uncontrolled form libraries like `react-hook-form`.
   *
   * These libraries set the checked value for input fields
   * using their refs. For the checkbox, it sets `ref.current.checked = true | false` directly.
   *
   * This means the `isChecked` state will get out of sync with `ref.current.checked`,
   * even though the input validation with work, the UI will not be up to date.
   *
   * Let's correct that by checking and syncing the state accordingly.
   */
  useSafeLayoutEffect(() => {
    if (!ref.current) return
    const notInSync = ref.current.checked !== isChecked
    if (notInSync) {
      setCheckedState(ref.current.checked)
    }
  }, [ref.current])

  const getCheckboxProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => {
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
    },
    [
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isHovered,
      isIndeterminate,
      isInvalid,
      isReadOnly,
      setActive,
      setHovered.off,
      setHovered.on,
    ],
  )

  const getRootProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => ({
      ...htmlProps,
      ...props,
      ref: forwardedRef,
      "data-disabled": dataAttr(isDisabled),
    }),
    [htmlProps, isDisabled],
  )

  const getInputProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => {
      return {
        ...props,
        ref: mergeRefs(ref, forwardedRef),
        type: "checkbox",
        name,
        value,
        id,
        onChange: callAllHandlers(props.onChange, handleChange),
        onBlur: callAllHandlers(props.onBlur, setFocused.off, onBlurProp),
        onFocus: callAllHandlers(
          props.onFocus,
          withFlushSync(setFocused.on),
          onFocusProp,
        ),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
        onKeyUp: callAllHandlers(props.onKeyUp, onKeyUp),
        required: isRequired,
        checked: isChecked,
        disabled: trulyDisabled,
        readOnly: isReadOnly,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-invalid": isInvalid,
        "aria-disabled": isDisabled,
        style: visuallyHiddenStyle,
      }
    },
    [
      name,
      value,
      id,
      handleChange,
      setFocused,
      onBlurProp,
      onFocusProp,
      onKeyDown,
      onKeyUp,
      isRequired,
      isChecked,
      trulyDisabled,
      isReadOnly,
      ariaLabel,
      ariaLabelledBy,
      isInvalid,
      isDisabled,
    ],
  )

  const getLabelProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      onMouseDown: callAllHandlers(props.onMouseDown, stopEvent),
      onTouchStart: callAllHandlers(props.onTouchStart, stopEvent),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid),
    }),
    [isChecked, isDisabled, isInvalid],
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
    getRootProps,
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
