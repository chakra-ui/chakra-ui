import * as React from "react"
import { useInputGroup } from "./Input.group"
import { chakra, useComponentStyle, PropsOf } from "@chakra-ui/system"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { __DEV__ } from "@chakra-ui/utils"

export type InputElementProps = PropsOf<typeof chakra.div> & {
  placement?: "left" | "right"
}

/**
 * InputElement
 *
 * Element to append or prepend to an input
 */

export const InputElement = React.forwardRef(
  (props: InputElementProps, ref: React.Ref<any>) => {
    const { placement = "left", ...rest } = props

    const { variant, size } = useInputGroup()

    const inputStyle = useComponentStyle({
      themeKey: "Input",
      variant,
      size,
    })

    const placementProp = { [placement]: "0" }

    return (
      <chakra.div
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        height={inputStyle?.height}
        minWidth={inputStyle?.height}
        fontSize={inputStyle?.fontSize}
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

/**
 * InputLeftElement
 *
 * Element to append to the left of an input
 */

export const InputLeftElement = React.forwardRef(
  (props: PropsOf<typeof InputElement>, ref: React.Ref<any>) => {
    const group = useInputGroup()

    useSafeLayoutEffect(() => {
      group.setHasLeftElement(true)
      return () => {
        group.setHasLeftElement(false)
      }
    }, [])

    return <InputElement ref={ref} placement="left" {...props} />
  },
)

if (__DEV__) {
  InputLeftElement.displayName = "InputLeftElement"
}

/**
 * InputRightElement
 *
 * Element to append to the right of an input
 */

export const InputRightElement = React.forwardRef(
  (props: PropsOf<typeof InputElement>, ref: React.Ref<any>) => {
    const group = useInputGroup()

    useSafeLayoutEffect(() => {
      group.setHasRightElement(true)
      return () => {
        group.setHasRightElement(false)
      }
    }, [])

    return <InputElement ref={ref} placement="right" {...props} />
  },
)

if (__DEV__) {
  InputRightElement.displayName = "InputRightElement"
}
