import {
  FloatingPanel as ChakraFloatingPanel,
  IconButton,
  useFloatingPanelContext,
} from "@chakra-ui/react"
import * as React from "react"
import {
  LuGripHorizontal,
  LuMaximize2,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu"

type AnchorDetails = Parameters<
  NonNullable<ChakraFloatingPanel.RootProps["getAnchorPosition"]>
>[0]

// Restores the pre-minimize size when the panel reopens after being closed
// while minimized. persistRect keeps the shrunken height; this corrects it.
function SizeRestorer({
  size,
}: {
  size: React.RefObject<{ width: number; height: number } | null>
}) {
  const api = useFloatingPanelContext()
  React.useEffect(() => {
    if (!api.open || !size.current) return
    api.setSize(size.current)
    size.current = null
  }, [api.open])
  return null
}

export const FloatingPanelRoot = function FloatingPanelRoot(
  props: ChakraFloatingPanel.RootProps,
) {
  const anchorPos = React.useRef({ x: 0, y: 0 })
  const fullSize = React.useRef<{ width: number; height: number } | null>(null)
  const restoreSize = React.useRef<{ width: number; height: number } | null>(
    null,
  )
  const isMinimized = React.useRef(false)

  const { onStageChange, onSizeChange, onOpenChange, ...rest } = props

  const getAnchorPosition = React.useCallback((details: AnchorDetails) => {
    const rect = details.triggerRect
    if (!rect) return anchorPos.current
    anchorPos.current = { x: rect.left, y: rect.bottom + 8 }
    return anchorPos.current
  }, [])

  return (
    <ChakraFloatingPanel.Root
      persistRect
      getAnchorPosition={getAnchorPosition}
      onStageChange={(details) => {
        isMinimized.current = details.stage === "minimized"
        onStageChange?.(details)
      }}
      onSizeChange={(details) => {
        if (!isMinimized.current) fullSize.current = details.size
        onSizeChange?.(details)
      }}
      onOpenChange={(details) => {
        if (!details.open && isMinimized.current && fullSize.current) {
          restoreSize.current = fullSize.current
        }
        onOpenChange?.(details)
      }}
      {...rest}
    >
      <SizeRestorer size={restoreSize} />
      {props.children}
    </ChakraFloatingPanel.Root>
  )
}

interface FloatingPanelContentProps extends Omit<
  ChakraFloatingPanel.ContentProps,
  "title"
> {
  title?: React.ReactNode
  showMinimize?: boolean
  showMaximize?: boolean
}

export const FloatingPanelContent = React.forwardRef<
  HTMLDivElement,
  FloatingPanelContentProps
>(function FloatingPanelContent(props, ref) {
  const {
    title,
    showMinimize = true,
    showMaximize = true,
    children,
    ...rest
  } = props

  return (
    <ChakraFloatingPanel.Positioner>
      <ChakraFloatingPanel.Content ref={ref} {...rest}>
        <ChakraFloatingPanel.Header>
          <ChakraFloatingPanel.DragTrigger>
            <LuGripHorizontal />
            {title && (
              <ChakraFloatingPanel.Title>{title}</ChakraFloatingPanel.Title>
            )}
          </ChakraFloatingPanel.DragTrigger>
          <ChakraFloatingPanel.Control>
            <ChakraFloatingPanel.StageTrigger stage="default" asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Restore">
                <LuMaximize2 />
              </IconButton>
            </ChakraFloatingPanel.StageTrigger>
            {showMinimize && (
              <ChakraFloatingPanel.StageTrigger stage="minimized" asChild>
                <IconButton variant="ghost" size="2xs" aria-label="Minimize">
                  <LuMinus />
                </IconButton>
              </ChakraFloatingPanel.StageTrigger>
            )}
            {showMaximize && (
              <ChakraFloatingPanel.StageTrigger stage="maximized" asChild>
                <IconButton variant="ghost" size="2xs" aria-label="Maximize">
                  <LuSquare />
                </IconButton>
              </ChakraFloatingPanel.StageTrigger>
            )}
            <ChakraFloatingPanel.CloseTrigger asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Close">
                <LuX />
              </IconButton>
            </ChakraFloatingPanel.CloseTrigger>
          </ChakraFloatingPanel.Control>
        </ChakraFloatingPanel.Header>
        <ChakraFloatingPanel.Body>{children}</ChakraFloatingPanel.Body>
        <ChakraFloatingPanel.ResizeTriggers />
      </ChakraFloatingPanel.Content>
    </ChakraFloatingPanel.Positioner>
  )
})

export const FloatingPanelTrigger = ChakraFloatingPanel.Trigger
export const FloatingPanelBody = ChakraFloatingPanel.Body
export const FloatingPanelTitle = ChakraFloatingPanel.Title

export const FloatingPanel = {
  Root: FloatingPanelRoot,
  Content: FloatingPanelContent,
  Trigger: FloatingPanelTrigger,
  Body: FloatingPanelBody,
  Title: FloatingPanelTitle,
}
