import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressWithAnimatedStripes = () => {
  return (
    <ProgressRoot maxW="240px" striped animated>
      <ProgressBar />
    </ProgressRoot>
  )
}
