"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableFooterProps extends HTMLChakraProps<"tfoot"> {}

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(function TableFooter(props, ref) {
  const styles = useTableStyles()
  return <chakra.tfoot {...props} ref={ref} css={[styles.footer, props.css]} />
})
