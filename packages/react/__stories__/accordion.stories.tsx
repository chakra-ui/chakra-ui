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
export { AccordionControlled as Controlled } from "compositions/examples/accordion-controlled"
export { AccordionSizeTable as Sizes } from "compositions/examples/accordion-size-table"
export { AccordionVariantTable as Variants } from "compositions/examples/accordion-variant-table"
export { AccordionWithActions as Actions } from "compositions/examples/accordion-with-actions"
export { AccordionWithAvatar as Avatar } from "compositions/examples/accordion-with-avatar"
export { AccordionWithDisabledItem as DisabledItem } from "compositions/examples/accordion-with-disabled-item"
export { AccordionWithIcon as Icon } from "compositions/examples/accordion-with-icon"
export { AccordionWithMultiple as Multiple } from "compositions/examples/accordion-with-multiple"
export { AccordionWithSubtext as Subtext } from "compositions/examples/accordion-with-subtext"
export { AccordionWithoutSnippet as WithoutSnippet } from "compositions/examples/accordion-without-snippet"
