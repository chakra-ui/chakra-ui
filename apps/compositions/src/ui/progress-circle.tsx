"use client"

import type { SystemStyleObject } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  ProgressCircle as ChakraProgressCircle,
  useProgressContext,
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
  const progress = useProgressContext()
  return (
    <AbsoluteCenter>
      <ChakraProgressCircle.ValueText {...props}>
        {props.children ?? progress.percentAsString}
      </ChakraProgressCircle.ValueText>
    </AbsoluteCenter>
  )
}
