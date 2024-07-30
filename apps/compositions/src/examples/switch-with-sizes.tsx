import { HStack } from "@chakra-ui/react"
import { Switch } from "compositions/ui/switch"

export const SwitchWithSizes = () => {
  return (
    <HStack gap="8">
      <Switch size="xs" />
      <Switch size="sm" />
      <Switch size="md" />
      <Switch size="lg" />
    </HStack>
  )
}
