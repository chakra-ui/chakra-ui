"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"
import { QuoteIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useBlockquoteStyles,
} = createStyleContext("blockquote")

export { useBlockquoteStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface BlockquoteRootProps
  extends HTMLChakraProps<"figure">,
    SlotRecipeProps<"blockquote">,
    UnstyledProp {}

export const BlockquoteRoot = withProvider<HTMLElement, BlockquoteRootProps>(
  "figure",
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface BlockquoteContentProps extends HTMLChakraProps<"blockquote"> {}

export const BlockquoteContent = withContext<
  HTMLElement,
  BlockquoteContentProps
>("blockquote", "content")

////////////////////////////////////////////////////////////////////////////////////

export interface BlockquoteCaptionProps extends HTMLChakraProps<"figcaption"> {}

export const BlockquoteCaption = withContext<
  HTMLElement,
  BlockquoteCaptionProps
>("figcaption", "caption")

////////////////////////////////////////////////////////////////////////////////////

export interface BlockquoteIconProps extends HTMLChakraProps<"svg"> {}

export const BlockquoteIcon = withContext<SVGElement, BlockquoteIconProps>(
  QuoteIcon,
  "icon",
)
