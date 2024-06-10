"use client"

import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/react/segment-group"
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
  useStyles: useSegmentGroupStyles,
} = createStyleContext("SegmentGroup")

export { useSegmentGroupStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupRootProps
  extends HTMLChakraProps<"div", ArkSegmentGroup.RootProps>,
    SlotRecipeProps<"SegmentGroup">,
    UnstyledProp {}

export const SegmentGroupRoot = withProvider<
  HTMLDivElement,
  SegmentGroupRootProps
>(ArkSegmentGroup.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupItemProps
  extends HTMLChakraProps<"label", ArkSegmentGroup.ItemProps> {}

export const SegmentGroupItem = withContext<
  HTMLLabelElement,
  SegmentGroupItemProps
>(ArkSegmentGroup.Item, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupItemTextProps
  extends HTMLChakraProps<"span", ArkSegmentGroup.ItemTextProps> {}

export const SegmentGroupItemText = withContext<
  HTMLSpanElement,
  SegmentGroupItemTextProps
>(ArkSegmentGroup.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentGroupIndicatorProps
  extends HTMLChakraProps<"div", ArkSegmentGroup.IndicatorProps> {}

export const SegmentGroupIndicator = withContext<
  HTMLSpanElement,
  SegmentGroupIndicatorProps
>(ArkSegmentGroup.Indicator, "indicator", { forwardAsChild: true })
