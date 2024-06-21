import {
  CircularProgress as Progress,
  type SystemStyleObject,
} from "@chakra-ui/react"
import { forwardRef } from "react"

export interface CircularProgressProps extends Progress.RootProps {
  showValue?: boolean
  trackColor?: SystemStyleObject["stroke"]
  capIsRound?: boolean
}

export const CircularProgress = forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(function CircularProgress(props, ref) {
  const { value, showValue, trackColor, capIsRound, color, ...rest } = props
  return (
    <Progress.Root ref={ref} valuePlacement="center" {...rest}>
      <Progress.ValueText />
      <Progress.Circle>
        <Progress.Track stroke={trackColor} />
        <Progress.Range
          stroke={color}
          strokeLinecap={capIsRound ? "round" : undefined}
        />
      </Progress.Circle>
    </Progress.Root>
  )
})
