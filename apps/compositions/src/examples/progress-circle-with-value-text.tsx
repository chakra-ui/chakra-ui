import { AbsoluteCenter, For, HStack, ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleWithValueText = () => {
  return (
    <HStack gap="8">
      <For each={["md", "lg", "xl"]}>
        {(size) => (
          <ProgressCircle.Root size={size} key={size} value={5}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.ValueText />
            </AbsoluteCenter>
          </ProgressCircle.Root>
        )}
      </For>
    </HStack>
  )
}
