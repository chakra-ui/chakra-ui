import { HStack } from "@chakra-ui/react"
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
} from "compositions/ui/progress"

export const ProgressBarWithLabel = () => {
  return (
    <ProgressRoot defaultValue={40}>
      <HStack justify="space-between" mb="1">
        <ProgressLabel>Token usage</ProgressLabel>
        <ProgressValueText />
      </HStack>
      <ProgressBar />
    </ProgressRoot>
  )
}
