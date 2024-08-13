import type { SystemStyleObject } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  ProgressCircle as ChakraProgressCircle,
} from "@chakra-ui/react"

export const ProgressCircleRoot = ChakraProgressCircle.Root

interface ProgressCircleRingProps extends ChakraProgressCircle.CircleProps {
  trackColor?: SystemStyleObject["stroke"]
  cap?: SystemStyleObject["strokeLinecap"]
}

export const ProgressCircleRing = (props: ProgressCircleRingProps) => {
  const { trackColor, cap, color, ...rest } = props
  return (
    <ChakraProgressCircle.Circle {...rest}>
      <ChakraProgressCircle.Track stroke={trackColor} />
      <ChakraProgressCircle.Range stroke={color} strokeLinecap={cap} />
    </ChakraProgressCircle.Circle>
  )
}

export const ProgressCircleValueText = (
  props: ChakraProgressCircle.ValueTextProps,
) => {
  return (
    <AbsoluteCenter>
      <ChakraProgressCircle.ValueText {...props} />
    </AbsoluteCenter>
  )
}
