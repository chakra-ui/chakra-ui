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
export { FloatingPanelAnchorPosition as AnchorPosition } from "compositions/examples/floating-panel-anchor-position"
export { FloatingPanelBoundary as Boundary } from "compositions/examples/floating-panel-boundary"
export { FloatingPanelControlledPosition as Position } from "compositions/examples/floating-panel-controlled-position"
export { FloatingPanelControlledSize as Size } from "compositions/examples/floating-panel-controlled-size"
export { FloatingPanelDisabled as Disabled } from "compositions/examples/floating-panel-disabled"
export { FloatingPanelDisableDrag as DisableDrag } from "compositions/examples/floating-panel-disable-drag"
export { FloatingPanelDisableResize as DisableResize } from "compositions/examples/floating-panel-disable-resize"
export { FloatingPanelResizeAxes as ResizeAxes } from "compositions/examples/floating-panel-resize-axes"
export { FloatingPanelMinMax as MinMax } from "compositions/examples/floating-panel-min-max"
export { FloatingPanelControlledOpen as ControlledOpen } from "compositions/examples/floating-panel-controlled-open"
export { FloatingPanelWithStore as Store } from "compositions/examples/floating-panel-with-store"
export { FloatingPanelStages as Stages } from "compositions/examples/floating-panel-stages"
export { FloatingPanelMultiple as Multiple } from "compositions/examples/floating-panel-multiple"
export { FloatingPanelWithOverlay as Overlay } from "compositions/examples/floating-panel-with-overlay"
export { FloatingPanelPreventOverflow as PreventOverflow } from "compositions/examples/floating-panel-prevent-overflow"
export { FloatingPanelContext as Context } from "compositions/examples/floating-panel-context"
export { FloatingPanelRtl as Rtl } from "compositions/examples/floating-panel-rtl"
