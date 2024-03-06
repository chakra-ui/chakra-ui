import { useCallbackRef } from "@chakra-ui/hooks/use-callback-ref"
import { mergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { useSafeLayoutEffect } from "@chakra-ui/hooks/use-safe-layout-effect"
import { useUpdateEffect } from "@chakra-ui/hooks/use-update-effect"
import { dataAttr } from "@chakra-ui/utils/attr"
import { callAllHandlers } from "@chakra-ui/utils/call-all"
import type { PropGetter } from "@chakra-ui/utils/prop-types"
import { trackFocusVisible } from "@zag-js/focus-visible"
import { useCallback, useEffect, useRef, useState } from "react"
import { useFieldProps } from "../field"
import { visuallyHiddenStyle } from "../visually-hidden"
import { CheckboxState, UseCheckboxProps } from "./checkbox-types"

/**
 * useCheckbox that provides all the state and focus management logic
 * for a checkbox. It is consumed by the `Checkbox` component
 *
 * @see Docs https://chakra-ui.com/checkbox#hooks
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
 */
export function useCheckbox(props: UseCheckboxProps = {}) {
  const formControlProps = useFieldProps(props)
  const {
    disabled,
    readOnly,
    required,
    invalid,
    id,
    onBlur,
    onFocus,
    "aria-describedby": ariaDescribedBy,
  } = formControlProps

  const {
    defaultChecked,
    checked: checkedProp,
    isFocusable,
    onChange,
    indeterminate,
    name,
    value,
    tabIndex = undefined,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-invalid": ariaInvalid,
  } = props

  const onChangeProp = useCallbackRef(onChange)
  const onBlurProp = useCallbackRef(onBlur)
  const onFocusProp = useCallbackRef(onFocus)

  const [isFocusVisible, setIsFocusVisible] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [isHovered, setHovered] = useState(false)
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    return trackFocusVisible(setIsFocusVisible)
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)
  const [rootIsLabelElement, setRootIsLabelElement] = useState(true)

  const [checkedState, setCheckedState] = useState(!!defaultChecked)

  const isControlled = checkedProp !== undefined
  const checked = isControlled ? checkedProp : checkedState

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault()
        return
      }

      if (!isControlled) {
        if (checked) {
          setCheckedState(event.target.checked)
        } else {
          setCheckedState(indeterminate ? true : event.target.checked)
        }
      }

      onChangeProp?.(event)
    },
    [readOnly, disabled, checked, isControlled, indeterminate, onChangeProp],
  )

  useSafeLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate)
    }
  }, [indeterminate])

  useUpdateEffect(() => {
    if (disabled) {
      setFocused(false)
    }
  }, [disabled, setFocused])

  /**
   * HTMLFormElement.reset() should reset the checkbox state
   */
  useSafeLayoutEffect(() => {
    const el = inputRef.current
    if (!el?.form) return
    const formResetListener = () => {
      setCheckedState(!!defaultChecked)
    }
    el.form.addEventListener("reset", formResetListener)
    return () => el.form?.removeEventListener("reset", formResetListener)
  }, [])

  const trulyDisabled = disabled && !isFocusable

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

  /**
   * Sync state with uncontrolled form libraries like `react-hook-form`.
   *
   * These libraries set the checked value for input fields
   * using their refs. For the checkbox, it sets `ref.current.checked = true | false` directly.
   *
   * This means the `checked` state will get out of sync with `ref.current.checked`,
   * even though the input validation with work, the UI will not be up to date.
   *
   * Let's correct that by checking and syncing the state accordingly.
   */
  useSafeLayoutEffect(() => {
    if (!inputRef.current) return
    const notInSync = inputRef.current.checked !== checked
    if (notInSync) {
      setCheckedState(inputRef.current.checked)
    }
  }, [inputRef.current])

  const getCheckboxProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => {
      const onPressDown = (event: React.MouseEvent) => {
        // On mousedown, the input blurs and returns focus to the `body`,
        // we need to prevent this. Native checkboxes keeps focus on `input`
        if (isFocused) {
          event.preventDefault()
        }
        setActive(true)
      }

      return {
        ...props,
        ref: forwardedRef,
        "data-active": dataAttr(isActive),
        "data-hover": dataAttr(isHovered),
        "data-checked": dataAttr(checked),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocused && isFocusVisible),
        "data-indeterminate": dataAttr(indeterminate),
        "data-disabled": dataAttr(disabled),
        "data-invalid": dataAttr(invalid),
        "data-readonly": dataAttr(readOnly),
        "aria-hidden": true,
        onMouseDown: callAllHandlers(props.onMouseDown, onPressDown),
        onMouseUp: callAllHandlers(props.onMouseUp, () => setActive(false)),
        onMouseEnter: callAllHandlers(props.onMouseEnter, () =>
          setHovered(true),
        ),
        onMouseLeave: callAllHandlers(props.onMouseLeave, () =>
          setHovered(false),
        ),
      }
    },
    [
      isActive,
      checked,
      disabled,
      isFocused,
      isFocusVisible,
      isHovered,
      indeterminate,
      invalid,
      readOnly,
    ],
  )

  const getIndicatorProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(checked),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocused && isFocusVisible),
      "data-indeterminate": dataAttr(indeterminate),
      "data-disabled": dataAttr(disabled),
      "data-invalid": dataAttr(invalid),
      "data-readonly": dataAttr(readOnly),
    }),
    [
      isActive,
      checked,
      disabled,
      isFocused,
      isFocusVisible,
      isHovered,
      indeterminate,
      invalid,
      readOnly,
    ],
  )

  const getRootProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: mergeRefs(forwardedRef, (node: HTMLElement) => {
        if (!node) return
        setRootIsLabelElement(node.tagName === "LABEL")
      }),
      onClick: callAllHandlers(props.onClick, () => {
        /**
         * Accessibility:
         *
         * Ideally, `getRootProps` should be spread unto a `label` element.
         *
         * If the element was changed using the `as` prop or changing
         * the dom node `getRootProps` is spread unto (to a `div` or `span`), we'll trigger
         * click on the input when the element is clicked.
         * @see Issue https://github.com/chakra-ui/chakra-ui/issues/3480
         */
        if (!rootIsLabelElement) {
          inputRef.current?.click()
          requestAnimationFrame(() => {
            inputRef.current?.focus({ preventScroll: true })
          })
        }
      }),
      "data-disabled": dataAttr(disabled),
      "data-checked": dataAttr(checked),
      "data-invalid": dataAttr(invalid),
    }),
    [disabled, checked, invalid, rootIsLabelElement],
  )

  const getInputProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => {
      return {
        ...props,
        ref: mergeRefs(inputRef, forwardedRef),
        type: "checkbox",
        name,
        value,
        id,
        tabIndex,
        onChange: callAllHandlers(props.onChange, handleChange),
        onBlur: callAllHandlers(props.onBlur, onBlurProp, () =>
          setFocused(false),
        ),
        onFocus: callAllHandlers(props.onFocus, onFocusProp, () =>
          setFocused(true),
        ),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
        onKeyUp: callAllHandlers(props.onKeyUp, onKeyUp),
        required,
        checked,
        disabled: trulyDisabled,
        readOnly,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-invalid": ariaInvalid ? Boolean(ariaInvalid) : invalid,
        "aria-describedby": ariaDescribedBy,
        "aria-disabled": disabled,
        style: visuallyHiddenStyle,
      }
    },
    [
      name,
      value,
      id,
      handleChange,
      onBlurProp,
      onFocusProp,
      onKeyDown,
      onKeyUp,
      required,
      checked,
      trulyDisabled,
      readOnly,
      ariaLabel,
      ariaLabelledBy,
      ariaInvalid,
      invalid,
      ariaDescribedBy,
      disabled,
      tabIndex,
    ],
  )

  const getLabelProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      onMouseDown: callAllHandlers(props.onMouseDown, stopEvent),
      "data-disabled": dataAttr(disabled),
      "data-checked": dataAttr(checked),
      "data-invalid": dataAttr(invalid),
    }),
    [checked, disabled, invalid],
  )

  const state: CheckboxState = {
    invalid,
    isFocused,
    checked,
    isActive,
    isHovered,
    indeterminate,
    disabled,
    readOnly,
    required,
  }

  return {
    state,
    getRootProps,
    getCheckboxProps,
    getIndicatorProps,
    getInputProps,
    getLabelProps,
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
