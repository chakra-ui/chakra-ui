import { CloseButton, HStack } from "@chakra-ui/react"

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
