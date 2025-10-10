import type { Meta } from "@storybook/react-vite"
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
export { TableSizeTable as Sizes } from "compositions/examples/table-size-table"
export { TableVariantTable as Variants } from "compositions/examples/table-variant-table"
export { TableWithCaption as Caption } from "compositions/examples/table-with-caption"
export { TableWithCaptionTop as CaptionTop } from "compositions/examples/table-with-caption-top"
export { TableWithColumnBorder as ColumnBorder } from "compositions/examples/table-with-column-border"
export { TableWithColumnGroup as ColumnGroup } from "compositions/examples/table-with-column-group"
export { TableWithInteractive as Interactive } from "compositions/examples/table-with-interactive"
export { TableWithNative as Native } from "compositions/examples/table-with-native"
export { TableWithOverflow as Overflow } from "compositions/examples/table-with-overflow"
export { TableWithPagination as Pagination } from "compositions/examples/table-with-pagination"
export { TableWithSelection as Selection } from "compositions/examples/table-with-selection"
export { TableWithSelectionActionBar as SelectionActionBar } from "compositions/examples/table-with-selection-action-bar"
export { TableWithStickyColumn as StickyColumn } from "compositions/examples/table-with-sticky-column"
export { TableWithStickyHeader as StickyHeader } from "compositions/examples/table-with-sticky-header"
export { TableWithStriped as Stripe } from "compositions/examples/table-with-striped"
export { TableWithTanstack as Tanstack } from "compositions/examples/table-with-tanstack"
