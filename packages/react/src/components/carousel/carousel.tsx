"use client"

import type { Assign } from "@ark-ui/react"
import { Carousel as ArkCarousel } from "@ark-ui/react/carousel"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { ChevronLeftIcon, ChevronRightIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCarouselStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "carousel" })

export { useCarouselStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselRootProviderBaseProps
  extends Assign<
      ArkCarousel.RootProviderBaseProps,
      SlotRecipeProps<"carousel">
    >,
    UnstyledProp {}

export interface CarouselRootProviderProps
  extends HTMLChakraProps<"div", CarouselRootProviderBaseProps> {}

export const CarouselRootProvider = withProvider<
  HTMLDivElement,
  CarouselRootProviderProps
>(ArkCarousel.RootProvider, "root", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselRootBaseProps
  extends Assign<ArkCarousel.RootBaseProps, SlotRecipeProps<"carousel">>,
    UnstyledProp {}

export interface CarouselRootProps
  extends HTMLChakraProps<"div", CarouselRootBaseProps> {}

export const CarouselRoot = withProvider<HTMLDivElement, CarouselRootProps>(
  ArkCarousel.Root,
  "root",
  { forwardAsChild: true, forwardProps: ["page", "loop"] },
)

export const CarouselPropsProvider =
  PropsProvider as React.Provider<CarouselRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselItemGroupProps
  extends HTMLChakraProps<"div", ArkCarousel.ItemGroupBaseProps>,
    UnstyledProp {}

export const CarouselItemGroup = withContext<
  HTMLDivElement,
  CarouselItemGroupProps
>(ArkCarousel.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselItemProps
  extends HTMLChakraProps<"div", ArkCarousel.ItemBaseProps>,
    UnstyledProp {}

export const CarouselItem = withContext<HTMLDivElement, CarouselItemProps>(
  ArkCarousel.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselControlProps
  extends HTMLChakraProps<"div", ArkCarousel.ControlBaseProps>,
    UnstyledProp {}

export const CarouselControl = withContext<
  HTMLDivElement,
  CarouselControlProps
>(ArkCarousel.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselPrevTriggerProps
  extends HTMLChakraProps<"button", ArkCarousel.PrevTriggerBaseProps>,
    UnstyledProp {}

export const CarouselPrevTrigger = withContext<
  HTMLButtonElement,
  CarouselPrevTriggerProps
>(ArkCarousel.PrevTrigger, "prevTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <ChevronLeftIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselNextTriggerProps
  extends HTMLChakraProps<"button", ArkCarousel.NextTriggerBaseProps>,
    UnstyledProp {}

export const CarouselNextTrigger = withContext<
  HTMLButtonElement,
  CarouselNextTriggerProps
>(ArkCarousel.NextTrigger, "nextTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <ChevronRightIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////
export interface CarouselIndicatorsProps
  extends Omit<CarouselIndicatorProps, "index"> {
  count: number
}

export const CarouselIndicators = ({
  count,
  ...props
}: CarouselIndicatorsProps) => {
  return (
    <CarouselIndicatorGroup>
      {Array.from({ length: count }, (_, index) => (
        <CarouselIndicator
          key={index}
          index={index}
          aria-label={`Go to slide ${index + 1}`}
          {...props}
        />
      ))}
    </CarouselIndicatorGroup>
  )
}
////////////////////////////////////////////////////////////////////////////////////

export interface CarouselAutoplayTriggerProps
  extends HTMLChakraProps<"button", ArkCarousel.AutoplayTriggerBaseProps>,
    UnstyledProp {}

export const CarouselAutoplayTrigger = withContext<
  HTMLButtonElement,
  CarouselAutoplayTriggerProps
>(ArkCarousel.AutoplayTrigger, "autoplayTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselIndicatorGroupProps
  extends HTMLChakraProps<"div", ArkCarousel.IndicatorGroupBaseProps>,
    UnstyledProp {}

export const CarouselIndicatorGroup = withContext<
  HTMLDivElement,
  CarouselIndicatorGroupProps
>(ArkCarousel.IndicatorGroup, "indicatorGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselIndicatorProps
  extends HTMLChakraProps<"button", ArkCarousel.IndicatorBaseProps>,
    UnstyledProp {}

export const CarouselIndicator = withContext<
  HTMLButtonElement,
  CarouselIndicatorProps
>(ArkCarousel.Indicator, "indicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const CarouselContext = ArkCarousel.Context

export interface CarouselPageChangeDetails
  extends ArkCarousel.PageChangeDetails {}

export interface CarouselAutoplayStatusDetails
  extends ArkCarousel.AutoplayStatusDetails {}

export interface CarouselDragStatusDetails
  extends ArkCarousel.DragStatusDetails {}
