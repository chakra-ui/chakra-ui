import { chakra, SystemStyleObject, GetProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface ControlBoxOptions {
  type?: "checkbox" | "radio"
  _hover?: SystemStyleObject
  _invalid?: SystemStyleObject
  _disabled?: SystemStyleObject
  _focus?: SystemStyleObject
  _checked?: SystemStyleObject
  _child?: SystemStyleObject
  _checkedAndChild?: SystemStyleObject
  _checkedAndDisabled?: SystemStyleObject
  _checkedAndFocus?: SystemStyleObject
  _checkedAndHover?: SystemStyleObject
}

export type IControlBox = ControlBoxOptions

type BaseDivProps = Omit<GetProps<typeof chakra.div>, keyof ControlBoxOptions>

export interface ControlBoxProps extends BaseDivProps, ControlBoxOptions {}

export const ControlBox: React.FC<ControlBoxProps> = (props) => {
  const {
    type = "checkbox",
    _hover,
    _invalid,
    _disabled,
    _focus,
    _checked,
    _child = { opacity: 0 },
    _checkedAndChild = { opacity: 1 },
    _checkedAndDisabled,
    _checkedAndFocus,
    _checkedAndHover,
    children,
    ...rest
  } = props

  const checkedAndDisabled = `input[type=${type}]:checked:disabled + &`,
    checkedAndHover = `input[type=${type}]:checked:hover:not(:disabled) + &`,
    checkedAndFocus = `input[type=${type}]:checked:focus + &`,
    disabled = `input[type=${type}]:disabled + &`,
    focus = `input[type=${type}]:focus + &`,
    hover = `input[type=${type}]:hover:not(:disabled):not(:checked) + &`,
    checked = `input[type=${type}]:checked + &, input[type=${type}][aria-checked=mixed] + &`,
    invalid = `input[type=${type}][aria-invalid=true] + &`,
    child = `& > *`

  return (
    <chakra.div
      {...rest}
      aria-hidden
      __css={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 120ms",
        flexShrink: "0",
        [focus]: _focus,
        [hover]: _hover,
        [disabled]: _disabled,
        [invalid]: _invalid,
        [checkedAndDisabled]: _checkedAndDisabled,
        [checkedAndFocus]: _checkedAndFocus,
        [checkedAndHover]: _checkedAndHover,
        [child]: _child,
        [checked]: {
          ..._checked,
          [child]: _checkedAndChild,
        },
      }}
    >
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  ControlBox.displayName = "ControlBox"
}

export default ControlBox
