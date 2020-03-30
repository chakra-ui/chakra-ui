import * as React from "react"
import { useInputGroup } from "./Input.group"
import { chakra, useComponentStyle, PropsOf } from "@chakra-ui/system"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"

export type InputElementProps = PropsOf<typeof chakra.div> & {
  placement?: "left" | "right"
}

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

InputElement.displayName = "InputElement"

export const InputLeftElement = React.forwardRef(
  (props: PropsOf<typeof InputElement>, ref: React.Ref<HTMLDivElement>) => {
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

InputLeftElement.displayName = "InputLeftElement"

export const InputRightElement = React.forwardRef(
  (props: PropsOf<typeof InputElement>, ref: React.Ref<HTMLDivElement>) => {
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

InputRightElement.displayName = "InputRightElement"
