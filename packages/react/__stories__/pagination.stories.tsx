import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Pagination",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { PaginationAsLink as AsLink } from "compositions/examples/pagination-as-link"
export { PaginationAttached as Attached } from "compositions/examples/pagination-attached"
export { PaginationBasic as Basic } from "compositions/examples/pagination-basic"
export { PaginationCompact as Compact } from "compositions/examples/pagination-compact"
export { PaginationControlled as Controlled } from "compositions/examples/pagination-controlled"
export { PaginationWithContent as Content } from "compositions/examples/pagination-with-content"
export { PaginationWithCountText as CountText } from "compositions/examples/pagination-with-count-text"
export { PaginationWithSiblingCount as SiblingCount } from "compositions/examples/pagination-with-sibling-count"
export { PaginationWithSizes as Sizes } from "compositions/examples/pagination-with-sizes"
export { PaginationWithVariants as Variants } from "compositions/examples/pagination-with-variants"
