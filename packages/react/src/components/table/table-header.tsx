"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableHeaderProps extends HTMLChakraProps<"thead"> {}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(function TableHeader(props, ref) {
  const styles = useTableStyles()
  return <chakra.thead {...props} ref={ref} css={[styles.header, props.css]} />
})
