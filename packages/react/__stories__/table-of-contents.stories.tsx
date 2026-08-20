import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Table of Contents",
  decorators: [
    (Story) => (
      <Box p={{ base: "5", md: "10" }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TableOfContentsBasic as Basic } from "compositions/examples/table-of-contents-basic"
export { TableOfContentsControlled as Controlled } from "compositions/examples/table-of-contents-controlled"
export { TableOfContentsInCard as InCard } from "compositions/examples/table-of-contents-in-card"
export { TableOfContentsLongDocument as LongDocument } from "compositions/examples/table-of-contents-long-document"
export { TableOfContentsWithMetadata as Metadata } from "compositions/examples/table-of-contents-with-metadata"
export { TableOfContentsNested as Nested } from "compositions/examples/table-of-contents-nested"
export { TableOfContentsNumbered as Numbered } from "compositions/examples/table-of-contents-numbered"
export { TableOfContentsResponsive as Responsive } from "compositions/examples/table-of-contents-responsive"
export { TableOfContentsWithRootMargin as RootMargin } from "compositions/examples/table-of-contents-with-root-margin"
export { TableOfContentsWithSizes as Sizes } from "compositions/examples/table-of-contents-with-sizes"
export { TableOfContentsWithCustomStyles as CustomStyles } from "compositions/examples/table-of-contents-with-custom-styles"
export { TableOfContentsWithVariants as Variants } from "compositions/examples/table-of-contents-with-variants"
