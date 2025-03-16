import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / Wrap",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { WrapBasic as Basic } from "compositions/examples/wrap-basic"
export { WrapResponsive as Responsive } from "compositions/examples/wrap-responsive"
export { WrapWithAlign as Align } from "compositions/examples/wrap-with-align"
export { WrapWithGap as Gap } from "compositions/examples/wrap-with-gap"
export { WrapWithJustify as Justify } from "compositions/examples/wrap-with-justify"
export { WrapWithRowColumnGap as RowColumnGap } from "compositions/examples/wrap-with-row-column-gap"
