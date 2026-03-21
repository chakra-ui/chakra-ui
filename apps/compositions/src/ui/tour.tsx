"use client"

import { Tour as ChakraTour } from "@chakra-ui/react"
import * as React from "react"

export const TourRoot = ChakraTour.Root
export const TourBackdrop = ChakraTour.Backdrop
export const TourSpotlight = ChakraTour.Spotlight
export const TourPositioner = ChakraTour.Positioner
export const TourTitle = ChakraTour.Title
export const TourDescription = ChakraTour.Description
export const TourControl = ChakraTour.Control
export const TourProgressText = ChakraTour.ProgressText
export const TourCloseTrigger = ChakraTour.CloseTrigger
export const TourActionTrigger = ChakraTour.ActionTrigger
export const TourContext = ChakraTour.Context
export const TourRootProvider = ChakraTour.RootProvider

interface TourContentProps extends ChakraTour.ContentProps {
  showArrow?: boolean
}

export const TourContent = React.forwardRef<HTMLDivElement, TourContentProps>(
  function TourContent(props, ref) {
    const { children, showArrow = true, ...rest } = props
    return (
      <ChakraTour.Positioner>
        <ChakraTour.Content ref={ref} {...rest}>
          {showArrow && (
            <ChakraTour.Arrow>
              <ChakraTour.ArrowTip />
            </ChakraTour.Arrow>
          )}
          <ChakraTour.CloseTrigger />
          {children}
        </ChakraTour.Content>
      </ChakraTour.Positioner>
    )
  },
)
