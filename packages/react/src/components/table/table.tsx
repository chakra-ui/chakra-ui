"use client"

import { forwardRef, useMemo } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type SystemStyleObject,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { cx } from "../../utils"

////////////////////////////////////////////////////////////////////////////////////

const {
  StylesProvider,
  ClassNamesProvider,
  useRecipeResult,
  withContext,
  useStyles: useTableStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "table" })

export { useTableStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TableRootBaseProps
  extends SlotRecipeProps<"table">, UnstyledProp {}

export interface TableRootProps extends HTMLChakraProps<
  "table",
  TableRootBaseProps
> {
  /**
   * If `true`, the table will style its descendants with nested selectors
   */
  native?: boolean | undefined
}

export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(
  function TableRoot({ native, ...props }, ref) {
    const { styles, props: rootProps, classNames } = useRecipeResult(props)

    const rootCss = useMemo((): SystemStyleObject => {
      if (!native) return styles.root
      return {
        ...styles.root,
        "& thead": styles.header,
        "& tbody": styles.body,
        "& tfoot": styles.footer,
        "& thead th": styles.columnHeader,
        "& tr": styles.row,
        "& td": styles.cell,
        "& caption": styles.caption,
      }
    }, [styles, native])

    return (
      <ClassNamesProvider value={classNames}>
        <StylesProvider value={styles}>
          <chakra.table
            ref={ref}
            {...rootProps}
            css={[rootCss, props.css]}
            className={cx(classNames?.["root"], props.className)}
          />
        </StylesProvider>
      </ClassNamesProvider>
    )
  },
)

export const TableRootPropsProvider =
  PropsProvider as React.Provider<TableRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface TableRowProps extends HTMLChakraProps<"tr">, UnstyledProp {}

export const TableRow = withContext<HTMLTableRowElement, TableRowProps>(
  "tr",
  "row",
)

////////////////////////////////////////////////////////////////////////////////////

export interface TableScrollAreaProps extends HTMLChakraProps<"div"> {}

export const TableScrollArea = chakra("div", {
  base: {
    display: "block",
    whiteSpace: "nowrap",
    WebkitOverflowScrolling: "touch",
    overflow: "auto",
    maxWidth: "100%",
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface TableHeaderProps
  extends HTMLChakraProps<"thead">, UnstyledProp {}

export const TableHeader = withContext<
  HTMLTableSectionElement,
  TableHeaderProps
>("thead", "header")

////////////////////////////////////////////////////////////////////////////////////

export interface TableFooterProps
  extends HTMLChakraProps<"tfoot">, UnstyledProp {}

export const TableFooter = withContext<
  HTMLTableSectionElement,
  TableFooterProps
>("tfoot", "footer")

////////////////////////////////////////////////////////////////////////////////////

export interface TableColumnHeaderProps
  extends HTMLChakraProps<"th">, UnstyledProp {}

export const TableColumnHeader = withContext<
  HTMLTableCellElement,
  TableColumnHeaderProps
>("th", "columnHeader")

////////////////////////////////////////////////////////////////////////////////////

export interface TableCellProps extends HTMLChakraProps<"td">, UnstyledProp {}

export const TableCell = withContext<HTMLTableCellElement, TableCellProps>(
  "td",
  "cell",
)

////////////////////////////////////////////////////////////////////////////////////

export interface TableCaptionProps
  extends HTMLChakraProps<"caption">, UnstyledProp {}

export const TableCaption = withContext<
  HTMLTableCaptionElement,
  TableCaptionProps
>("caption", "caption", {
  defaultProps: {
    captionSide: "bottom",
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface TableBodyProps
  extends HTMLChakraProps<"tbody">, UnstyledProp {}

export const TableBody = withContext<HTMLTableSectionElement, TableBodyProps>(
  "tbody",
  "body",
)

////////////////////////////////////////////////////////////////////////////////////

export interface TableColumnGroupProps
  extends HTMLChakraProps<"colgroup">, UnstyledProp {}

export const TableColumnGroup = withContext<
  HTMLTableColElement,
  TableColumnGroupProps
>("colgroup")

////////////////////////////////////////////////////////////////////////////////////

export interface TableColumnProps
  extends HTMLChakraProps<"col">, UnstyledProp {}

export const TableColumn = withContext<HTMLTableColElement, TableColumnProps>(
  "col",
)
