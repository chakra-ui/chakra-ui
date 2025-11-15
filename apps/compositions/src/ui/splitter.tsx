import { Splitter as ChakraSplitter } from "@chakra-ui/react"
import * as React from "react"

export interface SplitterProps extends ChakraSplitter.RootProps {
  orientation?: "horizontal" | "vertical"
}

export const Splitter = React.forwardRef<HTMLDivElement, SplitterProps>(
  function Splitter(props, ref) {
    const { orientation = "horizontal", children, ...rest } = props
    return (
      <ChakraSplitter.Root ref={ref} orientation={orientation} {...rest}>
        {children}
      </ChakraSplitter.Root>
    )
  },
)

export const SplitterPanel = React.forwardRef<
  HTMLDivElement,
  ChakraSplitter.PanelProps
>(function SplitterPanel(props, ref) {
  return <ChakraSplitter.Panel {...props} ref={ref} />
})

export const SplitterResizeTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraSplitter.ResizeTriggerProps
>(function SplitterResizeTrigger(props, ref) {
  return <ChakraSplitter.ResizeTrigger {...props} ref={ref} />
})

export const SplitterRoot = ChakraSplitter.Root
export const SplitterRootProvider = ChakraSplitter.RootProvider
export const SplitterPropsProvider = ChakraSplitter.PropsProvider
export const SplitterContext = ChakraSplitter.Context
