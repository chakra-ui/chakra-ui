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

//////////////////////////////////////////////////////////////////////////////////

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
  style?: React.CSSProperties
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
    Assign<ArkMarquee.EdgeBaseProps, UnstyledProp> {
  side: "start" | "end" | "top" | "bottom"
}

export const MarqueeEdge = withContext<HTMLDivElement, MarqueeEdgeProps>(
  ArkMarquee.Edge,
  "edge",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeHeaderProps
  extends HTMLChakraProps<"header">,
    UnstyledProp {}

export const MarqueeHeader = withContext<HTMLElement, MarqueeHeaderProps>(
  "header",
  "header",
)

////////////////////////////////////////////////////////////////////////////////////
export interface MarqueeLabelProps
  extends HTMLChakraProps<"label">,
    UnstyledProp {}

export const MarqueeLabel = withContext<HTMLLabelElement, MarqueeLabelProps>(
  "label",
  "label",
)

////////////////////////////////////////////////////////////////////////////////////

export interface MarqueeDescriptionProps
  extends HTMLChakraProps<"p">,
    UnstyledProp {}

export const MarqueeDescription = withContext<
  HTMLParagraphElement,
  MarqueeDescriptionProps
>("p", "description")

export interface MarqueeControlProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const MarqueeControl = withContext<HTMLDivElement, MarqueeControlProps>(
  "div",
  "control",
)
