import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Action Bar",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ActionBarBasic as Basic } from "compositions/examples/action-bar-basic"
export { ActionBarWithCloseTrigger as CloseTrigger } from "compositions/examples/action-bar-with-close-trigger"
export { ActionBarWithDialog as WithDialog } from "compositions/examples/action-bar-with-dialog"
export { ActionBarWithoutSnippet as WithoutSnippet } from "compositions/examples/action-bar-without-snippet"
