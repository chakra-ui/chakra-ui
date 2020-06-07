import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { chakra, PropsOf, useComponentStyle } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useInputGroup } from "./input-group"

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

const InputElement = forwardRef<InputElementProps, "div">(function InputElement(
  props,
  ref,
) {
  const { placement = "left", ...rest } = props

  const group = useInputGroup()

  const input = useComponentStyle({
    themeKey: "Input",
    variant: group?.variant,
    size: group?.size,
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

export const InputLeftElement = forwardRef<InputElementProps, "div">(
  function InputLeftElement(props, ref) {
    const { leftElement } = useInputGroup()

    useSafeLayoutEffect(() => {
      leftElement?.mount()
      return () => leftElement?.unmount()
    }, [])

    const _className = cx("chakra-input__left-element", props.className)

    return (
      <InputElement
        ref={ref}
        placement="left"
        {...props}
        className={_className}
      />
    )
  },
)

if (__DEV__) {
  InputLeftElement.displayName = "InputLeftElement"
}

export const InputRightElement = forwardRef<InputElementProps, "div">(
  function InputRightElement(props, ref) {
    const { rightElement } = useInputGroup()

    useSafeLayoutEffect(() => {
      rightElement?.mount()
      return () => rightElement?.unmount()
    }, [])

    const _className = cx("chakra-input__right-element", props.className)

    return (
      <InputElement
        ref={ref}
        placement="right"
        {...props}
        className={_className}
      />
    )
  },
)

if (__DEV__) {
  InputRightElement.displayName = "InputRightElement"
}
