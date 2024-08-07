"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"
import { CloseIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useTagStyles,
} = createStyleContext("tag")

export { useTagStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TagRootProps
  extends HTMLChakraProps<"span">,
    SlotRecipeProps<"tag">,
    UnstyledProp {}

export const TagRoot = withProvider<HTMLSpanElement, TagRootProps>(
  "div",
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface TagLabelProps extends HTMLChakraProps<"span"> {}

export const TagLabel = withContext<HTMLSpanElement, TagLabelProps>(
  "span",
  "label",
)

////////////////////////////////////////////////////////////////////////////////////

export interface TagCloseTriggerProps extends HTMLChakraProps<"button"> {}

export const TagCloseTrigger = withContext<
  HTMLButtonElement,
  TagCloseTriggerProps
>("button", "closeTrigger", { defaultProps: { children: <CloseIcon /> } })
