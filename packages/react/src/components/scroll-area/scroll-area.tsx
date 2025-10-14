"use client"

import type { Assign } from "@ark-ui/react"
import { ScrollArea as ArkScrollArea } from "@ark-ui/react/scroll-area"
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
  useStyles: useScrollAreaStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "scrollArea" })

export { useScrollAreaStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ScrollAreaRootProviderBaseProps
  extends Assign<
      ArkScrollArea.RootProviderBaseProps,
      SlotRecipeProps<"scrollArea">
    >,
    UnstyledProp {}

export interface ScrollAreaRootProviderProps
  extends HTMLChakraProps<"div", ScrollAreaRootProviderBaseProps> {}

export const ScrollAreaRootProvider = withProvider<
  HTMLDivElement,
  ScrollAreaRootProviderProps
>(ArkScrollArea.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ScrollAreaRootBaseProps
  extends Assign<ArkScrollArea.RootBaseProps, SlotRecipeProps<"scrollArea">>,
    UnstyledProp {}

export interface ScrollAreaRootProps
  extends HTMLChakraProps<"div", ScrollAreaRootBaseProps> {}

export const ScrollAreaRoot = withProvider<HTMLDivElement, ScrollAreaRootProps>(
  ArkScrollArea.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const ScrollAreaPropsProvider =
  PropsProvider as React.Provider<ScrollAreaRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ScrollAreaViewportProps
  extends HTMLChakraProps<"div", ArkScrollArea.ViewportBaseProps>,
    UnstyledProp {}

export const ScrollAreaViewport = withContext<
  HTMLDivElement,
  ScrollAreaViewportProps
>(ArkScrollArea.Viewport, "viewport", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ScrollAreaContentProps
  extends HTMLChakraProps<"div", ArkScrollArea.ContentBaseProps>,
    UnstyledProp {}

export const ScrollAreaContent = withContext<
  HTMLDivElement,
  ScrollAreaContentProps
>(ArkScrollArea.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ScrollAreaThumbProps
  extends HTMLChakraProps<"div", ArkScrollArea.ThumbBaseProps>,
    UnstyledProp {}

export const ScrollAreaThumb = withContext<
  HTMLDivElement,
  ScrollAreaThumbProps
>(ArkScrollArea.Thumb, "thumb", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ScrollAreaScrollbarProps
  extends HTMLChakraProps<"div", ArkScrollArea.ScrollbarBaseProps>,
    UnstyledProp {}

export const ScrollAreaScrollbar = withContext<
  HTMLDivElement,
  ScrollAreaScrollbarProps
>(ArkScrollArea.Scrollbar, "scrollbar", {
  forwardAsChild: true,
  defaultProps: {
    children: <ScrollAreaThumb />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface ScrollAreaCornerProps
  extends HTMLChakraProps<"div", ArkScrollArea.CornerBaseProps>,
    UnstyledProp {}

export const ScrollAreaCorner = withContext<
  HTMLDivElement,
  ScrollAreaCornerProps
>(ArkScrollArea.Corner, "corner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const ScrollAreaContext = ArkScrollArea.Context
