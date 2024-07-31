import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"

export const ProgressCircleBasic = () => {
  return (
    <ProgressCircleRoot value={75}>
      <ProgressCircleRing />
    </ProgressCircleRoot>
  )
}
