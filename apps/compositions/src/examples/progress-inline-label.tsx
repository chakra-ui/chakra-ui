import { HStack } from "@chakra-ui/react"
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
} from "compositions/ui/progress"

export const ProgressBarWithInlineLabel = () => {
  return (
    <ProgressRoot defaultValue={40}>
      <HStack justify="space-between" mb="1">
        <ProgressLabel>Token usage</ProgressLabel>
        <ProgressBar />
        <ProgressValueText>40%</ProgressValueText>
      </HStack>
    </ProgressRoot>
  )
}
