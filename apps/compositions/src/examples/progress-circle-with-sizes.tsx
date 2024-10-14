import { For, HStack } from "@chakra-ui/react"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"

export const ProgressCircleWithSizes = () => {
  return (
    <HStack gap="10">
      <For each={["xs", "sm", "md", "lg", "xl"]}>
        {(size) => (
          <ProgressCircleRoot size={size} value={30}>
            <ProgressCircleRing cap="round" />
          </ProgressCircleRoot>
        )}
      </For>
    </HStack>
  )
}
