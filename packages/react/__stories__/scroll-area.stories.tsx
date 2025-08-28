import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Layout / ScrollArea",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ScrollAreaBasic as Basic } from "compositions/examples/scroll-area-basic"
export { ScrollAreaBothDirections as BothDirections } from "compositions/examples/scroll-area-both-directions"
export { ScrollAreaHorizontal as Horizontal } from "compositions/examples/scroll-area-horizontal"
export { ScrollAreaScrollToPosition as ScrollToPosition } from "compositions/examples/scroll-area-scroll-to-position"
export { ScrollAreaScrollToSide as ScrollToSide } from "compositions/examples/scroll-area-scroll-to-side"
export { ScrollAreaStickToBottom as StickToBottom } from "compositions/examples/scroll-area-stick-to-bottom"
export { ScrollAreaVirtualization as Virtualization } from "compositions/examples/scroll-area-virtualization"
export { ScrollAreaWithMenu as WithMenu } from "compositions/examples/scroll-area-with-menu"
export { ScrollAreaWithRtl as RTL } from "compositions/examples/scroll-area-with-rtl"
export { ScrollAreaWithScrollShadow as ScrollShadow } from "compositions/examples/scroll-area-with-scroll-shadow"
export { ScrollAreaWithSizes as Sizes } from "compositions/examples/scroll-area-with-sizes"
export { ScrollAreaWithStore as Store } from "compositions/examples/scroll-area-with-store"
export { ScrollAreaWithThumbStyling as ThumbStyling } from "compositions/examples/scroll-area-with-thumb-styling"
export { ScrollAreaWithVariants as Variants } from "compositions/examples/scroll-area-with-variants"
