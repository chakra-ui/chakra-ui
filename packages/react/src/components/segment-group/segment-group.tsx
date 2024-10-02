"use client"

import type { Assign } from "@ark-ui/react"
import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/react/segment-group"
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
  useStyles: useSegmentGroupStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "segmentGroup" })

export { useSegmentGroupStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupRootProviderBaseProps
  extends Assign<
      ArkSegmentGroup.RootProviderBaseProps,
      SlotRecipeProps<"segmentGroup">
    >,
    UnstyledProp {}

export interface SegmentGroupRootProviderProps
  extends HTMLChakraProps<"div", SegmentGroupRootProviderBaseProps> {}

export const SegmentGroupRootProvider = withProvider<
  HTMLDivElement,
  SegmentGroupRootProviderProps
>(ArkSegmentGroup.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupRootBaseProps
  extends Assign<
      ArkSegmentGroup.RootBaseProps,
      SlotRecipeProps<"segmentGroup">
    >,
    UnstyledProp {}

export interface SegmentGroupRootProps
  extends HTMLChakraProps<"div", SegmentGroupRootBaseProps> {}

export const SegmentGroupRoot = withProvider<
  HTMLDivElement,
  SegmentGroupRootProps
>(ArkSegmentGroup.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const SegmentGroupPropsProvider =
  PropsProvider as React.Provider<SegmentGroupRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupItemProps
  extends HTMLChakraProps<"label", ArkSegmentGroup.ItemBaseProps> {}

export const SegmentGroupItem = withContext<
  HTMLLabelElement,
  SegmentGroupItemProps
>(ArkSegmentGroup.Item, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupItemTextProps
  extends HTMLChakraProps<"span", ArkSegmentGroup.ItemTextBaseProps> {}

export const SegmentGroupItemText = withContext<
  HTMLSpanElement,
  SegmentGroupItemTextProps
>(ArkSegmentGroup.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupIndicatorProps
  extends HTMLChakraProps<"div", ArkSegmentGroup.IndicatorBaseProps> {}

export const SegmentGroupIndicator = withContext<
  HTMLSpanElement,
  SegmentGroupIndicatorProps
>(ArkSegmentGroup.Indicator, "indicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const SegmentGroupItemHiddenInput = ArkSegmentGroup.ItemHiddenInput

export const SegmentGroupContext = ArkSegmentGroup.Context
export const SegmentGroupItemContext = ArkSegmentGroup.ItemContext

export interface SegmentGroupValueChangeDetails
  extends ArkSegmentGroup.ValueChangeDetails {}
