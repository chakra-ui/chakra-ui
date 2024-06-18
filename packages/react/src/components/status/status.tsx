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
  useStyles: useStatusStyles,
} = createStyleContext("status")

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
