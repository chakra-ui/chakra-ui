import { CloseButton, For, HStack } from "@sh3yk0-ui/react"

export const CloseButtonWithSizes = () => {
  return (
    <HStack gap="4" wrap="wrap">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl"]}>
        {(size) => <CloseButton variant="outline" size={size} />}
      </For>
    </HStack>
  )
}
