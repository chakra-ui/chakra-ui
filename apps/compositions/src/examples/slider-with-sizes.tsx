import { For, Slider, Stack } from "@chakra-ui/react"

export const SliderWithSizes = () => {
  return (
    <Stack width="200px" gap="4">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <Slider.Root defaultValue={[40]} size={size} key={size}>
            <Slider.Label>Slider - {size}</Slider.Label>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
        )}
      </For>
    </Stack>
  )
}
