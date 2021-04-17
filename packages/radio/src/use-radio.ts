import { useBoolean, useControllableProp } from "@chakra-ui/hooks"
import {
  ariaAttr,
  callAllHandlers,
  dataAttr,
  pick,
  warn,
  scheduleMicrotask,
} from "@chakra-ui/utils"
import { mergeRefs, PropGetter } from "@chakra-ui/react-utils"
import { visuallyHiddenStyle } from "@chakra-ui/visually-hidden"
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useRef,
  useState,
} from "react"
import { useFormControl } from "@chakra-ui/form-control"

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
}

export function useRadio(props: UseRadioProps = {}) {
  const {
    defaultIsChecked,
    defaultChecked = defaultIsChecked,
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

  const [isFocused, setFocused] = useBoolean()
  const [isHovered, setHovering] = useBoolean()
  const [isActive, setActive] = useBoolean()

  const ref = useRef<HTMLInputElement>(null)

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

  const inputProps = useFormControl<HTMLInputElement>(props)

  const getInputProps: PropGetter<HTMLInputElement> = useCallback(
    (props = {}, forwardedRef = null) => {
      const ownProps = pick(inputProps, [
        "id",
        "disabled",
        "readOnly",
        "required",
        "aria-invalid",
        "aria-required",
        "aria-readonly",
        "aria-describedby",
        "onFocus",
        "onBlur",
      ])

      /**
       * This is a workaround for React Concurrent Mode issue.
       * @see Issue https://github.com/facebook/react/issues/18591.
       *
       * Remove once it's fixed.
       */
      const focus = () => {
        scheduleMicrotask(() => {
          setFocused.on()
        })
      }

      const trulyDisabled = ownProps.disabled && !isFocusable

      return {
        ...props,
        ...ownProps,
        ref: mergeRefs(forwardedRef, ref),
        type: "radio",
        name,
        value,
        onChange: callAllHandlers(props.onChange, handleChange),
        onBlur: callAllHandlers(ownProps.onBlur, props.onBlur, setFocused.off),
        onFocus: callAllHandlers(ownProps.onFocus, props.onFocus, focus),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
        onKeyUp: callAllHandlers(props.onKeyUp, onKeyUp),
        checked: isChecked,
        disabled: trulyDisabled,
        "aria-disabled": ariaAttr(trulyDisabled),
        style: visuallyHiddenStyle,
      }
    },
    [
      inputProps,
      isFocusable,
      name,
      value,
      handleChange,
      setFocused,
      onKeyDown,
      onKeyUp,
      isChecked,
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
