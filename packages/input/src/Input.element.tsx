import * as React from "react"
import { forwardRef } from "react"
import { useInputGroup } from "./Input.group"
import { chakra, useComponentStyle, PropsOf } from "@chakra-ui/system"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { __DEV__, mergeRefs, cx } from "@chakra-ui/utils"

export type InputElementProps = PropsOf<typeof chakra.div> & {
  placement?: "left" | "right"
}

export const InputElement = forwardRef(
  (props: InputElementProps, ref: React.Ref<any>) => {
    const { placement = "left", ...rest } = props

    const group = useInputGroup()

    const input = useComponentStyle({
      themeKey: "Input",
      variant: group?.variant,
      size: group?.size,
    }) as InputElementProps

    const placementProp = { [placement]: "0" }

    return (
      <chakra.div
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        paddingX={input?.paddingLeft}
        paddingY={input?.paddingTop}
        fontSize={input?.fontSize}
        top="0"
        zIndex={2}
        ref={ref}
        {...placementProp}
        {...rest}
      />
    )
  },
)

if (__DEV__) {
  InputElement.displayName = "InputElement"
}

export const InputLeftElement = forwardRef(
  (props: PropsOf<typeof InputElement>, ref: React.Ref<any>) => {
    const { leftElement } = useInputGroup()

    useSafeLayoutEffect(() => {
      leftElement?.setMounted(true)
      return () => leftElement?.setMounted(false)
    }, [])

    const _ref = mergeRefs(ref, leftElement?.ref)
    const _className = cx("chakra-input__left-element", props.className)

    return (
      <InputElement
        ref={_ref}
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

export const InputRightElement = forwardRef(
  (props: PropsOf<typeof InputElement>, ref: React.Ref<any>) => {
    const { rightElement } = useInputGroup()

    useSafeLayoutEffect(() => {
      rightElement?.setMounted(true)
      return () => rightElement?.setMounted(false)
    }, [])

    const _ref = mergeRefs(ref, rightElement?.ref)
    const _className = cx("chakra-input__right-element", props.className)

    return (
      <InputElement
        ref={_ref}
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
