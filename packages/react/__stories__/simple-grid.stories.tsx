import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / SimpleGrid",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SimpleGridBasic as Basic } from "compositions/examples/simple-grid-basic"
export { SimpleGridWithAutofit as AutoFit } from "compositions/examples/simple-grid-with-autofit"
export { SimpleGridWithColSpan as ColSpan } from "compositions/examples/simple-grid-with-col-span"
export { SimpleGridWithColumns as Columns } from "compositions/examples/simple-grid-with-columns"
export { SimpleGridWithRowAndColGap as RowColGap } from "compositions/examples/simple-grid-with-row-and-col-gap"
