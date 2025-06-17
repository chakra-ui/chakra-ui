import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / TreeView",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TreeViewBasic as Basic } from "compositions/examples/tree-view-basic"
