import {
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
} from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import { TableStylesProvider } from "./table-context"

export interface TableOptions {
  layout?: SystemStyleObject["tableLayout"]
}

export interface TableRootProps
  extends HTMLChakraProps<"table">,
    TableOptions,
    ThemingProps<"Table"> {}

/**
 * The `Table` component is used to organize and display data efficiently. It renders a `<table>` element by default.
 *
 * @see Docs https://chakra-ui.com/docs/components/table
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/table/
 */
export const TableRoot = forwardRef<TableRootProps, "table">(
  function TableRoot(props, ref) {
    const styles = useMultiStyleConfig("Table", props)
    const { layout, ...rootProps } = omitThemingProps(props)

    return (
      <TableStylesProvider value={styles}>
        <chakra.table
          ref={ref}
          {...rootProps}
          __css={{ tableLayout: layout, ...styles.root }}
          className={cx("chakra-table", props.className)}
        />
      </TableStylesProvider>
    )
  },
)

TableRoot.displayName = "TableRoot"
