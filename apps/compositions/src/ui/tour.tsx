"use client"

import { Button, Tour as ChakraTour, Portal } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"
import * as React from "react"

export interface TourProps extends ChakraTour.RootProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  contentProps?: ChakraTour.ContentProps
}

export const Tour = React.forwardRef<HTMLDivElement, TourProps>(
  function Tour(props, ref) {
    const {
      portalled = true,
      portalRef,
      contentProps,
      children,
      ...rest
    } = props
    const step = rest.tour.step

    return (
      <ChakraTour.Root {...rest}>
        <Portal disabled={!portalled} container={portalRef}>
          {step?.backdrop !== false && <ChakraTour.Backdrop />}
          <ChakraTour.Spotlight />
          <ChakraTour.Positioner>
            <ChakraTour.Content ref={ref} {...contentProps}>
              {step?.type === "tooltip" && step.arrow !== false && (
                <ChakraTour.Arrow>
                  <ChakraTour.ArrowTip />
                </ChakraTour.Arrow>
              )}
              <ChakraTour.CloseTrigger asChild>
                <CloseButton size="sm" />
              </ChakraTour.CloseTrigger>
              <ChakraTour.Title />
              <ChakraTour.Description />
              {children}
              <ChakraTour.Control>
                <ChakraTour.ProgressText />
                <TourActions />
              </ChakraTour.Control>
            </ChakraTour.Content>
          </ChakraTour.Positioner>
        </Portal>
      </ChakraTour.Root>
    )
  },
)

const TourActions = () => (
  <ChakraTour.Actions>
    {(actions) =>
      actions.map((action, index) => (
        <ChakraTour.ActionTrigger key={index} action={action} asChild>
          <Button
            size="sm"
            variant={index === actions.length - 1 ? "solid" : "outline"}
          >
            {action.label}
          </Button>
        </ChakraTour.ActionTrigger>
      ))
    }
  </ChakraTour.Actions>
)
