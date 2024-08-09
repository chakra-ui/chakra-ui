import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Table",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TableBasic as Basic } from "compositions/examples/table-basic"
export { TableWithColumnBorder as WithColumnBorder } from "compositions/examples/table-with-column-border"
export { TableWithColumnGroup as WithColumnGroup } from "compositions/examples/table-with-column-group"
export { TableWithInteractive as WithInteractive } from "compositions/examples/table-with-interactive"
export { TableWithOverflow as Overflow } from "compositions/examples/table-with-overflow"
export { TableWithPagination as WithPagination } from "compositions/examples/table-with-pagination"
export { TableWithStickyColumn as WithStickyColumn } from "compositions/examples/table-with-sticky-column"
export { TableWithStickyHeader as WithStickyHeader } from "compositions/examples/table-with-sticky-header"
export { TableWithStriped as WithStripe } from "compositions/examples/table-with-striped"
export { TableWithSelection as WithSelection } from "compositions/examples/table-with-selection"
export { TableWithSelectionActionBar as WithSelectionActionBar } from "compositions/examples/table-with-selection-action-bar"
export { TableVariantTable as Variants } from "compositions/examples/table-variant-table"
export { TableSizeTable as Sizes } from "compositions/examples/table-size-table"
