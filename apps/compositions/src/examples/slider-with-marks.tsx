import { For, Slider, Stack, Text, VStack } from "@chakra-ui/react"

export const SliderWithMarks = () => {
  return (
    <Stack gap="4">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <VStack key={size} align="flex-start">
            <Slider.Root
              key={size}
              size={size}
              defaultValue={[40]}
              width="200px"
            >
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
                <Slider.Marks marks={[0, 50, 100]} />
              </Slider.Control>
            </Slider.Root>
            <Text>size = {size}</Text>
          </VStack>
        )}
      </For>
    </Stack>
  )
}
