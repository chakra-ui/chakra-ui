import * as React from "react";
import { useTooltip, TooltipOptions } from "./Tooltip.hook";

export function Tooltip(props: TooltipOptions) {
  const hook = useTooltip(props);
  return <div>This is a Tooltip component</div>;
}

export default Tooltip;
