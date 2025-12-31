"use client"

import { Tour as ChakraTour } from "@chakra-ui/react"
import * as React from "react"

export const TourRoot = React.forwardRef<HTMLDivElement, ChakraTour.RootProps>(
  function TourRoot(props, ref) {
    return <ChakraTour.Root {...props} ref={ref} />
  },
)

export const TourBackdrop = React.forwardRef<
  HTMLDivElement,
  ChakraTour.BackdropProps
>(function TourBackdrop(props, ref) {
  return <ChakraTour.Backdrop {...props} ref={ref} />
})

export const TourSpotlight = React.forwardRef<
  HTMLDivElement,
  ChakraTour.SpotlightProps
>(function TourSpotlight(props, ref) {
  return <ChakraTour.Spotlight {...props} ref={ref} />
})

export const TourPositioner = React.forwardRef<
  HTMLDivElement,
  ChakraTour.PositionerProps
>(function TourPositioner(props, ref) {
  return <ChakraTour.Positioner {...props} ref={ref} />
})

export const TourContent = React.forwardRef<
  HTMLDivElement,
  ChakraTour.ContentProps
>(function TourContent(props, ref) {
  return <ChakraTour.Content {...props} ref={ref} />
})

export const TourArrow = React.forwardRef<
  HTMLDivElement,
  ChakraTour.ArrowProps
>(function TourArrow(props, ref) {
  return <ChakraTour.Arrow {...props} ref={ref} />
})

export const TourArrowTip = React.forwardRef<
  HTMLDivElement,
  ChakraTour.ArrowTipProps
>(function TourArrowTip(props, ref) {
  return <ChakraTour.ArrowTip {...props} ref={ref} />
})

export const TourTitle = React.forwardRef<
  HTMLDivElement,
  ChakraTour.TitleProps
>(function TourTitle(props, ref) {
  return <ChakraTour.Title {...props} ref={ref} />
})

export const TourDescription = React.forwardRef<
  HTMLDivElement,
  ChakraTour.DescriptionProps
>(function TourDescription(props, ref) {
  return <ChakraTour.Description {...props} ref={ref} />
})

export const TourControl = React.forwardRef<
  HTMLDivElement,
  ChakraTour.ControlProps
>(function TourControl(props, ref) {
  return <ChakraTour.Control {...props} ref={ref} />
})

export const TourProgressText = React.forwardRef<
  HTMLDivElement,
  ChakraTour.ProgressTextProps
>(function TourProgressText(props, ref) {
  return <ChakraTour.ProgressText {...props} ref={ref} />
})

export const TourCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraTour.CloseTriggerProps
>(function TourCloseTrigger(props, ref) {
  return <ChakraTour.CloseTrigger {...props} ref={ref} />
})

export const TourActionTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraTour.ActionTriggerProps
>(function TourActionTrigger(props, ref) {
  return <ChakraTour.ActionTrigger {...props} ref={ref} />
})

export const TourContext = ChakraTour.Context
export const TourRootProvider = ChakraTour.RootProvider
