import { For, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import { LuVoicemail } from "react-icons/lu"

export const IconButtonWithVariants = () => {
  return (
    <HStack wrap="wrap" gap="8">
      <For each={["solid", "subtle", "surface", "outline", "ghost"]}>
        {(variant) => (
          <VStack key={variant}>
            <IconButton
              aria-label="Call support"
              key={variant}
              variant={variant}
            >
              <LuVoicemail />
            </IconButton>
            <Text textStyle="sm">{variant}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  )
}
