import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
  SystemStyleObject,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { createContext } from "@chakra-ui/react-context"

const [TableStylesProvider, useTableStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TableStylesContext`,
  errorMessage: `useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `,
})

export { useTableStyles }

export interface TableOptions {
  layout?: SystemStyleObject["tableLayout"]
}

export interface TableProps
  extends HTMLChakraProps<"table">,
    TableOptions,
    ThemingProps<"Table"> {}

/**
 * The `Table` component is used to organize and display data efficiently. It renders a `<table>` element by default.
 *
 * @see Docs https://chakra-ui.com/docs/components/table
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/table/
 */
export const Table = forwardRef<TableProps, "table">((props, ref) => {
  const styles = useMultiStyleConfig("Table", props)
  const { className, layout, ...tableProps } = omitThemingProps(props)

  return (
    <TableStylesProvider value={styles}>
      <chakra.table
        ref={ref}
        __css={{ tableLayout: layout, ...styles.table }}
        className={cx("chakra-table", className)}
        {...tableProps}
      />
    </TableStylesProvider>
  )
})

Table.displayName = "Table"
