import { HStack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"

export const ButtonWithVariants = () => {
  return (
    <HStack wrap="wrap" gap="6">
      <Button variant="solid">Solid</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="plain">Plain</Button>
    </HStack>
  )
}
