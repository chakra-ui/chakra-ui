import { For, HStack, Stack } from "@chakra-ui/react"
import { Radio, RadioGroup } from "compositions/ui/radio"

export const RadioWithVariants = () => {
  return (
    <Stack gap="4">
      <For each={["solid", "outline", "subtle"]}>
        {(variant) => (
          <RadioGroup
            key={variant}
            variant={variant}
            defaultValue="react"
            colorPalette="teal"
          >
            <HStack gap="4">
              <Radio value="react" minW="120px">
                Radio ({variant})
              </Radio>
              <Radio value="vue">Vue ({variant})</Radio>
            </HStack>
          </RadioGroup>
        )}
      </For>
    </Stack>
  )
}
