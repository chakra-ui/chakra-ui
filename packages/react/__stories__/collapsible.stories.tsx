import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Collapsible",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CollapsibleBasic as Basic } from "compositions/examples/collapsible-basic"
export { CollapsibleLazyMounted as LazyMounted } from "compositions/examples/collapsible-lazy-mounted"
export { CollapsiblePartialHeight as PartialHeight } from "compositions/examples/collapsible-partial-height"
export { CollapsibleInitialOpen as InitialOpen } from "compositions/examples/collapsible-initial-open"
export { CollapsibleWithDisabled as Disabled } from "compositions/examples/collapsible-with-disabled"
export { CollapsibleControlled as Controlled } from "compositions/examples/collapsible-controlled"
export { CollapsibleWithStore as Store } from "compositions/examples/collapsible-with-store"
