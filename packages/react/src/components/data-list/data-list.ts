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
  useStyles: useDataListStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "dataList" })

export { useDataListStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface DataListRootBaseProps
  extends SlotRecipeProps<"dataList">,
    UnstyledProp {}

export interface DataListRootProps
  extends HTMLChakraProps<"dl", DataListRootBaseProps> {}

export const DataListRoot = withProvider<HTMLDListElement, DataListRootProps>(
  "dl",
  "root",
)

export const DataListPropsProvider =
  PropsProvider as React.Provider<DataListRootBaseProps>

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
