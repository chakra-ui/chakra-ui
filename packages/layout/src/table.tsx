import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

interface TableOptions {
  /**
   * Enable a hover state on table rows within the `<TBody>`
   * @default false
   */
  isHoverable?: boolean
  /**
   * Allow tables to be scrolled horizontally
   * @default false
   */
  isResponsive?: boolean
  /**
   * Render the `<Caption>` under or above the table
   * @default 'bottom'
   */
  captionSide?: "top" | "bottom"
  /**
   * Stripe odd or even rows. Only takes effect when variant uses striping
   * @default 'odd'
   */
  stripedOrder?: "odd" | "even"
  /**
   * Varient
   * @default 'normal'
   */
  variant?:
    | "normal"
    | "striped"
    | "bordered"
    | "borderless"
    | "bordered-striped"
    | "borderless-striped"
    | string
  /**
   * Size
   * @default 'md'
   */
  size?: "md" | "sm" | string
}

export interface TableProps
  extends HTMLChakraProps<"table">,
    TableOptions,
    ThemingProps {}

/**
 * Table is used to display tabular items, it renders a `<table>` by default.
 *
 * @see Docs https://chakra-ui.com/components/table
 */
export const Table = forwardRef<TableProps, "table">(function Table(
  props,
  ref,
) {
  const {
    isHoverable,
    isResponsive,
    stripedOrder,
    captionSide,
    children,
    __css,
    ...rest
  } = omitThemingProps(props)

  const styles = useMultiStyleConfig("Table", props)
  const tableJsx = (
    <chakra.table
      ref={ref}
      __css={{
        ...styles.table,
        ...__css,
      }}
      {...rest}
    >
      {children}
    </chakra.table>
  )
  const responsiveContainerStyles = {
    w: "full",
    d: "block",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    msOverflowStyle: "-ms-autohiding-scrollbar",
    "> table": {
      whiteSpace: "nowrap",
    },
  }

  return (
    <StylesProvider value={styles}>
      {isResponsive ? (
        <chakra.div tabIndex={0} __css={responsiveContainerStyles}>
          {tableJsx}
        </chakra.div>
      ) : (
        tableJsx
      )}
    </StylesProvider>
  )
})

if (__DEV__) {
  Table.displayName = "Table"
}

export interface TableheadProps extends HTMLChakraProps<"thead"> {}

/**
 * TableHead
 *
 * React component used to group the table head
 *
 * It renders a `thead` by default.
 *
 * @see Docs http://chakra-ui.com/components/table
 */
export const TableHead = forwardRef<TableheadProps, "thead">(function TableHead(
  props,
  ref,
) {
  const { children, __css, ...rest } = props
  const styles = useStyles()
  return (
    <chakra.thead
      ref={ref}
      {...rest}
      __css={{
        ...styles.thead,
        ...__css,
      }}
    >
      {children}
    </chakra.thead>
  )
})
export const THead = TableHead

if (__DEV__) {
  TableHead.displayName = "TableHead"
}

export interface TablefootProps extends HTMLChakraProps<"tfoot"> {}

/**
 * TableFoot
 *
 * React component used to group the table foot
 *
 * It renders a `tfoot` by default.
 *
 * @see Docs http://chakra-ui.com/components/table
 */
export const TableFoot = forwardRef<TablefootProps, "tfoot">(function TableFoot(
  props,
  ref,
) {
  const { children, __css, ...rest } = props
  const styles = useStyles()
  return (
    <chakra.tfoot
      ref={ref}
      {...rest}
      __css={{
        ...styles.tfoot,
        ...__css,
      }}
    >
      {children}
    </chakra.tfoot>
  )
})
export const TFoot = TableFoot

if (__DEV__) {
  TableFoot.displayName = "TableFoot"
}

export interface TablebodyProps extends HTMLChakraProps<"tbody"> {}

/**
 * TableBody
 *
 * React component used to group the table foot
 *
 * It renders a `tbody` by default.
 *
 * @see Docs http://chakra-ui.com/components/table
 */
export const TableBody = forwardRef<TablebodyProps, "tbody">(function TableBody(
  props,
  ref,
) {
  const { children, __css, ...rest } = props
  const styles = useStyles()
  return (
    <chakra.tbody
      ref={ref}
      {...rest}
      __css={{
        ...styles.tbody,
        ...__css,
      }}
    >
      {children}
    </chakra.tbody>
  )
})
export const TBody = TableBody

if (__DEV__) {
  TableBody.displayName = "TableBody"
}

export interface TableRowProps extends HTMLChakraProps<"tr"> {}

/**
 * TableRow
 *
 * React component used to group the table foot
 *
 * It renders a `th` by default.
 *
 * @see Docs http://chakra-ui.com/components/table
 */
export const TableRow = forwardRef<TableRowProps, "tr">(function TableRow(
  props,
  ref,
) {
  const { children, __css, ...rest } = props
  const styles = useStyles()

  return (
    <chakra.tr
      ref={ref}
      {...rest}
      __css={{
        ...styles.tr,
        ...__css,
      }}
    >
      {children}
    </chakra.tr>
  )
})
export const Row = TableRow
export const TR = TableRow

if (__DEV__) {
  TableRow.displayName = "TableRow"
}

export interface TableHeaderProps extends HTMLChakraProps<"th"> {}

/**
 * TableHeader
 *
 * React component used to group the table foot
 *
 * It renders a `th` by default.
 *
 * @see Docs http://chakra-ui.com/components/table
 */
export const TableH = forwardRef<TableHeaderProps, "th">(function TableH(
  props,
  ref,
) {
  const { children, __css, ...rest } = props
  const styles = useStyles()
  return (
    <chakra.th
      ref={ref}
      {...rest}
      __css={{
        ...styles.th,
        ...__css,
      }}
    >
      {children}
    </chakra.th>
  )
})
export const TH = TableH

if (__DEV__) {
  TableH.displayName = "TableH"
}

export interface TableCellProps extends HTMLChakraProps<"td"> {}

/**
 * TableCell
 *
 * React component used to render table data
 *
 * It renders a `td` by default.
 *
 * @see Docs http://chakra-ui.com/components/table
 */
export const TableCell = forwardRef<TableCellProps, "td">(function TableCell(
  props,
  ref,
) {
  const { children, __css, ...rest } = props
  const styles = useStyles()
  return (
    <chakra.td
      ref={ref}
      {...rest}
      __css={{
        ...styles.td,
        ...__css,
      }}
    >
      {children}
    </chakra.td>
  )
})
export const TD = TableCell

if (__DEV__) {
  TableCell.displayName = "TableCell"
}

export interface TableCaptionProps extends HTMLChakraProps<"caption"> {}

/**
 * Caption
 *
 * React component used to render a table caption
 *
 * It renders a `caption` by default.
 *
 * @see Docs http://chakra-ui.com/components/table
 */
export const TableCaption = forwardRef<TableCaptionProps, "caption">(
  function TableCaption(props, ref) {
    const { children, __css, ...rest } = props
    const styles = useStyles()
    return (
      <chakra.caption
        ref={ref}
        {...rest}
        __css={{
          ...styles.caption,
          ...__css,
        }}
      >
        {children}
      </chakra.caption>
    )
  },
)
export const Caption = TableCaption

if (__DEV__) {
  TableCaption.displayName = "Caption"
}
