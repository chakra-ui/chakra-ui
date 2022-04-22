import * as React from "react"
import { useColorMode } from "@chakra-ui/react"
import { addons } from "@storybook/addons"
import { EVENTS } from "../../constants"

export const ColorModeSync = () => {
  const { setColorMode } = useColorMode()
  React.useEffect(() => {
    const channel = addons.getChannel()
    const callback = (value: string) => setColorMode(value)
    channel.on(EVENTS.TOGGLE_COLOR_MODE, callback)
    return () => {
      channel.removeListener(EVENTS.TOGGLE_COLOR_MODE, callback)
    }
  }, [setColorMode])
  return null
}
