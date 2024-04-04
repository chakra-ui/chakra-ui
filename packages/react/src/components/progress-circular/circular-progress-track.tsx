"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCircularProgressContext } from "./circular-progress-context"

export interface CircularProgressTrackProps extends HTMLChakraProps<"circle"> {}

export const CircularProgressTrack = forwardRef<
  SVGCircleElement,
  CircularProgressTrackProps
>(function CircularProgressTrack(props, ref) {
  const { trackColor, thickness } = useCircularProgressContext()

  return (
    <chakra.circle
      cx={50}
      cy={50}
      r={42}
      fill="transparent"
      ref={ref}
      stroke={trackColor}
      strokeWidth={thickness}
      {...props}
      className={cx("chakra-progress__track", props.className)}
    />
  )
})
