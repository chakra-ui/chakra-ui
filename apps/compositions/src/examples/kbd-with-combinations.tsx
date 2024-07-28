import { HStack, Kbd } from "@chakra-ui/react"

export const KbdWithCombinations = () => {
  return (
    <HStack gap="1">
      <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
    </HStack>
  )
}
