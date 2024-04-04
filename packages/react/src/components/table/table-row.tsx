"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableRowProps extends HTMLChakraProps<"tr"> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    const styles = useTableStyles()
    return <chakra.tr {...props} ref={ref} css={[styles.row, props.css]} />
  },
)
