import { IconButton } from "@storybook/components"
import * as React from "react"
import { useChakraAddonState } from "./use-addon-state"

const LTRIcon = (props: any) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M9 4v4c-1.1 0-2-.9-2-2s.9-2 2-2m8-2H9C6.79 2 5 3.79 5 6s1.79 4 4 4v5h2V4h2v11h2V4h2V2zm0 12v3H5v2h12v3l4-4-4-4z" />
  </svg>
)

const RTLIcon = (props: any) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M10 4v4c-1.1 0-2-.9-2-2s.9-2 2-2m8-2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4v5h2V4h2v11h2V4h2V2zM8 14l-4 4 4 4v-3h12v-2H8v-3z" />
  </svg>
)

export const DirectionTool = () => {
  const { direction, toggleDirection } = useChakraAddonState()
  const Icon = direction === "ltr" ? RTLIcon : LTRIcon
  return (
    //@ts-expect-error
    <IconButton title="Direction" onClick={toggleDirection}>
      <Icon style={{ transform: "scale(1.3)" }} />
    </IconButton>
  )
}
