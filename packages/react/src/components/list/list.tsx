"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useListStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "list" })

export { useListStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ListRootBaseProps
  extends SlotRecipeProps<"list">,
    UnstyledProp {}

export interface ListRootProps
  extends HTMLChakraProps<"ul", ListRootBaseProps> {}

export const ListRoot = withProvider<HTMLUListElement, ListRootProps>(
  "ul",
  "root",
  { defaultProps: { role: "list" } },
)

export const ListRootPropsProvider =
  PropsProvider as React.Provider<ListRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ListItemProps extends HTMLChakraProps<"li"> {}

export const ListItem = withContext<HTMLLIElement, ListItemProps>("li", "item")

////////////////////////////////////////////////////////////////////////////////////

export interface ListIndicatorProps extends HTMLChakraProps<"span"> {}

export const ListIndicator = withContext<HTMLSpanElement, ListIndicatorProps>(
  "span",
  "indicator",
)
