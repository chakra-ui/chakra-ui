import { ConfigStyle } from "@styled-system/core"

export * from "./positive-or-negative"
export * from "./types"

export const toProperty = (
  scale: string,
  property: ConfigStyle["property"],
): ConfigStyle => ({
  scale,
  property,
})

/**
 * @todo
 * Either deprecate the `d` style prop 'coz it clashes with `<chakra.path d="..." />`
 * or write some logic to determine whether we use `display` or `d` as the property
 * base on this function.
 */
export const isValidDisplayValue = (value: string) =>
  `inline|block|contents|flex|grid|inline-block|inline-flex|inline-grid|inline-table|list-item|run-in|table|table-caption|table-column-group|table-header-group|table-footer-group|table-row-group|table-cell|table-column|table-row|none|initial|inherit`.includes(
    value,
  )
