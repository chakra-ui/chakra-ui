import type { Meta } from "@storybook/react"
import { Box, For, Span, useSlotRecipe } from "../src"
import { Slider } from "../src/components/slider"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

const DemoSlider = (props: Slider.RootProps) => {
  return (
    <Slider.Root defaultValue={[50]} {...props}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider.Root>
  )
}

export default {
  title: "Components / Slider",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export const Variants = () => {
  const recipe = useSlotRecipe("slider")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td>
                    <DemoSlider
                      colorPalette={c}
                      variant={v}
                      minW="200px"
                      mb="2"
                    />
                    <DemoSlider
                      colorPalette={c}
                      variant={v}
                      minW="200px"
                      disabled
                    />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("slider")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
                    <DemoSlider colorPalette={c} size={v} minW="160px" />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const RangeSlider = () => {
  return (
    <Slider.Root
      maxW="sm"
      thumbSize={{ width: 16, height: 16 }}
      defaultValue={[30, 70]}
    >
      <Slider.Label fontWeight="medium">Price Range</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
        <Slider.Thumb index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}

export const WithSteps = () => {
  return <DemoSlider step={5} />
}

export const VerticalSlider = () => {
  return <DemoSlider colorPalette="red" orientation="vertical" />
}
