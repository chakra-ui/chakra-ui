import { Box } from "../src"

export default {
  title: "Components / Pagination",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { PaginationBasic as Basic } from "compositions/examples/pagination-basic"
export { PaginationControlled as Controlled } from "compositions/examples/pagination-controlled"
export { PaginationWithSizes as Sizes } from "compositions/examples/pagination-with-sizes"
export { PaginationWithSiblingCount as WithSiblingCount } from "compositions/examples/pagination-with-sibling-count"
export { PaginationWithVariantMap as WithVariantMap } from "compositions/examples/pagination-with-variant-map"
export { PaginationCompact as Compact } from "compositions/examples/pagination-compact"
export { PaginationWithContent as WithContent } from "compositions/examples/pagination-with-content"
export { PaginationWithCountText as WithCountText } from "compositions/examples/pagination-with-count-text"
export { PaginationAttached as Attached } from "compositions/examples/pagination-attached"
