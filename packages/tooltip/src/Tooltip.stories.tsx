import * as React from "react"
import { useTooltip } from "./Tooltip.hook"
import { Tooltip } from "./Tooltip"

export default {
  title: "Tooltip",
}

const HookTooltip = ({ children }: any) => {
  const { getTriggerProps, getTooltipProps, isOpen } = useTooltip()
  const trigger = getTriggerProps()
  const tooltip = getTooltipProps()
  return (
    <>
      <button {...trigger}>Hover me</button>
      <div
        hidden={!isOpen}
        {...tooltip}
        style={{
          ...tooltip.style,
          background: "hsla(0, 0%, 0%, 0.75)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "0.5em 1em",
        }}
      >
        {children}
      </div>
    </>
  )
}

export const Basic = () => <HookTooltip>This is me</HookTooltip>

export const MultipleTooltips = () => (
  <>
    <HookTooltip>This is tip 1</HookTooltip>
    <HookTooltip>This is tip 2</HookTooltip>
  </>
)

export const ChakraTooltip = () => (
  <Tooltip label="This is a chakra tooltip">
    <button>Hover me</button>
  </Tooltip>
)
