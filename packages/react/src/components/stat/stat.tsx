"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"
import { createIcon } from "../icon"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useStatStyles,
} = createStyleContext("stat")

export { useStatStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface StatRootProps
  extends HTMLChakraProps<"dl">,
    SlotRecipeProps<"stat">,
    UnstyledProp {}

export const StatRoot = withProvider<HTMLDListElement, StatRootProps>(
  "dl",
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface StatLabelProps extends HTMLChakraProps<"dt"> {}

export const StatLabel = withContext<HTMLElement, StatLabelProps>("dt", "label")

////////////////////////////////////////////////////////////////////////////////////

export interface StatValueTextProps extends HTMLChakraProps<"dd"> {}

export const StatValueText = withContext<HTMLElement, StatValueTextProps>(
  "dd",
  "valueText",
)

////////////////////////////////////////////////////////////////////////////////////

export interface StatHelpTextProps extends HTMLChakraProps<"span"> {}

export const StatHelpText = withContext<HTMLElement, StatHelpTextProps>(
  "span",
  "helpText",
)

////////////////////////////////////////////////////////////////////////////////////

const UpIcon = createIcon({
  d: "M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z",
})

export interface StatUpIndicatorProps extends HTMLChakraProps<"span"> {}

export const StatUpIndicator = withContext<HTMLElement, StatUpIndicatorProps>(
  "span",
  "indicator",
  {
    defaultProps: {
      "data-type": "up",
      children: <UpIcon />,
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

const DownIcon = createIcon({
  d: "M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z",
})

export interface StatDownIndicatorProps extends HTMLChakraProps<"span"> {}

export const StatDownIndicator = withContext<
  HTMLElement,
  StatDownIndicatorProps
>("span", "indicator", {
  defaultProps: {
    "data-type": "down",
    children: <DownIcon />,
  },
})
