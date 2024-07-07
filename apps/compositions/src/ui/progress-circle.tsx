import { ProgressCircle as ChakraProgressCircle } from "@chakra-ui/react"
import type { SystemStyleObject } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface ProgressCircleProps extends ChakraProgressCircle.RootProps {
  showValue?: boolean
  trackColor?: SystemStyleObject["stroke"]
  capIsRound?: boolean
}

export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  function ProgressCircle(props, ref) {
    const { showValue, trackColor, capIsRound, color, ...rest } = props
    return (
      <ChakraProgressCircle.Root ref={ref} valuePlacement="center" {...rest}>
        {showValue && (
          <ChakraProgressCircle.ValueText>
            {props.value}
          </ChakraProgressCircle.ValueText>
        )}
        <ChakraProgressCircle.Circle>
          <ChakraProgressCircle.Track stroke={trackColor} />
          <ChakraProgressCircle.Range
            stroke={color}
            strokeLinecap={capIsRound ? "round" : undefined}
          />
        </ChakraProgressCircle.Circle>
      </ChakraProgressCircle.Root>
    )
  },
)
