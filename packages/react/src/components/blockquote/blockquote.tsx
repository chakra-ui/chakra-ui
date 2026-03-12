"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { QuoteIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useBlockquoteStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "blockquote" })

export { useBlockquoteStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface BlockquoteRootBaseProps
  extends SlotRecipeProps<"blockquote">, UnstyledProp {}

export interface BlockquoteRootProps extends HTMLChakraProps<
  "figure",
  BlockquoteRootBaseProps
> {}

export const BlockquoteRoot = withProvider<HTMLElement, BlockquoteRootProps>(
  "figure",
  "root",
)
BlockquoteRoot.displayName = "BlockquoteRoot"

////////////////////////////////////////////////////////////////////////////////////

export const BlockquotePropsProvider =
  PropsProvider as React.Provider<BlockquoteRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface BlockquoteContentProps
  extends HTMLChakraProps<"blockquote">, UnstyledProp {}

export const BlockquoteContent = withContext<
  HTMLElement,
  BlockquoteContentProps
>("blockquote", "content")
BlockquoteContent.displayName = "BlockquoteContent"

////////////////////////////////////////////////////////////////////////////////////

export interface BlockquoteCaptionProps
  extends HTMLChakraProps<"figcaption">, UnstyledProp {}

export const BlockquoteCaption = withContext<
  HTMLElement,
  BlockquoteCaptionProps
>("figcaption", "caption")
BlockquoteCaption.displayName = "BlockquoteCaption"

////////////////////////////////////////////////////////////////////////////////////

export interface BlockquoteIconProps
  extends HTMLChakraProps<"svg">, UnstyledProp {}

export const BlockquoteIcon = withContext<SVGElement, BlockquoteIconProps>(
  QuoteIcon,
  "icon",
)
BlockquoteIcon.displayName = "BlockquoteIcon"
