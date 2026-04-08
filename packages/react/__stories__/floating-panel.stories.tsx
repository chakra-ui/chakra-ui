import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / FloatingPanel",
  decorators: [
    (Story) => (
      <Box p="10" minH="sm" position="relative">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { FloatingPanelBasic as Basic } from "compositions/examples/floating-panel-basic"
export { FloatingPanelBoundary as Boundary } from "compositions/examples/floating-panel-boundary"
export { FloatingPanelControlledPosition as Position } from "compositions/examples/floating-panel-controlled-position"
export { FloatingPanelControlledSize as Size } from "compositions/examples/floating-panel-controlled-size"
export { FloatingPanelDisabled as Disabled } from "compositions/examples/floating-panel-disabled"
export { FloatingPanelLazyMount as LazyMount } from "compositions/examples/floating-panel-lazy-mount"
export { FloatingPanelNoDrag as NoDrag } from "compositions/examples/floating-panel-no-drag"
export { FloatingPanelNoResize as NoResize } from "compositions/examples/floating-panel-no-resize"
export { FloatingPanelControlled as Controlled } from "compositions/examples/floating-panel-controlled"
export { FloatingPanelNoOverflow as NoOverflow } from "compositions/examples/floating-panel-no-overflow"
export { FloatingPanelRtl as Rtl } from "compositions/examples/floating-panel-rtl"
export { FloatingPanelClosed as Closed } from "compositions/examples/floating-panel-closed"
