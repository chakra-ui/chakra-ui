import {
  chakra,
  forwardRef,
  SystemStyleObject,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface InputElementProps extends HTMLChakraProps<"div"> {
  placement?: "left" | "right"
}

const InputElement = forwardRef<InputElementProps, "div">((props, ref) => {
  const { placement = "left", ...rest } = props

  const elementStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    zIndex: 2,
    [placement]: "0",
    width: "var(--chakra-input-group-height)",
    height: "var(--chakra-input-group-height)",
    fontSize: "var(--chakra-input-group-font-size)",
    paddingX: "var(--chakra-input-group-padding-left)",
  }

  return <chakra.div ref={ref} __css={elementStyles} {...rest} />
})

// This is used in `input-group.tsx`
InputElement.id = "InputElement"

if (__DEV__) {
  InputElement.displayName = "InputElement"
}

export const InputLeftElement = forwardRef<InputElementProps, "div">(
  (props, ref) => {
    const { className, ...rest } = props
    const _className = cx("chakra-input__left-element", className)

    return (
      <InputElement
        ref={ref}
        placement="left"
        className={_className}
        {...rest}
      />
    )
  },
)

// This is used in `input-group.tsx`
InputLeftElement.id = "InputLeftElement"

if (__DEV__) {
  InputLeftElement.displayName = "InputLeftElement"
}

export const InputRightElement = forwardRef<InputElementProps, "div">(
  (props, ref) => {
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
  },
)

// This is used in `input-group.tsx`
InputRightElement.id = "InputRightElement"

if (__DEV__) {
  InputRightElement.displayName = "InputRightElement"
}
