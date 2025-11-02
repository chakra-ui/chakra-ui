import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Splitter",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SplitterBasic as Basic } from "compositions/examples/splitter-basic"
export { SplitterVertical as Vertical } from "compositions/examples/splitter-vertical"
export { SplitterThreePanels as ThreePanels } from "compositions/examples/splitter-three-panels"
export { SplitterControlled as Controlled } from "compositions/examples/splitter-controlled"
export { SplitterWithStore as Store } from "compositions/examples/splitter-with-store"
export { SplitterCollapsible as Collapsible } from "compositions/examples/splitter-collapsible"
export { SplitterWithKeyboardResize as KeyboardResize } from "compositions/examples/splitter-with-keyboard-resize"
