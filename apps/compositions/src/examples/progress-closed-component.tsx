import { Progress as ChakraProgress } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"
import * as React from "react"

interface ProgressProps extends ChakraProgress.RootProps {
  showValueText?: boolean
  valueText?: React.ReactNode
  label?: React.ReactNode
  info?: React.ReactNode
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(props, ref) {
    const { showValueText, valueText, label, info, ...rest } = props
    return (
      <ChakraProgress.Root {...rest} ref={ref}>
        {label && (
          <ChakraProgress.Label>
            {label} {info && <InfoTip>{info}</InfoTip>}
          </ChakraProgress.Label>
        )}
        <ChakraProgress.Track>
          <ChakraProgress.Range />
        </ChakraProgress.Track>
        {showValueText && (
          <ChakraProgress.ValueText>{valueText}</ChakraProgress.ValueText>
        )}
      </ChakraProgress.Root>
    )
  },
)
