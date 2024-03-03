import { dataAttr } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { spinAnim } from "../progress/progress-utils"
import { useCircularProgressContext } from "./circular-progress-context"

export interface CircularProgressFilledTrackProps
  extends HTMLChakraProps<"circle"> {}

export const CircularProgressFilledTrack = forwardRef<
  CircularProgressFilledTrackProps,
  "circle"
>(function CircularProgressFilledTrack(props, ref) {
  const { computed, color, thickness, capIsRound, isIndeterminate } =
    useCircularProgressContext()

  const determinant = isIndeterminate
    ? undefined
    : (computed.percent ?? 0) * 2.64

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
      opacity={computed.value === 0 && !isIndeterminate ? 0 : undefined}
      data-indeterminate={dataAttr(isIndeterminate)}
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
