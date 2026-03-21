"use client"

import type { Assign } from "@ark-ui/react"
import { Marquee as ArkMarquee } from "@ark-ui/react/marquee"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withContext,
  useStyles: useMarqueeStyles,
  PropsProvider,
  withProvider,
} = createSlotRecipeContext({ key: "marquee" })

export { useMarqueeStyles }

//////////////////////////////////////////////////////////////////////////////////

export interface MarqueeRootProviderBaseProps
  extends
    Assign<ArkMarquee.RootProviderBaseProps, SlotRecipeProps<"marquee">>,
    UnstyledProp {}

export interface MarqueeRootProviderProps extends MarqueeRootProviderBaseProps {
  children: React.ReactNode
}

export const MarqueeRootProvider = withProvider<
  HTMLDivElement,
  MarqueeRootProviderProps
>(ArkMarquee.RootProvider, "root")

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeRootBaseProps
  extends
    Assign<ArkMarquee.RootBaseProps, SlotRecipeProps<"marquee">>,
    UnstyledProp {}

export interface MarqueeRootProps extends HTMLChakraProps<
  "div",
  MarqueeRootBaseProps
> {}

export const MarqueeRoot = withProvider<HTMLDivElement, MarqueeRootProps>(
  ArkMarquee.Root,
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export const MarqueePropsProvider =
  PropsProvider as React.Provider<MarqueeRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeContentProps
  extends HTMLChakraProps<"div", ArkMarquee.ContentBaseProps>, UnstyledProp {}

export const MarqueeContent = withContext<HTMLDivElement, MarqueeContentProps>(
  ArkMarquee.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeViewportProps
  extends HTMLChakraProps<"div", ArkMarquee.ViewportBaseProps>, UnstyledProp {}

export const MarqueeViewport = withContext<
  HTMLDivElement,
  MarqueeViewportProps
>(ArkMarquee.Viewport, "viewport", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeItemProps
  extends HTMLChakraProps<"div", ArkMarquee.ItemBaseProps>, UnstyledProp {}

export const MarqueeItem = withContext<HTMLDivElement, MarqueeItemProps>(
  ArkMarquee.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeEdgeProps
  extends
    HTMLChakraProps<"div">,
    Assign<ArkMarquee.EdgeBaseProps, UnstyledProp> {}

export const MarqueeEdge = withContext<HTMLDivElement, MarqueeEdgeProps>(
  ArkMarquee.Edge,
  "edge",
)
