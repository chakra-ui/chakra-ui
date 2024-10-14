import { For, Stack, Text, VStack } from "@chakra-ui/react"
import { Slider } from "compositions/ui/slider"

export const SliderWithMarks = () => {
  return (
    <Stack gap="4">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <VStack key={size} align="flex-start">
            <Slider
              key={size}
              size={size}
              width="200px"
              colorPalette="pink"
              defaultValue={[40]}
              marks={[0, 50, 100]}
            />
            <Text>size = {size}</Text>
          </VStack>
        )}
      </For>
    </Stack>
  )
}
