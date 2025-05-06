import { ProgressCircle } from "@sh3yk0-ui/react"

export const ProgressCircleWithRangeColor = () => {
  return (
    <ProgressCircle.Root value={75}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range stroke="orange" />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}
