import React, { useCallback } from "react"
import { useAddonState } from "@storybook/api"
import { Icons, IconButton } from "@storybook/components"
import { addons } from "@storybook/addons"
import { ADDON_ID, TOOL_ID, EVENTS } from "../constants"

export const Tool = () => {
  const isDarkMode =
    localStorage.getItem("chakra-ui-color-mode") === "dark"
  const [darkMode, setDarkMode] = useAddonState(ADDON_ID, persistedColorMode)
  const channel = addons.getChannel()

  const toggleDarkMode = useCallback(
    () => {
      channel.emit(EVENTS.TOGGLE_COLOR_MODE, !darkMode ? "dark" : "light")
      setDarkMode(darkMode => !darkMode)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkMode],
  )

  return (
    <IconButton
      key={TOOL_ID}
      active={darkMode}
      css
      title={`Switch to ${darkMode ? "light" : "dark"} mode`}
      onClick={toggleMyTool}
    >
      <Icons icon={darkMode ? "circle" : "circlehollow"} />
    </IconButton>
  )
}
