"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableCellProps extends HTMLChakraProps<"td"> {
  /**
   * Aligns the cell content to the right
   * @default false
   */
  numeric?: boolean
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(props, ref) {
    const { numeric, ...rest } = props
    const styles = useTableStyles()

    return (
      <chakra.td
        {...rest}
        ref={ref}
        css={[styles.cell, props.css]}
        className={cx("chakra-table__cell", props.className)}
        data-is-numeric={dataAttr(numeric)}
      />
    )
  },
)
