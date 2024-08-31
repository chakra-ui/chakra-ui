import { HStack } from "@chakra-ui/react"
import { Switch } from "compositions/ui/switch"

export const SwitchWithVariants = () => {
  return (
    <HStack gap="8">
      <Switch variant="raised" />
      <Switch variant="solid" />
    </HStack>
  )
}
