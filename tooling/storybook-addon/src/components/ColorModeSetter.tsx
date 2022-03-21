import { useColorMode } from "@chakra-ui/react"
import { addons } from "@storybook/addons"
import React from "react"
import { EVENTS } from "../constants"

export const ColorModeSetter = () => {
  const { setColorMode } = useColorMode()
  const channel = addons.getChannel()
  channel.on(EVENTS.TOGGLE_COLOR_MODE, (colorMode) => setColorMode(colorMode))
  return <></>
}
