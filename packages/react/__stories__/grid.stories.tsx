import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / Grid",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { GridBasic as Basic } from "compositions/examples/grid-basic"
export { GridSpanningColumns as SpanningColumns } from "compositions/examples/grid-spanning-columns"
export { GridWithColSpan as WithColSpan } from "compositions/examples/grid-with-col-span"
export { GridWithTemplateAreas as WithTemplateAreas } from "compositions/examples/grid-with-template-areas"
