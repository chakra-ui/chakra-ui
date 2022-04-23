import * as React from "react"
import { useColorMode } from "@chakra-ui/react"
import { addons } from "@storybook/addons"
import { EVENTS } from "../../constants"

/**
 * Render <ColorModeSync /> to sync the storybook color mode with Chakra UI
 */
export const ColorModeSync = () => {
  const { setColorMode } = useColorMode()

  React.useEffect(() => {
    const channel = addons.getChannel()

    const colorModeToolCallback = (value: string) => setColorMode(value)
    channel.on(EVENTS.TOGGLE_COLOR_MODE, colorModeToolCallback)

    return () => {
      channel.removeListener(EVENTS.TOGGLE_COLOR_MODE, colorModeToolCallback)
    }
  }, [setColorMode])

  return null
}
