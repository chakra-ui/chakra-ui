import { For, Slider, Stack } from "@chakra-ui/react"

export const SliderWithVariants = () => {
  return (
    <Stack width="200px" gap="4">
      <For each={["outline", "solid"]}>
        {(variant) => (
          <Slider.Root defaultValue={[40]} variant={variant} key={variant}>
            <Slider.Label>Slider - {variant}</Slider.Label>
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
