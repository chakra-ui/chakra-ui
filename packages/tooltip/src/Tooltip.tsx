import * as React from "react"
import { useTooltip, TooltipHookProps } from "./Tooltip.hook"

export function Tooltip(props: TooltipHookProps) {
  const hook = useTooltip(props)
  return <div>This is a Tooltip component</div>
}

export default Tooltip
