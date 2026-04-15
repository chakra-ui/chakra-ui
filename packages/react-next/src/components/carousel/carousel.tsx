"use client"

import {
  Carousel as ArkCarousel,
  useCarouselContext,
} from "@ark-ui/react/carousel"
import { chakra, createSlotRecipeContext } from "@chakra-ui/styled-system/jsx"
import { carousel } from "@chakra-ui/styled-system/recipes"
import { type ComponentProps, forwardRef } from "react"

const { withProvider, withContext } = createSlotRecipeContext(carousel)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(ArkCarousel.Root, "root")

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider(ArkCarousel.RootProvider, "root")

export type ItemGroupProps = ComponentProps<typeof ItemGroup>
export const ItemGroup = withContext(ArkCarousel.ItemGroup, "itemGroup")

export type ItemProps = ComponentProps<typeof Item>
export const Item = withContext(ArkCarousel.Item, "item")

export type ControlProps = ComponentProps<typeof Control>
export const Control = withContext(ArkCarousel.Control, "control")

export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>
export const PrevTrigger = withContext(ArkCarousel.PrevTrigger, "prevTrigger")

export type NextTriggerProps = ComponentProps<typeof NextTrigger>
export const NextTrigger = withContext(ArkCarousel.NextTrigger, "nextTrigger")

export type IndicatorGroupProps = ComponentProps<typeof IndicatorGroup>
export const IndicatorGroup = withContext(
  ArkCarousel.IndicatorGroup,
  "indicatorGroup",
)

export type IndicatorProps = ComponentProps<typeof Indicator>
export const Indicator = withContext(ArkCarousel.Indicator, "indicator")

export type AutoplayTriggerProps = ComponentProps<typeof AutoplayTrigger>
export const AutoplayTrigger = withContext(
  ArkCarousel.AutoplayTrigger,
  "autoplayTrigger",
)

export interface IndicatorsProps extends Omit<IndicatorProps, "index"> {}

export const Indicators = forwardRef<HTMLDivElement, IndicatorsProps>(
  function Indicators(props, ref) {
    const api = useCarouselContext()
    return (
      <IndicatorGroup ref={ref}>
        {api.pageSnapPoints.map((_, index) => (
          <Indicator key={index} index={index} {...props} />
        ))}
      </IndicatorGroup>
    )
  },
)

export interface ProgressTextProps extends ComponentProps<typeof chakra.div> {}

export const ProgressText = forwardRef<HTMLDivElement, ProgressTextProps>(
  function ProgressText(props, ref) {
    const api = useCarouselContext()
    return (
      <chakra.div ref={ref} {...props}>
        {api.page + 1} / {api.pageSnapPoints.length}
      </chakra.div>
    )
  },
)

export { CarouselContext as Context } from "@ark-ui/react/carousel"
