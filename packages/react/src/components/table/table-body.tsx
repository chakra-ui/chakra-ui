"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableBodyProps extends HTMLChakraProps<"tbody"> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody(props, ref) {
    const styles = useTableStyles()
    return <chakra.tbody {...props} ref={ref} css={[styles.body, props.css]} />
  },
)
