"use client"

import { dataAttr } from "@chakra-ui/utils"
import { keyframes } from "@emotion/react"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCircularProgressContext } from "./circular-progress-context"

const spinAnim = keyframes({
  "0%": {
    strokeDasharray: "1, 400",
    strokeDashoffset: "0",
  },
  "50%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-100",
  },
  "100%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-260",
  },
})

export interface CircularProgressFilledTrackProps
  extends HTMLChakraProps<"circle"> {}

export const CircularProgressFilledTrack = forwardRef<
  SVGCircleElement,
  CircularProgressFilledTrackProps
>(function CircularProgressFilledTrack(props, ref) {
  const { computed, color, thickness, capIsRound, indeterminate } =
    useCircularProgressContext()

  const determinant = indeterminate ? undefined : (computed.percent ?? 0) * 2.64

  const strokeDasharray =
    determinant == null ? undefined : `${determinant} ${264 - determinant}`

  return (
    <chakra.circle
      cx={50}
      cy={50}
      r={42}
      fill="transparent"
      ref={ref}
      stroke={color}
      strokeWidth={thickness}
      className="chakra-progress__indicator"
      strokeLinecap={capIsRound ? "round" : undefined}
      opacity={computed.value === 0 && !indeterminate ? 0 : undefined}
      data-indeterminate={dataAttr(indeterminate)}
      {...props}
      css={{
        strokeDashoffset: 66,
        strokeDasharray,
        transitionProperty: "stroke-dasharray, stroke",
        transitionDuration: "0.6s",
        transitionTimingFunction: "ease",
        "&[data-indeterminate]": {
          animation: `${spinAnim} 1.5s linear infinite`,
        },
      }}
    />
  )
})
