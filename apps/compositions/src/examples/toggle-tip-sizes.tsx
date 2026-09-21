import { For, HStack } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"

export const ToggleTipSizes = () => {
  return (
    <HStack gap="8" justify="center">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <InfoTip
            key={size}
            size={size}
            buttonProps={{ size }}
            content={`This is the "${size}" size variant`}
          />
        )}
      </For>
    </HStack>
  )
}
