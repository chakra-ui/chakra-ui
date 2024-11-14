import { Progress as ChakraProgress } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"
import * as React from "react"

export const ProgressBar = React.forwardRef<
  HTMLDivElement,
  ChakraProgress.TrackProps
>(function ProgressBar(props, ref) {
  return (
    <ChakraProgress.Track {...props} ref={ref}>
      <ChakraProgress.Range />
    </ChakraProgress.Track>
  )
})

export interface ProgressLabelProps extends ChakraProgress.LabelProps {
  info?: React.ReactNode
}

export const ProgressLabel = React.forwardRef<
  HTMLDivElement,
  ProgressLabelProps
>(function ProgressLabel(props, ref) {
  const { children, info, ...rest } = props
  return (
    <ChakraProgress.Label {...rest} ref={ref}>
      {children}
      {info && <InfoTip>{info}</InfoTip>}
    </ChakraProgress.Label>
  )
})

export const ProgressRoot = ChakraProgress.Root
export const ProgressValueText = ChakraProgress.ValueText
