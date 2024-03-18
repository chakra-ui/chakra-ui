import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  SystemStyleObject,
  UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { TableStylesProvider } from "./table-context"

export interface TableOptions {
  layout?: SystemStyleObject["tableLayout"]
}

export interface TableRootProps
  extends HTMLChakraProps<"table">,
    TableOptions,
    UnstyledProp,
    SlotRecipeProps<"Table"> {}

/**
 * The `Table` component is used to organize and display data efficiently. It renders a `<table>` element by default.
 *
 * @see Docs https://chakra-ui.com/docs/components/table
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/table/
 */
export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(
  function TableRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Table", props.recipe)

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const { layout, ...rootProps } = localProps

    return (
      <TableStylesProvider value={styles}>
        <chakra.table
          ref={ref}
          {...rootProps}
          tableLayout={layout}
          css={[styles.root, props.css]}
          className={cx("chakra-table", props.className)}
        />
      </TableStylesProvider>
    )
  },
)

TableRoot.displayName = "TableRoot"
