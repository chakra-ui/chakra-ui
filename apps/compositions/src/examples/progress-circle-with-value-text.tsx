import { For, HStack } from "@chakra-ui/react"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "compositions/ui/progress-circle"

export const ProgressCircleWithValueText = () => {
  return (
    <HStack gap="8">
      <For each={["md", "lg", "xl"]}>
        {(size) => (
          <ProgressCircleRoot value={5} size={size}>
            <ProgressCircleValueText />
            <ProgressCircleRing />
          </ProgressCircleRoot>
        )}
      </For>
    </HStack>
  )
}
