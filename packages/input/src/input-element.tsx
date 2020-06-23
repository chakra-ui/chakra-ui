import { chakra, PropsOf, useComponentStyle } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type InputElementProps = PropsOf<typeof chakra.div> & {
  placement?: "left" | "right"
}

const StyledElement = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    zIndex: 2,
  },
})

const InputElement = React.forwardRef(function InputElement(
  props: InputElementProps,
  ref: React.Ref<any>,
) {
  const { placement = "left", variant, size, ...rest } = props

  const input = useComponentStyle({
    themeKey: "Input",
    variant,
    size,
  }) as InputElementProps

  const placementProp = { [placement]: "0" }

  return (
    <StyledElement
      width={input?.minHeight}
      height={input?.minHeight}
      fontSize={input?.fontSize}
      paddingX={input?.paddingLeft}
      ref={ref}
      {...placementProp}
      {...rest}
    />
  )
})

if (__DEV__) {
  InputElement.displayName = "InputElement"
}

export const InputLeftElement = React.forwardRef(function InputLeftElement(
  props: InputElementProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const _className = cx("chakra-input__left-element", className)

  return (
    <InputElement ref={ref} placement="left" className={_className} {...rest} />
  )
})

if (__DEV__) {
  InputLeftElement.displayName = "InputLeftElement"
}

export const InputRightElement = React.forwardRef(function InputRightElement(
  props: InputElementProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const _className = cx("chakra-input__right-element", className)

  return (
    <InputElement
      ref={ref}
      placement="right"
      className={_className}
      {...rest}
    />
  )
})

if (__DEV__) {
  InputRightElement.displayName = "InputRightElement"
}
