import * as React from "react"
import { useAddonState } from "@storybook/api"
import { IconButton } from "@storybook/components"
import { addons } from "@storybook/addons"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { ADDON_ID, EVENTS } from "../../constants"

/**
 * This component is rendered in the Storybook toolbar
 */
export const ColorModeTool = () => {
  const isDarkMode = localStorage.getItem("chakra-ui-color-mode") === "dark"
  const [darkMode, setDarkMode] = useAddonState(
    `${ADDON_ID}/dark-mode`,
    isDarkMode,
  )

  const channel = addons.getChannel()

  const toggleDarkMode = () => {
    channel.emit(EVENTS.TOGGLE_COLOR_MODE, !darkMode ? "dark" : "light")
    setDarkMode(!darkMode)
  }

  return (
    <IconButton
      active={darkMode}
      title={`Set color mode to ${darkMode ? "light" : "dark"}`}
      onClick={toggleDarkMode}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}
