import { HStack } from "@chakra-ui/react"
import { Radio, RadioGroup } from "compositions/ui/radio"

export const RadioDisabled = () => {
  return (
    <RadioGroup defaultValue="2">
      <HStack gap="6">
        <Radio value="1" disabled>
          Option 1
        </Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </HStack>
    </RadioGroup>
  )
}
