import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / Stack",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { StackBasic as Basic } from "compositions/examples/stack-basic"
export { StackHorizontal as Horizontal } from "compositions/examples/stack-horizontal"
export { StackWithHstack as WithHStack } from "compositions/examples/stack-with-hstack"
export { StackWithVstack as WithVStack } from "compositions/examples/stack-with-vstack"
export { StackWithSeparator as WithSeparator } from "compositions/examples/stack-with-separator"
export { StackWithResponsiveDirection as WithResponsiveDirection } from "compositions/examples/stack-with-responsive-direction"
export { StackWithCustomSeparator as WithCustomSeparator } from "compositions/examples/stack-with-custom-separator"
export { StackWithResponsiveSeparator as WithResponsiveSeparator } from "compositions/examples/stack-with-responsive-separator"
