import { chakra, PropsOf, useStyles, forwardRef } from "@chakra-ui/system"
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
  },
})

const InputElement: React.FC<InputElementProps> = forwardRef((props, ref) => {
  const { placement = "left", ...rest } = props

  const styles = useStyles()
  const input: any = styles.field

  const elementStyles = {
    [placement]: "0",
    width: input?.height ?? input?.h,
    height: input?.height ?? input?.h,
    fontSize: input?.fontSize,
    paddingX: input?.paddingLeft ?? input?.pl,
  }

  return <StyledElement ref={ref} __css={elementStyles} {...rest} />
})

//@ts-ignore
InputElement.groupId = "InputElement"

if (__DEV__) {
  InputElement.displayName = "InputElement"
}

export const InputLeftElement: React.FC<InputElementProps> = forwardRef(
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

//@ts-ignore
InputLeftElement.groupId = "InputLeftElement"

if (__DEV__) {
  InputLeftElement.displayName = "InputLeftElement"
}

export const InputRightElement: React.FC<InputElementProps> = forwardRef(
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

//@ts-ignore
InputRightElement.groupId = "InputRightElement"

if (__DEV__) {
  InputRightElement.displayName = "InputRightElement"
}
