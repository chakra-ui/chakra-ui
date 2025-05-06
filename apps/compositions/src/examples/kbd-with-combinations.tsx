import { HStack, Kbd } from "@sh3yk0-ui/react"

export const KbdWithCombinations = () => {
  return (
    <HStack gap="1">
      <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
    </HStack>
  )
}
