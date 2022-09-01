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

export interface TableOptions {}

export interface TableProps
  extends HTMLChakraProps<"table">,
    TableOptions,
    ThemingProps<"Table"> {}

export const Table = forwardRef<TableProps, "table">((props, ref) => {
  const styles = useMultiStyleConfig("Table", props)
  const { className, ...tableProps } = omitThemingProps(props)

  return (
    <TableStylesProvider value={styles}>
      <chakra.table
        role="table"
        ref={ref}
        __css={styles.table}
        className={cx("chakra-table", className)}
        {...tableProps}
      />
    </TableStylesProvider>
  )
})

Table.displayName = "Table"
