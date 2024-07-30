import { HStack } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"

export const CloseButtonWithSizes = () => {
  return (
    <HStack>
      <CloseButton variant="outline" size="xs" />
      <CloseButton variant="outline" size="sm" />
      <CloseButton variant="outline" size="md" />
      <CloseButton variant="outline" size="lg" />
    </HStack>
  )
}
