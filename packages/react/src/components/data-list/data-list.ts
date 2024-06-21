"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useDataListStyles,
} = createStyleContext("dataList")

export { useDataListStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface DataListRootProps
  extends HTMLChakraProps<"dl", SlotRecipeProps<"dataList">>,
    UnstyledProp {}

export const DataListRoot = withProvider<HTMLDListElement, DataListRootProps>(
  "dl",
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DataListItemProps extends HTMLChakraProps<"div"> {}

export const DataListItem = withContext<HTMLDivElement, DataListItemProps>(
  "div",
  "item",
)

////////////////////////////////////////////////////////////////////////////////////

export interface DataListItemLabelProps extends HTMLChakraProps<"dt"> {}

export const DataListItemLabel = withContext<
  HTMLDivElement,
  DataListItemLabelProps
>("dt", "itemLabel")

////////////////////////////////////////////////////////////////////////////////////

export interface DataListItemValueProps extends HTMLChakraProps<"dd"> {}

export const DataListItemValue = withContext<
  HTMLDivElement,
  DataListItemValueProps
>("dd", "itemValue")
