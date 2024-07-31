import { HStack } from "@chakra-ui/react"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"

export const ProgressCircleWithSizes = () => {
  return (
    <HStack gap="10">
      <ProgressCircleRoot size="xs" value={30}>
        <ProgressCircleRing cap="round" />
      </ProgressCircleRoot>

      <ProgressCircleRoot size="sm" value={30}>
        <ProgressCircleRing cap="round" />
      </ProgressCircleRoot>

      <ProgressCircleRoot size="md" value={30}>
        <ProgressCircleRing cap="round" />
      </ProgressCircleRoot>

      <ProgressCircleRoot size="lg" value={30}>
        <ProgressCircleRing cap="round" />
      </ProgressCircleRoot>
    </HStack>
  )
}
