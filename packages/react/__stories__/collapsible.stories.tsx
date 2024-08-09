import type { Meta } from "@storybook/react"
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
