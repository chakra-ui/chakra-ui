"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef, useMemo } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type SystemStyleObject,
  type UnstyledProp,
  chakra,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  StylesProvider,
  ClassNamesProvider,
  useRecipeResult,
  withContext,
  useStyles: useTableStyles,
} = createStyleContext("table")

export { useTableStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TableRootProps
  extends HTMLChakraProps<"table">,
    UnstyledProp,
    SlotRecipeProps<"table"> {
  /**
   * If `true`, the table will style its descendants with nested selectors
   */
  native?: boolean
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

////////////////////////////////////////////////////////////////////////////////////

export interface TableRowProps extends HTMLChakraProps<"tr"> {}

export const TableRow = withContext<HTMLTableRowElement, TableRowProps>(
  "tr",
  "row",
)

////////////////////////////////////////////////////////////////////////////////////

export interface TableScrollAreaProps extends HTMLChakraProps<"div"> {}

export const TableScrollArea = withContext<
  HTMLDivElement,
  TableScrollAreaProps
>("div", "scrollArea")

////////////////////////////////////////////////////////////////////////////////////

export interface TableHeaderProps extends HTMLChakraProps<"thead"> {}

export const TableHeader = withContext<
  HTMLTableSectionElement,
  TableHeaderProps
>("thead", "header")

////////////////////////////////////////////////////////////////////////////////////

export interface TableFooterProps extends HTMLChakraProps<"tfoot"> {}

export const TableFooter = withContext<
  HTMLTableSectionElement,
  TableFooterProps
>("tfoot", "footer")

////////////////////////////////////////////////////////////////////////////////////

export interface TableColumnHeaderProps extends HTMLChakraProps<"th"> {}

export const TableColumnHeader = withContext<
  HTMLTableCellElement,
  TableColumnHeaderProps
>("th", "columnHeader")

////////////////////////////////////////////////////////////////////////////////////

export interface TableCellProps extends HTMLChakraProps<"td"> {}

export const TableCell = withContext<HTMLTableCellElement, TableCellProps>(
  "td",
  "cell",
)

////////////////////////////////////////////////////////////////////////////////////

export interface TableCaptionProps extends HTMLChakraProps<"caption"> {}

export const TableCaption = withContext<
  HTMLTableCaptionElement,
  TableCaptionProps
>("caption", "caption", {
  defaultProps: {
    captionSide: "bottom",
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface TableBodyProps extends HTMLChakraProps<"tbody"> {}

export const TableBody = withContext<HTMLTableSectionElement, TableBodyProps>(
  "tbody",
  "body",
)
