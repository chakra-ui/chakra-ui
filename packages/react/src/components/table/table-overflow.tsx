"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"

export interface TableOverflowProps extends HTMLChakraProps<"div"> {}

export const TableOverflow = forwardRef<HTMLDivElement, TableOverflowProps>(
  function TableOverflow(props: HTMLChakraProps<"div">, ref) {
    const { overflow, overflowX, className, ...rest } = props
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-table__container", className)}
        {...rest}
        css={{
          display: "block",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          overflowX: overflow ?? overflowX ?? "auto",
          overflowY: "hidden",
          maxWidth: "100%",
          ...props.css,
        }}
      />
    )
  },
)
