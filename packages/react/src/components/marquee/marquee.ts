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
  withRootProvider,
  withContext,
  useStyles: useMarqueeStyles,
  PropsProvider,
  withProvider,
} = createSlotRecipeContext({ key: "marquee" })

export { useMarqueeStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeRootProviderBaseProps
  extends Assign<ArkMarquee.RootProviderBaseProps, SlotRecipeProps<"marquee">>,
    UnstyledProp {}

export interface MarqueeRootProviderProps extends MarqueeRootProviderBaseProps {
  children: React.ReactNode
}

export const MarqueeRootProvider = withRootProvider<MarqueeRootProviderProps>(
  ArkMarquee.RootProvider,
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeRootBaseProps
  extends Assign<ArkMarquee.RootBaseProps, SlotRecipeProps<"marquee">>,
    UnstyledProp {}

export interface MarqueeRootProps extends MarqueeRootBaseProps {
  children: React.ReactNode
}

export const MarqueeRoot = withProvider<HTMLDivElement, MarqueeRootProps>(
  ArkMarquee.Root,
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export const MarqueePropsProvider =
  PropsProvider as React.Provider<MarqueeRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeContentProps
  extends HTMLChakraProps<"div", ArkMarquee.ContentBaseProps>,
    UnstyledProp {}

export const MarqueeContent = withContext<HTMLDivElement, MarqueeContentProps>(
  ArkMarquee.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeFooterProps
  extends HTMLChakraProps<"footer">,
    UnstyledProp {}

export const MarqueeFooter = withContext<HTMLDivElement, MarqueeFooterProps>(
  "footer",
  "footer",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeBodyProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const MarqueeBody = withContext<HTMLDivElement, MarqueeBodyProps>(
  "div",
  "body",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeViewportProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const MarqueeViewport = withContext<
  HTMLDivElement,
  MarqueeViewportProps
>(ArkMarquee.Viewport, "viewport", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeItemProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const MarqueeItem = withContext<HTMLDivElement, MarqueeItemProps>(
  ArkMarquee.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeEdgeProps
  extends HTMLChakraProps<"div">,
    Assign<ArkMarquee.EdgeBaseProps, UnstyledProp> {}

export const MarqueeEdge = withContext<HTMLDivElement, MarqueeEdgeProps>(
  ArkMarquee.Edge,
  "edge",
)

////////////////////////////////////////////////////////////////////////////////////

export { useMarquee, useMarqueeContext } from "@ark-ui/react/marquee"

export type {
  UseMarqueeProps,
  UseMarqueeReturn,
  UseMarqueeContext,
} from "@ark-ui/react/marquee"
