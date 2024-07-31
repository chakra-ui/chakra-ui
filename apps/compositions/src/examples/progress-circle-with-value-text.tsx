import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "compositions/ui/progress-circle"

export const ProgressCircleWithValueText = () => {
  return (
    <ProgressCircleRoot value={75} size="lg">
      <ProgressCircleValueText />
      <ProgressCircleRing />
    </ProgressCircleRoot>
  )
}
