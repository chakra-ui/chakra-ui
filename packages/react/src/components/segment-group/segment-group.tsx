"use client"

import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/react/segment-group"
import type { Assign } from "@chakra-ui/utils"
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
} = createSlotRecipeContext({ key: "segmentGroup" })

export { useSegmentGroupStyles }

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
