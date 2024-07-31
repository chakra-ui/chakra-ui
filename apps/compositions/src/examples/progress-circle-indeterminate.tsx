import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"

export const ProgressCircleIndeterminate = () => {
  return (
    <ProgressCircleRoot value={null} size="sm">
      <ProgressCircleRing cap="round" />
    </ProgressCircleRoot>
  )
}
