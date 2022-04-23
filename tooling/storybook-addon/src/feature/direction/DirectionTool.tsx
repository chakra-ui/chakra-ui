import * as React from "react"
import { useAddonState } from "@storybook/api"
import { addons } from "@storybook/addons"
import { IconButton } from "@storybook/components"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { ADDON_ID, EVENTS } from "../../constants"

/**
 * This component is rendered in the Storybook toolbar
 */
export const DirectionTool = () => {
  const [direction, setDirection] = useAddonState(
    `${ADDON_ID}/direction`,
    "ltr",
  )
  const targetDirection = direction !== "ltr" ? "ltr" : "rtl"

  const toggleDirection = React.useCallback(() => {
    const channel = addons.getChannel()
    channel.emit(EVENTS.TOGGLE_DIRECTION, targetDirection)
    setDirection(targetDirection)
  }, [setDirection, targetDirection])

  return (
    <IconButton
      active={direction === "rtl"}
      title={`Set layout direction to ${targetDirection}`}
      onClick={toggleDirection}
    >
      {targetDirection === "ltr" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
    </IconButton>
  )
}
