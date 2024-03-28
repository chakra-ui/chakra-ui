"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   * @default false
   */
  numeric?: boolean
}

export const TableColumnHeader = forwardRef<
  HTMLTableCellElement,
  TableColumnHeaderProps
>(function TableColumnHeader(props, ref) {
  const { numeric, ...rest } = props
  const styles = useTableStyles()

  return (
    <chakra.th
      {...rest}
      ref={ref}
      css={[styles.columnHeader, props.css]}
      className={cx("chakra-table__column-header", props.className)}
      data-is-numeric={dataAttr(numeric)}
    />
  )
})
