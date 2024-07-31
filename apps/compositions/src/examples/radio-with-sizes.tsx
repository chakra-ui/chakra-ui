import { HStack } from "@chakra-ui/react"
import { Radio, RadioGroup } from "compositions/ui/radio"

export const RadioWithSizes = () => {
  return (
    <HStack gap="4">
      <RadioGroup size="sm">
        <Radio value="react">Radio (sm)</Radio>
      </RadioGroup>
      <RadioGroup size="md">
        <Radio value="react">Radio (md)</Radio>
      </RadioGroup>
      <RadioGroup size="lg">
        <Radio value="react">Radio (lg)</Radio>
      </RadioGroup>
    </HStack>
  )
}
