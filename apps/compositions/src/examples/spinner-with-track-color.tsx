import { Spinner } from "@chakra-ui/react"

export const SpinnerWithTrackColor = () => (
  <Spinner
    color="red.500"
    css={{ "--spinner-track-color": "colors.gray.200" }}
  />
)
