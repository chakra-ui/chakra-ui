import { useCallback, useEffect } from "react"
import { addons, useAddonState, useGlobals } from "@storybook/manager-api"
import { IconButton } from "@storybook/components"
import { DIRECTION_TOOL_ID, EVENTS } from "../constants"

const LTRIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    style={{
      transform: "scale(1.2)",
    }}
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M9 4v4c-1.1 0-2-.9-2-2s.9-2 2-2m8-2H9C6.79 2 5 3.79 5 6s1.79 4 4 4v5h2V4h2v11h2V4h2V2zm0 12v3H5v2h12v3l4-4-4-4z" />
  </svg>
)

const RTLIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    style={{
      transform: "scale(1.2)",
    }}
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M10 4v4c-1.1 0-2-.9-2-2s.9-2 2-2m8-2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4v5h2V4h2v11h2V4h2V2zM8 14l-4 4 4 4v-3h12v-2H8v-3z" />
  </svg>
)

/**
 * This component is rendered in the Storybook toolbar
 */
export const DirectionTool = () => {
  const [globals, setGlobals] = useGlobals()
  const [direction, setDirection] = useAddonState(
    DIRECTION_TOOL_ID,
    globals[DIRECTION_TOOL_ID] || "ltr",
  )
  const targetDirection = direction !== "ltr" ? "ltr" : "rtl"
  useEffect(() => {
    setGlobals({ [DIRECTION_TOOL_ID]: direction })
  }, [direction, setGlobals])

  const toggleDirection = useCallback(() => {
    const channel = addons.getChannel()
    channel.emit(EVENTS.TOGGLE_DIRECTION, targetDirection)
    setDirection(targetDirection)
  }, [setDirection, targetDirection])

  return (
    /* @ts-ignore */
    <IconButton
      active={direction === "rtl"}
      title={`Set layout direction to ${targetDirection}`}
      onClick={toggleDirection}
      // ! Possible TypeError bug where the following props are required when they shouldn't be
      content=""
      rel=""
      rev=""
    >
      {targetDirection === "ltr" ? <LTRIcon /> : <RTLIcon />}
    </IconButton>
  )
}
