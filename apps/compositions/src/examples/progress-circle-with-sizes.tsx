import { For, HStack, ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleWithSizes = () => {
  return (
    <HStack gap="10">
      <For each={["xs", "sm", "md", "lg", "xl"]}>
        {(size) => (
          <ProgressCircle.Root key={size} size={size} value={30}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
        )}
      </For>
    </HStack>
  )
}
