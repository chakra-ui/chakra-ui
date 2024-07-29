import { HStack } from "@chakra-ui/react"
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
} from "compositions/ui/progress"

export const ProgressWithInlineLabel = () => {
  return (
    <ProgressRoot defaultValue={40} maxW="sm">
      <HStack gap="5">
        <ProgressLabel>Usage</ProgressLabel>
        <ProgressBar flex="1" />
        <ProgressValueText>40%</ProgressValueText>
      </HStack>
    </ProgressRoot>
  )
}
