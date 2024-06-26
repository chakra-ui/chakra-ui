import { ActionBar as ChakraActionBar, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

interface ActionBarContentProps extends ChakraActionBar.ContentProps {
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
  showArrow?: boolean
}

export const ActionBarContent = forwardRef<
  HTMLDivElement,
  ActionBarContentProps
>(function ActionBarContent(props, ref) {
  const { children, portalled = true, containerRef, showArrow, ...rest } = props

  return (
    <Portal disabled={!portalled} container={containerRef}>
      <ChakraActionBar.Positioner>
        <ChakraActionBar.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraActionBar.Content>
      </ChakraActionBar.Positioner>
    </Portal>
  )
})

export const ActionBarRoot = ChakraActionBar.Root
export const ActionBarSelectionTrigger = ChakraActionBar.SelectionTrigger
export const ActionBarSeparator = ChakraActionBar.Separator
