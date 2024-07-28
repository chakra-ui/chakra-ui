import { HStack, Stack, Text } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithVariants = () => {
  return (
    <HStack align="flex-start">
      <Stack align="flex-start" flex="1">
        <Text>outline</Text>
        <Checkbox variant="outline">Checkbox</Checkbox>
        <Checkbox defaultChecked variant="outline">
          Checkbox
        </Checkbox>
      </Stack>

      <Stack align="flex-start" flex="1">
        <Text>subtle</Text>
        <Checkbox variant="subtle">Checkbox</Checkbox>
        <Checkbox defaultChecked variant="subtle">
          Checkbox
        </Checkbox>
      </Stack>
    </HStack>
  )
}
