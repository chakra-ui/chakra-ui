import { useControllableProp, useMergeRefs } from "@chakra-ui/hooks"
import {
  callAllHandlers,
  createContext,
  makeDataAttr,
  visuallyHiddenStyle,
  Omit,
} from "@chakra-ui/utils"
import * as React from "react"

export interface RadioProps {
  isChecked?: boolean
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

export function useRadio(props: RadioProps) {
  const {
    defaultIsChecked,
    isChecked: checkedProp,
    isFocusable,
    isDisabled,
    isReadOnly,
    isRequired,
    onChange,
    isInvalid,
    name,
    value,
    id,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
    ...remaining
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
      setCheckedState(event.target.checked)
    }

    if (onChange) {
      onChange(event)
    }
  }

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
      isDisabled,
      isReadOnly,
      isRequired,
    },
    checkbox: {
      "data-active": makeDataAttr(isActive),
      "data-hover": makeDataAttr(isHovered),
      "data-checked": makeDataAttr(isChecked),
      "data-focus": makeDataAttr(isFocused),
      "data-readonly": makeDataAttr(isReadOnly),
      "aria-hidden": true,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    },
    input: {
      ref,
      type: "radio",
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
    remaining,
  }
}

export type UseRadioReturn = ReturnType<typeof useRadio>

const [RadioCtxProvider, useRadioContext] = createContext<
  Omit<UseRadioReturn, "remaining">
>()

export const useRadioState = () => useRadioContext()["state"]

////////////////////////////////////////////////////////////////////////////////

type LabelProps = RadioProps &
  Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange">

export const RadioProvider = React.forwardRef(
  (props: LabelProps, ref: React.Ref<HTMLLabelElement>) => {
    const { remaining, ...context } = useRadio(props)
    return (
      <RadioCtxProvider value={context}>
        <label ref={ref} {...remaining}>
          {props.children}
        </label>
      </RadioCtxProvider>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////

type InputProps = React.HTMLAttributes<HTMLInputElement>

export const RadioInput = React.forwardRef(
  (props: InputProps, forwardedRef: React.Ref<HTMLInputElement>) => {
    const { input } = useRadioContext()
    const ref = useMergeRefs(input.ref, forwardedRef)
    return <input {...props} {...input} ref={ref} />
  },
)

////////////////////////////////////////////////////////////////////////////////

interface CustomRadioProps {
  onPointerDown?: React.PointerEventHandler
  onPointerUp?: React.PointerEventHandler
  onPointerEnter?: React.PointerEventHandler
  onPointerLeave?: React.PointerEventHandler
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const CustomRadio = React.forwardRef(
  (
    {
      onPointerDown,
      onPointerUp,
      onPointerEnter,
      onPointerLeave,
      style,
      ...props
    }: CustomRadioProps,
    ref: React.Ref<any>,
  ) => {
    const { checkbox } = useRadioContext()
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
