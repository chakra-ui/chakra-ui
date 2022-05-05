import * as React from "react"
import { addons } from "@storybook/addons"
import { EVENTS } from "../../constants"

/**
 * Sync the layout direction to the html element
 */
export const useDirection = (initialDirection: "ltr" | "rtl" = "ltr") => {
  const [direction, setDirection] = React.useState(
    initialDirection.toLowerCase(),
  )

  React.useEffect(() => {
    document.documentElement.dir = direction
  }, [direction])

  React.useEffect(() => {
    const channel = addons.getChannel()
    const callback = (value: string) => setDirection(value)
    channel.on(EVENTS.TOGGLE_DIRECTION, callback)
    return () => {
      channel.removeListener(EVENTS.TOGGLE_DIRECTION, callback)
    }
  }, [setDirection])

  return direction
}
