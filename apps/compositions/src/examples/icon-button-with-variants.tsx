import { For, HStack, IconButton } from "@chakra-ui/react"
import { LuVoicemail } from "react-icons/lu"

export const IconButtonWithVariants = () => {
  return (
    <HStack wrap="wrap">
      <For each={["solid", "subtle", "surface", "outline", "ghost"]}>
        {(variant) => (
          <IconButton aria-label="Call support" key={variant} variant={variant}>
            <LuVoicemail />
          </IconButton>
        )}
      </For>
    </HStack>
  )
}
