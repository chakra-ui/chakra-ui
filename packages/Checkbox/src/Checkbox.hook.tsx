import {
  useControllableProp,
  useIsomorphicEffect,
  useMergeRefs,
} from "@chakra-ui/hooks"
import { callAllHandlers, makeDataAttr, createContext } from "@chakra-ui/utils"
import { visuallyHiddenStyle } from "@chakra-ui/visually-hidden"
import * as React from "react"

export interface CheckboxHookProps {
  isChecked?: boolean
  isIndeterminate?: boolean
  isDisabled?: boolean
  isFocusable?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  defaultIsChecked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  value?: string | number
  id?: string
  onBlur?: React.FocusEventHandler
  onFocus?: React.FocusEventHandler
  onKeyDown?: React.KeyboardEventHandler
  onKeyUp?: React.KeyboardEventHandler
}

export function useCheckbox(props: CheckboxHookProps) {
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
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
    ...htmlProps
  } = props

  const [isFocused, setIsFocused] = React.useState(false)
  const [isHovered, setIsHovering] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)

  const ref = React.useRef<HTMLInputElement>(null)

  const [checkedState, setCheckedState] = React.useState(
    Boolean(defaultIsChecked),
  )

  const [isControlled, isChecked] = useControllableProp(
    checkedProp,
    checkedState,
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  useIsomorphicEffect(() => {
    if (!ref.current) return
    ref.current.indeterminate = Boolean(isIndeterminate)
  }, [isIndeterminate])

  const trulyDisabled = isDisabled && !isFocusable

  const handleFocus = React.useCallback(() => setIsFocused(true), [])
  const handleBlur = React.useCallback(() => setIsFocused(false), [])

  const handlePointerEnter = React.useCallback(() => setIsHovering(true), [])
  const handlePointerLeave = React.useCallback(() => setIsHovering(false), [])

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === " ") setIsActive(true)
  }, [])
  const handleKeyUp = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === " ") setIsActive(false)
  }, [])

  const handlePointerDown = React.useCallback(() => setIsActive(true), [])
  const handlePointerUp = React.useCallback(() => setIsActive(false), [])

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
    checkbox: {
      "data-active": makeDataAttr(isActive),
      "data-hover": makeDataAttr(isHovered),
      "data-checked": makeDataAttr(isChecked),
      "data-focus": makeDataAttr(isFocused),
      "data-mixed": makeDataAttr(isIndeterminate),
      "data-disabled": makeDataAttr(isDisabled),
      "data-readonly": makeDataAttr(isReadOnly),
      "aria-hidden": true,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    },
    input: {
      ref,
      type: "checkbox",
      name,
      value,
      id,
      onChange: handleChange,
      onBlur: callAllHandlers(onBlur, handleBlur),
      onFocus: callAllHandlers(onFocus, handleFocus),
      onKeyDown: callAllHandlers(onKeyDown, handleKeyDown),
      onKeyUp: callAllHandlers(onKeyUp, handleKeyUp),
      required: isRequired,
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      "aria-invalid": isInvalid,
      "aria-disabled": isDisabled,
      style: visuallyHiddenStyle,
    },
    htmlProps,
  }
}

export type CheckboxHookReturn = ReturnType<typeof useCheckbox>

const [CheckboxContextProvider, useCheckboxContext] = createContext<
  Omit<CheckboxHookReturn, "htmlProps">
>()

export const useCheckboxState = () => useCheckboxContext()["state"]

////////////////////////////////////////////////////////////////////////////////

type LabelProps = CheckboxHookProps & React.HTMLAttributes<HTMLLabelElement>

export const CheckboxProvider = React.forwardRef(
  (props: LabelProps, ref: React.Ref<HTMLLabelElement>) => {
    const { htmlProps, ...context } = useCheckbox(props)
    return (
      <CheckboxContextProvider value={context}>
        <label ref={ref} {...htmlProps}>
          {props.children}
        </label>
      </CheckboxContextProvider>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////

type InputProps = React.HTMLAttributes<HTMLInputElement>

export const CheckboxInput = React.forwardRef(
  (props: InputProps, forwardedRef: React.Ref<HTMLInputElement>) => {
    const { input } = useCheckboxContext()
    const ref = useMergeRefs(input.ref, forwardedRef)
    return <input {...props} {...input} ref={ref} />
  },
)

////////////////////////////////////////////////////////////////////////////////

interface CustomCheckboxProps {
  onPointerDown?: React.PointerEventHandler
  onPointerUp?: React.PointerEventHandler
  onPointerEnter?: React.PointerEventHandler
  onPointerLeave?: React.PointerEventHandler
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const CustomCheckbox = React.forwardRef(
  (
    {
      onPointerDown,
      onPointerUp,
      onPointerEnter,
      onPointerLeave,
      style,
      ...props
    }: CustomCheckboxProps,
    ref: React.Ref<any>,
  ) => {
    const { checkbox } = useCheckboxContext()
    return (
      <div
        {...props}
        {...checkbox}
        ref={ref}
        style={{ ...style, touchAction: "none" }}
      />
    )
  },
)
