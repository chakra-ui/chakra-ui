import { For, Slider, Stack } from "@chakra-ui/react"

const colors = ["gray", "blue", "red", "green", "pink"]

export const SliderWithColors = () => {
  return (
    <Stack gap="4" align="flex-start">
      <For each={colors}>
        {(color) => (
          <Slider.Root
            key={color}
            width="200px"
            colorPalette={color}
            defaultValue={[40]}
          >
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
