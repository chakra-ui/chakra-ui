import * as React from "react"
import { StoryContext, StoryFn } from "@storybook/addons"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeSwitch } from "./ColorModeSwitch"
import { ChakraOptions } from "../interfaces"
import { positionAllowedValues } from "../constants"

export const ChakraProviderWrapper = (
  Story: StoryFn<JSX.Element>,
  context: StoryContext,
) => {
  const { chakra } = context.parameters

  const { theme, colorModeSwitch } = (chakra as ChakraOptions) ?? {}

  const { enable, position, zIndex, margin } = colorModeSwitch ?? {}

  let args = {}
  let enableOpt: boolean
  let zIndexOpt: any
  const warnMessages = []

  const positionOpt = positionAllowedValues[position]
  const [yAxis, xAxis] = positionOpt ?? []

  const marginOpt = margin ?? "1rem"

  if (positionOpt) {
    args = {
      [yAxis]: marginOpt,
      [xAxis]: marginOpt,
    }
  } else {
    //default
    warnMessages.push(
      "[position] Invalid position parameter, using default values",
    )
    args = {
      top: marginOpt,
      right: marginOpt,
    }
  }

  if (typeof enable === "undefined") {
    warnMessages.push(
      "[enable] Enable parameter not found, using default values",
    )
    enableOpt = true
  } else {
    enableOpt = enable
  }

  if (typeof zIndex === "undefined") {
    warnMessages.push(
      "[zIndex] zIndex parameter not found, using default values",
    )
    zIndexOpt = 9999
  } else {
    zIndexOpt = zIndex
  }

  if (warnMessages.length > 0) {
    warnMessages.forEach((msg) =>
      console.warn(`[@chakra-ui/storybook-addon] ${msg}`),
    )
  }

  return (
    <ChakraProvider theme={theme}>
      {enableOpt ? <ColorModeSwitch zIndex={zIndexOpt} {...args} /> : ""}
      <Story {...context} />
    </ChakraProvider>
  )
}
