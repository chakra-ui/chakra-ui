import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Accordion",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { AccordionBasic as Basic } from "compositions/examples/accordion-basic"
export { AccordionVariantTable as Variants } from "compositions/examples/accordion-variant-table"
export { AccordionSizeTable as Sizes } from "compositions/examples/accordion-size-table"
export { AccordionWithIcon as Icon } from "compositions/examples/accordion-with-icon"
export { AccordionWithMultiple as WithMultiple } from "compositions/examples/accordion-with-multiple"
export { AccordionControlled as Controlled } from "compositions/examples/accordion-controlled"
