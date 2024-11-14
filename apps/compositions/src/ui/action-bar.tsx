import { ActionBar, Portal } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"
import * as React from "react"

interface ActionBarContentProps extends ActionBar.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const ActionBarContent = React.forwardRef<
  HTMLDivElement,
  ActionBarContentProps
>(function ActionBarContent(props, ref) {
  const { children, portalled = true, portalRef, ...rest } = props

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ActionBar.Positioner>
        <ActionBar.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ActionBar.Content>
      </ActionBar.Positioner>
    </Portal>
  )
})

export const ActionBarCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ActionBar.CloseTriggerProps
>(function ActionBarCloseTrigger(props, ref) {
  return (
    <ActionBar.CloseTrigger {...props} asChild ref={ref}>
      <CloseButton size="sm" />
    </ActionBar.CloseTrigger>
  )
})

export const ActionBarRoot = ActionBar.Root
export const ActionBarSelectionTrigger = ActionBar.SelectionTrigger
export const ActionBarSeparator = ActionBar.Separator
