import * as React from "react"
import { useInputGroup } from "./Input.group"
import { chakra, useComponentStyle, PropsOf } from "@chakra-ui/system"
import { useIsomorphicEffect } from "@chakra-ui/hooks"

const InputElement = React.forwardRef((props: any, ref: React.Ref<any>) => {
  const { placement = "left", ...rest } = props

  const { variant, variantSize } = useInputGroup()

  const { height, fontSize } = useComponentStyle({
    themeKey: "Input",
    variant,
    variantSize,
  })

  const placementProp = { [placement]: "0" }

  return (
    <chakra.div
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      height={height}
      minWidth={height}
      fontSize={fontSize}
      top="0"
      zIndex={2}
      ref={ref}
      {...placementProp}
      {...rest}
    />
  )
})

InputElement.displayName = "InputElement"

const InputLeftElement = React.forwardRef(
  (props: PropsOf<typeof InputElement>, ref: React.Ref<HTMLDivElement>) => {
    const group = useInputGroup()

    useIsomorphicEffect(() => {
      group.setHasLeftElement(true)
      return () => {
        group.setHasLeftElement(false)
      }
    }, [])

    return <InputElement ref={ref} placement="left" {...props} />
  },
)

InputLeftElement.displayName = "InputLeftElement"

const InputRightElement = React.forwardRef(
  (props: PropsOf<typeof InputElement>, ref: React.Ref<HTMLDivElement>) => {
    const group = useInputGroup()

    useIsomorphicEffect(() => {
      group.setHasRightElement(true)
      return () => {
        group.setHasRightElement(false)
      }
    }, [])

    return <InputElement ref={ref} placement="right" {...props} />
  },
)

InputRightElement.displayName = "InputRightElement"

export { InputLeftElement, InputRightElement }
export default InputElement
