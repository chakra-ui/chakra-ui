import { ProgressCircle } from "@sh3yk0-ui/react"

export const ProgressCircleIndeterminate = () => {
  return (
    <ProgressCircle.Root value={null} size="sm">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}
