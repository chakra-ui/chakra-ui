import { For, HStack, IconButton } from "@chakra-ui/react"
import { LuVoicemail } from "react-icons/lu"

export const IconButtonWithVariants = () => {
  return (
    <HStack wrap="wrap">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <IconButton aria-label="Call support" key={size} size={size}>
            <LuVoicemail />
          </IconButton>
        )}
      </For>
    </HStack>
  )
}
