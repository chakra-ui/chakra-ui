import { HStack, Kbd } from "@chakra-ui/react"

export const KbdWithVariants = () => {
  return (
    <HStack gap="4">
      <Kbd variant="raised">Shift + Tab</Kbd>
      <Kbd variant="outline">Shift + Tab</Kbd>
      <Kbd variant="subtle">Shift + Tab</Kbd>
      <Kbd variant="plain">Shift + Tab</Kbd>
    </HStack>
  )
}
