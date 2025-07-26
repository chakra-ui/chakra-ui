"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { CloseIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useTagStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "tag" })

export { useTagStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TagRootBaseProps
  extends SlotRecipeProps<"tag">,
    UnstyledProp {}

export interface TagRootProps
  extends HTMLChakraProps<"span", TagRootBaseProps> {}

export const TagRoot = withProvider<HTMLSpanElement, TagRootProps>(
  "div",
  "root",
)

export const TagRootPropsProvider =
  PropsProvider as React.Provider<TagRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface TagLabelProps extends HTMLChakraProps<"span">, UnstyledProp {}

export const TagLabel = withContext<HTMLSpanElement, TagLabelProps>(
  "span",
  "label",
)

////////////////////////////////////////////////////////////////////////////////////

export interface TagCloseTriggerProps
  extends HTMLChakraProps<"button">,
    UnstyledProp {}

export const TagCloseTrigger = withContext<
  HTMLButtonElement,
  TagCloseTriggerProps
>("button", "closeTrigger", { defaultProps: { children: <CloseIcon /> } })

////////////////////////////////////////////////////////////////////////////////////

export interface TagStartElementProps
  extends HTMLChakraProps<"span">,
    UnstyledProp {}

export const TagStartElement = withContext<
  HTMLSpanElement,
  TagStartElementProps
>("span", "startElement")

////////////////////////////////////////////////////////////////////////////////////

export interface TagEndElementProps
  extends HTMLChakraProps<"span">,
    UnstyledProp {}

export const TagEndElement = withContext<HTMLSpanElement, TagEndElementProps>(
  "span",
  "endElement",
)
