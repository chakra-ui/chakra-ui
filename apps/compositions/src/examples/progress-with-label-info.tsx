import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from "compositions/ui/progress"

export const ProgressBarWithLabelInfo = () => {
  return (
    <ProgressRoot>
      <ProgressLabel info="Uploding document to the server. Please wait...">
        Uploading...
      </ProgressLabel>
      <ProgressBar />
    </ProgressRoot>
  )
}
