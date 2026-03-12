"use client"

import type { Assign } from "@ark-ui/react"
import {
  Carousel as ArkCarousel,
  useCarouselContext,
} from "@ark-ui/react/carousel"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { Box } from "../box"
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
  extends
    Assign<ArkCarousel.RootProviderBaseProps, SlotRecipeProps<"carousel">>,
    UnstyledProp {}

export interface CarouselRootProviderProps extends HTMLChakraProps<
  "div",
  CarouselRootProviderBaseProps
> {}

export const CarouselRootProvider = withProvider<
  HTMLDivElement,
  CarouselRootProviderProps
>(ArkCarousel.RootProvider, "root", {
  forwardAsChild: true,
})
CarouselRootProvider.displayName = "CarouselRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselRootBaseProps
  extends
    Assign<ArkCarousel.RootBaseProps, SlotRecipeProps<"carousel">>,
    UnstyledProp {}

export interface CarouselRootProps extends HTMLChakraProps<
  "div",
  CarouselRootBaseProps
> {}

export const CarouselRoot = withProvider<HTMLDivElement, CarouselRootProps>(
  ArkCarousel.Root,
  "root",
  {
    forwardAsChild: true,
    forwardProps: ["page", "loop"],
    defaultProps: {
      spacing: "1rem",
    },
  },
)
CarouselRoot.displayName = "CarouselRoot"

export const CarouselPropsProvider =
  PropsProvider as React.Provider<CarouselRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselItemGroupProps
  extends
    HTMLChakraProps<"div", ArkCarousel.ItemGroupBaseProps>,
    UnstyledProp {}

export const CarouselItemGroup = withContext<
  HTMLDivElement,
  CarouselItemGroupProps
>(ArkCarousel.ItemGroup, "itemGroup", { forwardAsChild: true })
CarouselItemGroup.displayName = "CarouselItemGroup"

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselItemProps
  extends HTMLChakraProps<"div", ArkCarousel.ItemBaseProps>, UnstyledProp {}

export const CarouselItem = withContext<HTMLDivElement, CarouselItemProps>(
  ArkCarousel.Item,
  "item",
  { forwardAsChild: true },
)
CarouselItem.displayName = "CarouselItem"

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselControlProps
  extends HTMLChakraProps<"div", ArkCarousel.ControlBaseProps>, UnstyledProp {}

export const CarouselControl = withContext<
  HTMLDivElement,
  CarouselControlProps
>(ArkCarousel.Control, "control", { forwardAsChild: true })
CarouselControl.displayName = "CarouselControl"

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselPrevTriggerProps
  extends
    HTMLChakraProps<"button", ArkCarousel.PrevTriggerBaseProps>,
    UnstyledProp {}

export const CarouselPrevTrigger = withContext<
  HTMLButtonElement,
  CarouselPrevTriggerProps
>(ArkCarousel.PrevTrigger, "prevTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <ChevronLeftIcon /> },
})
CarouselPrevTrigger.displayName = "CarouselPrevTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselNextTriggerProps
  extends
    HTMLChakraProps<"button", ArkCarousel.NextTriggerBaseProps>,
    UnstyledProp {}

export const CarouselNextTrigger = withContext<
  HTMLButtonElement,
  CarouselNextTriggerProps
>(ArkCarousel.NextTrigger, "nextTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <ChevronRightIcon /> },
})
CarouselNextTrigger.displayName = "CarouselNextTrigger"

////////////////////////////////////////////////////////////////////////////////////
export interface CarouselIndicatorsProps extends Omit<
  CarouselIndicatorProps,
  "index"
> {}

export const CarouselIndicators = forwardRef<
  HTMLDivElement,
  CarouselIndicatorsProps
>(function CarouselIndicators(props, ref) {
  const api = useCarouselContext()
  return (
    <CarouselIndicatorGroup ref={ref}>
      {api.pageSnapPoints.map((_, index) => (
        <CarouselIndicator key={index} index={index} {...props} />
      ))}
    </CarouselIndicatorGroup>
  )
})
CarouselIndicators.displayName = "CarouselIndicators"

//////////////////////////////////////////////////////////////////////

export interface CarouselAutoplayIndicatorProps {
  play: React.ReactNode
  paused: React.ReactNode
}

export const CarouselAutoplayIndicator = ({
  play,
  paused,
}: CarouselAutoplayIndicatorProps) => {
  const api = useCarouselContext()
  return <>{api.isPlaying ? paused : play}</>
}
CarouselAutoplayIndicator.displayName = "CarouselAutoplayIndicator"

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselProgressTextProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const CarouselProgressText = forwardRef<
  HTMLDivElement,
  CarouselProgressTextProps
>(function CarouselProgressText(props, ref) {
  const api = useCarouselContext()
  return (
    <Box ref={ref} {...props}>
      {api.page + 1} / {api.pageSnapPoints.length}
    </Box>
  )
})
CarouselProgressText.displayName = "CarouselProgressText"

export interface CarouselAutoplayTriggerProps
  extends
    HTMLChakraProps<"button", ArkCarousel.AutoplayTriggerBaseProps>,
    UnstyledProp {}

export const CarouselAutoplayTrigger = withContext<
  HTMLButtonElement,
  CarouselAutoplayTriggerProps
>(ArkCarousel.AutoplayTrigger, "autoplayTrigger", { forwardAsChild: true })
CarouselAutoplayTrigger.displayName = "CarouselAutoplayTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselIndicatorGroupProps
  extends
    HTMLChakraProps<"div", ArkCarousel.IndicatorGroupBaseProps>,
    UnstyledProp {}

export const CarouselIndicatorGroup = withContext<
  HTMLDivElement,
  CarouselIndicatorGroupProps
>(ArkCarousel.IndicatorGroup, "indicatorGroup", { forwardAsChild: true })
CarouselIndicatorGroup.displayName = "CarouselIndicatorGroup"

////////////////////////////////////////////////////////////////////////////////////

export interface CarouselIndicatorProps
  extends
    HTMLChakraProps<"button", ArkCarousel.IndicatorBaseProps>,
    UnstyledProp {}

export const CarouselIndicator = withContext<
  HTMLButtonElement,
  CarouselIndicatorProps
>(ArkCarousel.Indicator, "indicator", { forwardAsChild: true })
CarouselIndicator.displayName = "CarouselIndicator"

////////////////////////////////////////////////////////////////////////////////////

export const CarouselContext = ArkCarousel.Context

export interface CarouselPageChangeDetails
  extends ArkCarousel.PageChangeDetails {}

export interface CarouselAutoplayStatusDetails
  extends ArkCarousel.AutoplayStatusDetails {}

export interface CarouselDragStatusDetails
  extends ArkCarousel.DragStatusDetails {}
