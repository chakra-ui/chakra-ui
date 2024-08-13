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
} = createSlotRecipeContext("status")

export { useStatusStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface StatusRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"status">,
    UnstyledProp {}

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
