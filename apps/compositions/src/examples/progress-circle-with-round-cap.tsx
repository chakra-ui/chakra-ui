import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"

export const ProgressCircleWithRoundCap = () => {
  return (
    <ProgressCircleRoot value={75}>
      <ProgressCircleRing cap="round" />
    </ProgressCircleRoot>
  )
}
