import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface TableContainerProps extends HTMLChakraProps<"div"> {}

export const TableContainer = forwardRef<TableContainerProps, "div">(
  (props: HTMLChakraProps<"div">, ref) => {
    const { overflow, overflowX, className, ...rest } = props
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-table__container", className)}
        {...rest}
        __css={{
          display: "block",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          overflowX: overflow ?? overflowX ?? "auto",
          overflowY: "hidden",
          maxWidth: "100%",
        }}
      />
    )
  },
)

export interface TableProps
  extends HTMLChakraProps<"table">,
    ThemingProps<"Table"> {}

export const Table = forwardRef<TableProps, "table">((props, ref) => {
  const styles = useMultiStyleConfig("Table", props)
  const { className, ...tableProps } = omitThemingProps(props)

  return (
    <StylesProvider value={styles}>
      <chakra.table
        role="table"
        ref={ref}
        __css={styles.table}
        className={cx("chakra-table", className)}
        {...tableProps}
      />
    </StylesProvider>
  )
})

if (__DEV__) {
  Table.displayName = "Table"
}

export interface TableCaptionProps extends HTMLChakraProps<"caption"> {
  /**
   * The placement of the table caption. This sets the `caption-side` CSS attribute.
   * @default "bottom"
   */
  placement?: "top" | "bottom"
}

export const TableCaption = forwardRef<TableCaptionProps, "caption">(
  (props, ref) => {
    const { placement = "bottom", ...rest } = props
    const styles = useStyles()
    return (
      <chakra.caption
        {...rest}
        ref={ref}
        __css={{
          ...styles.caption,
          captionSide: placement,
        }}
      />
    )
  },
)

if (__DEV__) {
  TableCaption.displayName = "TableCaption"
}

export interface TableHeadProps extends HTMLChakraProps<"thead"> {}

export const Thead = forwardRef<TableHeadProps, "thead">((props, ref) => {
  const styles = useStyles()
  return <chakra.thead {...props} ref={ref} __css={styles.thead} />
})

export interface TableBodyProps extends HTMLChakraProps<"tbody"> {}

export const Tbody = forwardRef<TableBodyProps, "tbody">((props, ref) => {
  const styles = useStyles()
  return <chakra.tbody {...props} ref={ref} __css={styles.tbody} />
})

export interface TableFooterProps extends HTMLChakraProps<"tfoot"> {}

export const Tfoot = forwardRef<TableFooterProps, "tfoot">((props, ref) => {
  const styles = useStyles()
  return <chakra.tfoot {...props} ref={ref} __css={styles.tfoot} />
})

export interface TableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}
export const Th = forwardRef<TableColumnHeaderProps, "th">(
  ({ isNumeric, ...rest }, ref) => {
    const styles = useStyles()
    return (
      <chakra.th
        {...rest}
        ref={ref}
        __css={styles.th}
        data-is-numeric={isNumeric}
      />
    )
  },
)

export interface TableRowProps extends HTMLChakraProps<"tr"> {}
export const Tr = forwardRef<TableRowProps, "tr">((props, ref) => {
  const styles = useStyles()

  return <chakra.tr role="row" {...props} ref={ref} __css={styles.tr} />
})

export interface TableCellProps extends HTMLChakraProps<"td"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}
export const Td = forwardRef<TableCellProps, "td">(
  ({ isNumeric, ...rest }, ref) => {
    const styles = useStyles()

    return (
      <chakra.td
        role="gridcell"
        {...rest}
        ref={ref}
        __css={styles.td}
        data-is-numeric={isNumeric}
      />
    )
  },
)
