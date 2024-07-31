import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"

export const ProgressCircleWithThickness = () => {
  return (
    <ProgressCircleRoot value={75}>
      <ProgressCircleRing css={{ "--thickness": "2px" }} />
    </ProgressCircleRoot>
  )
}
