import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from "compositions/ui/progress"

export const ProgressWithLabelInfo = () => {
  return (
    <ProgressRoot maxW="240px">
      <ProgressLabel info="Uploading document to the server" mb="2">
        Uploading
      </ProgressLabel>
      <ProgressBar />
    </ProgressRoot>
  )
}
