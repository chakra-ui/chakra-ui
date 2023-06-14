import { useEffect, useState } from "react"
import { addons } from "@storybook/preview-api"
import { EVENTS } from "../constants"

/**
 * Sync the layout direction to the html element
 */
export const useDirection = (initialDirection: "ltr" | "rtl" = "ltr") => {
  const [direction, setDirection] = useState(initialDirection.toLowerCase())

  useEffect(() => {
    document.documentElement.dir = direction
  }, [direction])

  useEffect(() => {
    const channel = addons.getChannel()
    const callback = (value: string) => setDirection(value)
    channel.on(EVENTS.TOGGLE_DIRECTION, callback)
    return () => {
      channel.removeListener(EVENTS.TOGGLE_DIRECTION, callback)
    }
  }, [setDirection])

  return direction
}
