import { HStack } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"

export const CloseButtonWithVariants = () => {
  return (
    <HStack>
      <CloseButton variant="ghost" />
      <CloseButton variant="outline" />
      <CloseButton variant="subtle" />
      <CloseButton variant="solid" />
    </HStack>
  )
}
