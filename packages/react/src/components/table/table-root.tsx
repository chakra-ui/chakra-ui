import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  SystemStyleObject,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { TableStylesProvider } from "./table-context"

export interface TableOptions {
  layout?: SystemStyleObject["tableLayout"]
}

export interface TableRootProps
  extends HTMLChakraProps<"table">,
    TableOptions,
    SystemRecipeProps<"Table"> {}

/**
 * The `Table` component is used to organize and display data efficiently. It renders a `<table>` element by default.
 *
 * @see Docs https://chakra-ui.com/docs/components/table
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/table/
 */
export const TableRoot = forwardRef<TableRootProps, "table">(
  function TableRoot(props, ref) {
    const recipe = useSlotRecipe("Table")

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const { layout, ...rootProps } = localProps

    return (
      <TableStylesProvider value={styles}>
        <chakra.table
          ref={ref}
          {...rootProps}
          css={{ tableLayout: layout, ...styles.root }}
          className={cx("chakra-table", props.className)}
        />
      </TableStylesProvider>
    )
  },
)

TableRoot.displayName = "TableRoot"
