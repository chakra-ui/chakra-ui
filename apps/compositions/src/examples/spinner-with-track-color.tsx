import { Spinner } from "@sh3yk0-ui/react"

export const SpinnerWithTrackColor = () => (
  <Spinner
    color="red.500"
    css={{ "--spinner-track-color": "colors.gray.200" }}
  />
)
