import { TableBasic } from "compositions/examples/table-basic"
import { TableSizeTable } from "compositions/examples/table-size-table"
import { TableVariantTable } from "compositions/examples/table-variant-table"
import { TableWithColumnBorder } from "compositions/examples/table-with-column-border"
import { TableWithColumnGroup } from "compositions/examples/table-with-column-group"
import { TableWithInteractive } from "compositions/examples/table-with-interactive"
import { TableWithOverflow } from "compositions/examples/table-with-overflow"
import { TableWithPagination } from "compositions/examples/table-with-pagination"
import { TableWithSelection } from "compositions/examples/table-with-selection"
import { TableWithSelectionActionBar } from "compositions/examples/table-with-selection-action-bar"
import { TableWithStickyColumn } from "compositions/examples/table-with-sticky-column"
import { TableWithStickyHeader } from "compositions/examples/table-with-sticky-header"
import { TableWithStriped } from "compositions/examples/table-with-striped"

export default {
  title: "Components / Table",
}

export const Basic = () => {
  return <TableBasic />
}

export const WithColumnBorder = () => {
  return <TableWithColumnBorder />
}

export const WithColumnGroup = () => {
  return <TableWithColumnGroup />
}

export const WithInteractive = () => {
  return <TableWithInteractive />
}

export const Overflow = () => {
  return <TableWithOverflow />
}

export const WithPagination = () => {
  return <TableWithPagination />
}

export const WithStickyColumn = () => {
  return <TableWithStickyColumn />
}

export const WithStickyHeader = () => {
  return <TableWithStickyHeader />
}

export const WithStripe = () => {
  return <TableWithStriped />
}

export const WithSelection = () => {
  return <TableWithSelection />
}

export const WithSelectionActionBar = () => {
  return <TableWithSelectionActionBar />
}

export const Variants = () => {
  return <TableVariantTable />
}

export const Sizes = () => {
  return <TableSizeTable />
}
