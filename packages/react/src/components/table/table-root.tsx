"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef, useMemo } from "react"
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
    SlotRecipeProps<"Table"> {
  /**
   * If `true`, the table will style its descendants with nested selectors
   */
  native?: boolean
}

/**
 * The `Table` component is used to organize and display data efficiently. It renders a `<table>` element by default.
 *
 * @see Docs https://chakra-ui.com/docs/components/table
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/table/
 */
export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(
  function TableRoot({ unstyled, native, ...props }, ref) {
    const recipe = useSlotRecipe("Table", props.recipe)

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const { layout, ...rootProps } = localProps

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

    if (native) {
      return (
        <chakra.table
          ref={ref}
          {...rootProps}
          tableLayout={layout}
          css={[rootCss, props.css]}
          className={cx("chakra-table", props.className)}
        />
      )
    }

    return (
      <TableStylesProvider value={styles}>
        <chakra.table
          ref={ref}
          {...rootProps}
          tableLayout={layout}
          css={[rootCss, props.css]}
          className={cx("chakra-table", props.className)}
        />
      </TableStylesProvider>
    )
  },
)

TableRoot.displayName = "TableRoot"
