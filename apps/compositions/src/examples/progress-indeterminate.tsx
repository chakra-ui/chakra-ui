import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from "compositions/ui/progress"

export const ProgressBarIndeterminate = () => {
  return (
    <ProgressRoot value={null}>
      <ProgressLabel>Loading...</ProgressLabel>
      <ProgressBar />
    </ProgressRoot>
  )
}
