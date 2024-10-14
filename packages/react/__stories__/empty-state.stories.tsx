import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Empty State",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { EmptyStateBasic as Basic } from "compositions/examples/empty-state-basic"
export { EmptyStateWithAction as Action } from "compositions/examples/empty-state-with-action"
export { EmptyStateWithList as List } from "compositions/examples/empty-state-with-list"
export { EmptyStateSizes as Sizes } from "compositions/examples/empty-state-sizes"
