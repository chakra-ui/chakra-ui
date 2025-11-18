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
export { SplitterMutiplePanels as MultiplePanels } from "compositions/examples/splitter-multiple-panels"
export { SplitterControlled as Controlled } from "compositions/examples/splitter-controlled"
export { SplitterWithStore as Store } from "compositions/examples/splitter-with-store"
export { SplitterCollapsible as Collapsible } from "compositions/examples/splitter-collapsible"
export { SplitterKeyboardResize as KeyboardResize } from "compositions/examples/splitter-keyboard-resize"
export { SplitterWithStorage as Storage } from "compositions/examples/splitter-with-storage"
export { SplitterExplorer as Explorer } from "compositions/examples/splitter-explorer"
export { SplitterNested as Nested } from "compositions/examples/splitter-nested"
export { SplitterDisabled as Disabled } from "compositions/examples/splitter-disabled"
export { SplitterConditionalRendering as ConditionalRendering } from "compositions/examples/splitter-conditional-rendering"
export { SplitterDynamicPanel as DynamicPanel } from "compositions/examples/splitter-dynamic-panel"
export { SplitterIdeLayout as IdeLayout } from "compositions/examples/splitter-ide-layout"
