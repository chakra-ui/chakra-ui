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
  useStyles: useStatusStyles,
} = createSlotRecipeContext({ key: "status" })

export { useStatusStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface StatusRootBaseProps
  extends SlotRecipeProps<"status">,
    UnstyledProp {}

export interface StatusRootProps
  extends HTMLChakraProps<"div", StatusRootBaseProps> {}

export const StatusRoot = withProvider<HTMLDivElement, StatusRootProps>(
  "div",
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface StatusIndicatorProps extends HTMLChakraProps<"div"> {}

export const StatusIndicator = withContext<
  HTMLDivElement,
  StatusIndicatorProps
>("div", "indicator")
